const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { groth16 } = require("snarkjs");
const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const startTime = Math.floor(Date.now()/30000 - 1)*30000;


let INPUT;

function log(data, s){
    console.log(`${s}: ${data}`)
}

describe("check ZkValidator", function () {
    let validator;


    beforeEach(async function () {
        let Validator = await ethers.getContractFactory("ZkValidator");
        validator = await Validator.deploy();
        await validator.deployed();
    });

    it("verify password", async function() {

        INPUT = {
            "x": "55235",
            "hash": "6796942551330677712657611585851001255469309640426384466994911300457172021192"
        }

        const {proof, publicSignals} = await groth16.fullProve(INPUT, "circuits/HashCheck/HashCheck_js/HashCheck.wasm", "circuits/HashCheck/circuit_final.zkey");

        const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

        const argv = calldata.replace(/["[\]\s]/g, "").split(',').map(x => BigInt(x).toString());

        const a = [argv[0], argv[1]];
        const b = [[argv[2], argv[3]], [argv[4], argv[5]]];
        const c = [argv[6], argv[7]];
        const Input = argv.slice(8);

        log(Input,"input");
        let success = await validator.verifyProofForUserWallet(a, b, c, Input);
        log(success,"res");
    })

} )