import { ethers } from "ethers";
import address from '../artifacts/address.json';
import ZkWallet from '../artifacts/ZkSocialRecoveryWallet.json';
import ZkWalletFactory from '../artifacts/ZkWalletFactory.json';
import { generateCalldata } from '../circuit_js/generate_calldata.js';

let factory: ethers.Contract;
let zkWallet: ethers.Contract;

export async function connectContract(addr: string) {
    const { ethereum } = window;

    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    console.log('signer: ', await signer.getAddress());

    zkWallet = new ethers.Contract(addr, ZkWallet.abi, signer);

    console.log("Connect to ZkWalletAddress Contract:", addr);
}

export async function connectZkWalletFactory() {
    const { ethereum } = window;

    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    console.log('signer: ', await signer.getAddress());

    factory = new ethers.Contract(address['ZkWalletFactory'], ZkWalletFactory.abi, signer);

    console.log("Connect to ZkWalletFactory Contract:", ZkWalletFactory);
}

export async function deployZkWallet(ownerPasswordHash: BigInt, trustees: string[], passwordHashes: BigInt[], thresholdForRecovery: number, root: BigInt) {
    await connectZkWalletFactory();

    let txn = await factory.deployWallet(address["HashCheckVerfier"], ownerPasswordHash, trustees, passwordHashes, thresholdForRecovery, root, address["OtpMerkleTreeVerifier"]);
    let rc = await txn.wait()

    let newWalletAddress = txn.events[0].args.walletAddress;

    localStorage.setItem("ZkWalletAddress", newWalletAddress);

    return newWalletAddress;
}

export async function hashCheckGenerateCalldata(input: Object) {
    if (localStorage.getItem('ZkWalletAddress')) {
        console.log(localStorage.getItem('ZkWalletAddress'));
        await connectContract(localStorage.getItem('ZkWalletAddress')!);
    } else {
        throw new Error("No zkWallet contract address found. Deploy first.");
    }

    let calldata = await generateCalldata(input, 'hash_check');
    return calldata;
    //a: calldata[0], b: calldata[1], c: calldata[2], Input: calldata[3]
}

export async function otpVerificationGenerateCalldata(input: Object) {
    if (localStorage.getItem('ZkWalletAddress')) {
        console.log(localStorage.getItem('ZkWalletAddress'));
        await connectContract(localStorage.getItem('ZkWalletAddress')!);
    } else {
        throw new Error("No zkWallet contract address found. Deploy first.");
    }

    let calldata = await generateCalldata(input, 'otp_verification');
    return calldata;
    //a: calldata[0], b: calldata[1], c: calldata[2], Input: calldata[3]
}