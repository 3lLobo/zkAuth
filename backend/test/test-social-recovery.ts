import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { groth16 } from 'snarkjs';
import mimc, {modPBigIntNative} from './mimc';


function log(data: any, s: any){
    console.log(`${s}: ${data}`)
}

function hash(...preimage: any[]) {
    return mimc(...preimage);
  }

describe("check ZkSocialRecoveryWallet", function () {
    let zkSocialRecoveryWallet;



    it("check deployment", async function() {
        const signers = await ethers.getSigners();
        let [user, trustee1, trustee2, trustee3, newOwner] = signers;
        let passwords = ["123", "234", "345"]
        let hashes = [];
        let trustees = [trustee1.address, trustee2.address, trustee3.address];
        log(trustees,"trustees");

        let HashCheckVerifier = await ethers.getContractFactory("HashCheckVerifier");
        let hashCheckVerifier = await HashCheckVerifier.deploy();
        await hashCheckVerifier.deployed();
        log(hashCheckVerifier.address, "hashCheckVerifier");

        for(var i =0;i<trustees.length; i++){
            hashes.push(hash(passwords[i].toString()).toString());
        }

        log(hashes,"hashes")

        let ZkSocialRecoveryWallet = await ethers.getContractFactory("ZkSocialRecoveryWallet");
        zkSocialRecoveryWallet = await ZkSocialRecoveryWallet.deploy(hashCheckVerifier.address, trustees, hashes, 2);
        await zkSocialRecoveryWallet.deployed();

        log(zkSocialRecoveryWallet.address,"zksc addr");

        let INPUT ={
            "x": (passwords[0]).toString(),
            "hash": (hashes[0]).toString()
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

        //console.log(argv);

        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);
        log(Input, "input")
        await zkSocialRecoveryWallet.connect(trustee1).startRecovery(a, b, c, Input, newOwner.address);
    })

} )

const processProof = (snarkProof: any, publicSignals: any) => {
    return [
      snarkProof.pi_a.slice(0, 2), // pi_a
      [
        snarkProof.pi_b[0].slice(0).reverse(),
        snarkProof.pi_b[1].slice(0).reverse(),
      ], // pi_b
      snarkProof.pi_c.slice(0, 2), // pi_c
      publicSignals.map((signal: any) => signal.toString(10)), // input
    ];
  };