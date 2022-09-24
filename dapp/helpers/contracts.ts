import { ethers } from 'ethers'
import { address } from '../../backend/config'
import { generateCalldata } from './circuits/generate_calldata'

import zkWalletFactoryJson from '../../backend/artifacts/contracts/ZkWalletFactory.sol/ZkWalletFactory.json'

import ZkOtpValidatorJson from '../../backend/artifacts/contracts/ZkOtpValidator.sol/ZkOtpValidator.json'

let zkWalletFactory: ethers.Contract
let ZkOtpValidator: ethers.Contract

export async function connectTOTPVerifier(
  provider: ethers.providers.JsonRpcProvider
) {
  let signer = provider.getSigner()
  console.log('signer: ', await signer.getAddress())

  ZkOtpValidator = new ethers.Contract(
    address['OtpMerkleTreeVerifier'],
    ZkOtpValidatorJson.abi,
    signer
  )

  console.log('Connect to zkOTP Contract:', ZkOtpValidator)
}

export async function connectFactory(
  provider: ethers.providers.JsonRpcProvider
) {
  let signer = provider.getSigner()
  console.log('signer: ', await signer.getAddress())

  zkWalletFactory = new ethers.Contract(
    address['zkWalletFactory'],
    zkWalletFactoryJson.abi,
    signer
  )
  console.log('Connect to ZkWalletFactory Contract:', zkWalletFactory)
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

  const tx = await ZkOTPValidatorFactory.deploy([
    root,
    address['OtpMerkleTreeVerifier'],
  ])

  await tx.wait()

  let deployedAddress = tx.events[0].args.newAddress

  localStorage.setItem('ZkOTPValidator Address', deployedAddress)

  return deployedAddress
}

export async function deployZkWallet(
  otpVerifier: string,
  root: BigInt,
  provider: ethers.providers.JsonRpcProvider
) {
  await connectFactory(provider)

  let tx = await zkWalletFactory.deployWallet(0, [], [], 0, otpVerifier, root)
  await tx.wait()

  let deployedAddress = tx.events[0].args.newAddress

  return deployedAddress
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
  let calldata = await generateCalldata(input)
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
