const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { groth16 } = require("snarkjs");
const wasm_tester = require("circom_tester").wasm;
const totp = require("totp-generator");

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const { buildPoseidon } = require('circomlibjs');
const {mimc } = require('./mimc');

const SECRET = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";
const startTime = Math.floor(Date.now()/30000 - 1)*30000;

let INPUT;

function log(data, s){
    console.log(`${s}: ${data}`)
}

describe("check ZKOtpValidator", function () {
    let ZkOtp;
    let zkotp;

    let tokens = {};
    let hashes = [];

    let poseidon;
    let zkSocialRecoveryWallet;
    beforeEach(async function () {
        poseidon = await buildPoseidon();
        // let hashes = [];

        for(var i=0; i< 2**7; i++){
            let time = startTime + i*3000;
            token = totp(SECRET, {timestamp: time});
            tokens[time] = token;
            hashes.push(poseidon.F.toObject(poseidon([BigInt(time),BigInt(token)])));
        }

        // log(hashes,"Hashes");
        // log(tokens,"tokens");

        let k = 0;

        for (var i=2**7; i < 2**8-1; i++) {
            // log(i,"i")
            hashes.push(poseidon.F.toObject(poseidon([hashes[k*2],hashes[k*2+1]])));
            k++;
        }
        root = hashes[2**8-2];
        log(root,"root");

        let otpMerkleTreeVerifier = await ethers.getContractFactory("OtpMerkleTreeVerifier");
        let OtpMerkleTreeVerifier = await otpMerkleTreeVerifier.deploy();
        await OtpMerkleTreeVerifier.deployed();

        log(OtpMerkleTreeVerifier.address, "verifier");

        // ZkOtp = await ethers.getContractFactory("ZkOtpValidator");
        // zkotp = await ZkOtp.deploy(root, OtpMerkleTreeVerifier.address);
        // await zkotp.deployed();

        const signers = await ethers.getSigners();
        let [user, trustee1, trustee2, trustee3, newOwner] = signers;
        let passwords = ["123", "234", "345"];
        let owner_pass = "678";
        
        let trustees = [trustee1.address, trustee2.address, trustee3.address];
        log(trustees,"trustees");

        let HashCheckVerifier = await ethers.getContractFactory("HashCheckVerifier");
        let hashCheckVerifier = await HashCheckVerifier.deploy();
        await hashCheckVerifier.deployed();
        log(hashCheckVerifier.address, "hashCheckVerifier");

        for(var i =0;i<trustees.length; i++){
            hashes.push(poseidon.F.toObject(poseidon([trustees[i],BigInt(passwords[i])])) );
        }

        // log(hashes,"hashes")

        let pass_hash_owner = poseidon.F.toObject(poseidon([user.address,BigInt(owner_pass)]));

        let ZkSocialRecoveryWallet = await ethers.getContractFactory("ZkSocialRecoveryWallet");
        zkSocialRecoveryWallet = await ZkSocialRecoveryWallet.deploy(hashCheckVerifier.address, pass_hash_owner, trustees, hashes, 2, root, OtpMerkleTreeVerifier.address,{gasLimit: 1e6});
        await zkSocialRecoveryWallet.deployed();

        log(zkSocialRecoveryWallet.address,"zksc addr");

    })

    it("Approval", async function() {
        let currentTime = Math.floor(Date.now()/30000)*30000;
        //console.log(tokens[currentTime]);

        let currentNode = poseidon.F.toObject(poseidon([BigInt(currentTime),BigInt(tokens[currentTime])]));
        console.log(currentNode);

        let pathElements = [];
        let pathIndex = [];

        for (var i=0; i<7; i++) {
            if (hashes.indexOf(currentNode)%2==0) {
                pathIndex.push(0);
                let currentIndex = hashes.indexOf(currentNode) + 1;
                console.log(currentIndex);
                pathElements.push(hashes[currentIndex]);
                currentNode = poseidon.F.toObject(poseidon([hashes[currentIndex-1], hashes[currentIndex]]));
            } else {
                pathIndex.push(1);
                let currentIndex = hashes.indexOf(currentNode) - 1;
                console.log(currentIndex);
                pathElements.push(hashes[currentIndex]);
                currentNode = poseidon.F.toObject(poseidon([hashes[currentIndex], hashes[currentIndex+1]]));
            }
        }

        // // const circuit = await wasm_tester("circuits/OTPVerification/circuit.circom");

        INPUT = {
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

        // await zkotp.verifyOTP(a, b, c, Input);

    });
})