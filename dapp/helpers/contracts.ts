import { ethers } from 'ethers'
import { address } from '../../backend/config'
import { generateCalldata } from './circuits/generate_calldata'

import zkWalletFactoryJson from '../../backend/artifacts/contracts/ZkWalletFactory.sol/ZkWalletFactory.json'

import ZkOtpValidatorJson from '../../backend/artifacts/contracts/ZkOtpValidator.sol/ZkOtpValidator.json'

import ZkWalletJson from '../../backend/artifacts/contracts/ZkSocialRecoveryWallet.sol/ZkSocialRecoveryWallet.json'

let zkWalletFactory: ethers.Contract
let ZkOtpValidator: ethers.Contract

export async function connectTOTPVerifier(
  provider: ethers.providers.JsonRpcProvider,
  account: string
) {
  let signer = provider.getSigner()
  // We connect to get wallet address
  const ifaceFactory = new ethers.utils.Interface(zkWalletFactoryJson.abi)

  zkWalletFactory = new ethers.Contract(
    address['zkWalletFactory'],
    ifaceFactory,
    signer
  )

  const walletAddress = await zkWalletFactory.userAddressToWalletAddress(
    account
  )

  // We retrieve zk totp verificator address
  const ifaceWallet = new ethers.utils.Interface(ZkWalletJson.abi)

  const zkWallet = new ethers.Contract(walletAddress, ifaceWallet, signer)
  const zkOtpValidatorAddress = await zkWallet.otpVerifierAddress()

  const iface = new ethers.utils.Interface(ZkOtpValidatorJson.abi)
  ZkOtpValidator = new ethers.Contract(zkOtpValidatorAddress, iface, signer)

  console.log('Connect to zkOTP Contract:', ZkOtpValidator)
}

export function connectFactory(provider: ethers.providers.JsonRpcProvider) {
  let signer = provider.getSigner()

  const iface = new ethers.utils.Interface(zkWalletFactoryJson.abi)

  zkWalletFactory = new ethers.Contract(
    address['zkWalletFactory'],
    iface,
    signer
  )
  console.log('Connect to ZkWalletFactory Contract:', zkWalletFactory)
  return zkWalletFactory
}

export async function deployZkOTPValidator(
  root: BigInt,
  provider: ethers.providers.JsonRpcProvider
) {
  const iface = new ethers.utils.Interface(ZkOtpValidatorJson.abi)
  let signer = provider.getSigner()
  const ZkOTPValidatorFactory = new ethers.ContractFactory(
    iface,
    ZkOtpValidatorJson.bytecode,
    signer
  )

  const ZkOTPValidator = await ZkOTPValidatorFactory.deploy(
    root,
    address['OtpMerkleTreeVerifier']
  )

  localStorage.setItem('ZkOTPValidator Address', ZkOTPValidator.address)

  return ZkOTPValidator.address
}

export async function deployZkWallet(
  otpVerifier: string,
  root: BigInt,
  provider: ethers.providers.JsonRpcProvider
) {
  connectFactory(provider)

  const zkWalletFactoryContract = await zkWalletFactory.deployWallet(
    0,
    [],
    [],
    0,
    otpVerifier,
    root
  )

  return zkWalletFactoryContract.address
}

// export async function zkProof(input: Object) {

//     let calldata = await generateCalldata(input);
//     let tx;

//     if (calldata) {
//         tx = await otp.naiveApproval(calldata[0], calldata[1], calldata[2], calldata[3])
//             .catch((error: any) => {
//                 console.log(error);
//                 let errorMsg;
//                 if (error.reason) {
//                     errorMsg = error.reason;
//                 } else if (error.data.message) {
//                     errorMsg = error.data.message;
//                 } else {
//                     errorMsg = "Unknown error."
//                 }
//                 throw errorMsg;
//             });
//     } else {
//         throw new Error("Witness generation failed.");
//     }
//     return tx;
// }

export async function zkTimestampProof(input: Object) {
  let calldata = await generateCalldata(input, 'otp_verification')
  let tx

  if (calldata) {
    tx = await ZkOtpValidator.verifyOTP(
      calldata[0],
      calldata[1],
      calldata[2],
      calldata[3]
    ).catch((error: any) => {
      console.log(error)
      let errorMsg
      if (error.reason) {
        errorMsg = error.reason
      } else if (error.data.message) {
        errorMsg = error.data.message
      } else {
        errorMsg = 'Unknown error.'
      }
      throw errorMsg
    })
  } else {
    throw new Error('Witness generation failed.')
  }
  return tx
}
