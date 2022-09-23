import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { groth16 } from 'snarkjs';
import {buildPoseidon} from 'circomlibjs';
const wasm_tester = require("circom_tester").wasm;
const totp = require("totp-generator");
const SECRET = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";
const startTime = Math.floor(Date.now()/30000 - 1)*30000;


function log(data: any, s: any){
    console.log(`${s}: ${data}`)
}

describe("check ZkSocialRecoveryWallet", function () {
    let zkSocialRecoveryWallet;

    let ZkOtp;
    let zkotp;

    var tokens = {};
    let hashes:any = [];

    let poseidon;
    let root;
    let OtpMerkleTreeVerifier;
    beforeEach(async function () {
        poseidon = await buildPoseidon();

        for(var i=0; i< 2**7; i++){
            let time: any = startTime + i*3000;
            let token: any = totp(SECRET, {timestamp: time});
            tokens[time] = token;
            hashes.push(poseidon.F.toObject(poseidon([BigInt(time),BigInt(token)])));
        }

        log(hashes,"Hashes");
        log(tokens,"tokens");

        let k = 0;

        for (var i=2**7; i < 2**8-1; i++) {
            // log(i,"i")
            hashes.push(poseidon.F.toObject(poseidon([hashes[k*2],hashes[k*2+1]])));
            k++;
        }
        root = hashes[2**8-2];
        log(root,"root");

        let otpMerkleTreeVerifier = await ethers.getContractFactory("OtpMerkleTreeVerifier");
        OtpMerkleTreeVerifier = await otpMerkleTreeVerifier.deploy();
        await OtpMerkleTreeVerifier.deployed();

        log(OtpMerkleTreeVerifier.address, "verifier");

    })



    it("check deployment", async function() {
      let poseidon = await buildPoseidon();

        const signers = await ethers.getSigners();
        let [user, trustee1, trustee2, trustee3, newOwner] = signers;
        let passwords = ["123", "234", "345"];
        let owner_pass = "678";
        let hashes1 = [];
        let trustees = [trustee1.address, trustee2.address, trustee3.address];
        log(trustees,"trustees");

        let HashCheckVerifier = await ethers.getContractFactory("HashCheckVerifier");
        let hashCheckVerifier = await HashCheckVerifier.deploy();
        await hashCheckVerifier.deployed();
        log(hashCheckVerifier.address, "hashCheckVerifier");

        for(var i =0;i<trustees.length; i++){
            hashes1.push(poseidon.F.toObject(poseidon([trustees[i],BigInt(passwords[i])])) );
        }

        log(hashes1,"hashes")

        let pass_hash_owner = poseidon.F.toObject(poseidon([user.address,BigInt(owner_pass)]));

        let ZkSocialRecoveryWallet = await ethers.getContractFactory("ZkSocialRecoveryWallet");
        zkSocialRecoveryWallet = await ZkSocialRecoveryWallet.deploy(hashCheckVerifier.address, pass_hash_owner, trustees, hashes1, 2, root, OtpMerkleTreeVerifier.address);
        await zkSocialRecoveryWallet.deployed();

        log(zkSocialRecoveryWallet.address,"zksc addr");

        
        
        let p = await getProof(trustees[0], passwords[0], hashes1[0]);
        // @ts-ignore
        await zkSocialRecoveryWallet.connect(trustee1).startRecovery(p.a, p.b, p.c, p.Input, newOwner.address);
        log(1,"Started Recovery")
        
        let p2 = await getProof(trustees[2], passwords[2], hashes1[2]);
        let currentRecoveryNumbe = await zkSocialRecoveryWallet.currentRecoveryNumber();
        log(currentRecoveryNumbe, "currentRecoveryNumbe")
        // @ts-ignore
        await zkSocialRecoveryWallet.connect(trustee3).voteInRecovery(p2.a, p2.b, p2.c, p2.Input, currentRecoveryNumbe.toString());
        log(1,"Trustee voted");

        // let p3 = await getProof(user.address, owner_pass, pass_hash_owner);
        // // @ts-ignore
        // await zkSocialRecoveryWallet.connect(user).cancelRecovery(p3.a, p3.b, p3.c, p3.Input, currentRecoveryNumbe.toString());

        let p3 = await getProof(trustees[2], passwords[2], hashes1[2]);
        // @ts-ignore
        await zkSocialRecoveryWallet.connect(trustee3).executeRecoveryChange(p3.a, p3.b, p3.c, p3.Input, currentRecoveryNumbe.toString());
        expect(await zkSocialRecoveryWallet.owner()).to.be.equal(newOwner.address);
        log(1,"Wolla!! owner changed")


        let currentTime = Math.floor(Date.now()/30000)*30000;
        log(currentTime, "currentTime")
        //console.log(tokens[currentTime]);
// @ts-ignore
        let currentNode = poseidon.F.toObject(poseidon([BigInt(currentTime),BigInt(tokens[currentTime])]));
        log(currentNode,"currentNode")

        let pathElements = [];
        let pathIndex = [];

        for (var i=0; i<7; i++) {
            if (hashes.indexOf(currentNode)%2==0) {
                pathIndex.push(0);
                let currentIndex = hashes.indexOf(currentNode) + 1;
                log(currentIndex, "currentIndex");
                
                pathElements.push(hashes[currentIndex]);
                currentNode = poseidon.F.toObject(poseidon([hashes[currentIndex-1], hashes[currentIndex]]));
            } else {
                pathIndex.push(1);
                let currentIndex = hashes.indexOf(currentNode) - 1;
                log(currentIndex,"currentIndex");
                
                pathElements.push(hashes[currentIndex]);
                currentNode = poseidon.F.toObject(poseidon([hashes[currentIndex], hashes[currentIndex+1]]));
            }
        }

        // // const circuit = await wasm_tester("circuits/OTPVerification/circuit.circom");

        let INPUT = {
            "time": currentTime,
            "otp": tokens[currentTime],
            "pathElements": pathElements,
            "pathIndex": pathIndex
        }

        const { proof, publicSignals } = await groth16.fullProve(INPUT, "circuits/OTPVerification/build/circuit_js/circuit.wasm","circuits/OTPVerification/build/circuit_final.zkey");

        const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());

        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);
        log(Input, "input");
        await user.sendTransaction({to: zkSocialRecoveryWallet.address, value: ethers.utils.parseEther("10")});
        await zkSocialRecoveryWallet.connect(newOwner).executeTxn(a,b,c,Input,user.address, "1000000000");
    })

} )


async function getProof(trustees: any, passwords: any, hashes: any){
  let INPUT ={
    "addr": (trustees).toString(),
    "pass": passwords,
    "hash": (hashes).toString()
  }
  // @ts-ignore
  const { proof, publicSignals } = await groth16.fullProve(
      INPUT,
      `circuits/HashCheck/build/circuit_js/circuit.wasm`,
      `circuits/HashCheck/build/circuit_final.zkey`,
    );

  log(publicSignals, "ps");

  const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

  const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());

  // //console.log(argv);

  const a = [argv[0], argv[1]];
  const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
  const c = [argv[6], argv[7]];
  const Input = argv.slice(8);
  log(Input, "input")

  return {a, b, c, Input}
}