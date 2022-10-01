import { ethers } from 'ethers'
import { address } from '../../backend/config'
import { generateCalldata } from './circuits/generate_calldata'
import { buildPoseidon } from 'circomlibjs'

import zkWalletFactoryJson from '../../backend/artifacts/contracts/ZkWalletFactory.sol/ZkWalletFactory.json'

import ZkWalletJson from '../../backend/artifacts/contracts/ZkSocialRecoveryWallet.sol/ZkSocialRecoveryWallet.json'

let zkWalletFactory: ethers.Contract
let ZkWallet: ethers.Contract

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

export async function deployZkWallet(
  root: BigInt,
  provider: ethers.providers.JsonRpcProvider
) {
  connectFactory(provider)

  await zkWalletFactory.deployWallet(
    0,
    0,
    address['OtpMerkleTreeVerifier'],
    root
  )
}

export async function connectZkWallet(
  provider: ethers.providers.JsonRpcProvider,
  userAddress: string
) {
  // connect to factory to retrieve wallet address
  connectFactory(provider)
  const walletAddress = await zkWalletFactory.userAddressToWalletAddress(
    userAddress
  )

  let signer = provider.getSigner()
  const iface = new ethers.utils.Interface(ZkWalletJson.abi)
  if (walletAddress == ethers.constants.AddressZero) {
    return undefined
  }
  ZkWallet = new ethers.Contract(walletAddress, iface, signer)
  console.log('Connected to ZkWallet Contract:', ZkWallet)

  return ZkWallet
}

export async function zkTimestampProof(input: Object) {
  let calldata = await generateCalldata(input, 'otp_verification')
  let tx

  if (calldata) {
    tx = await ZkWallet.verifyOTP(
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

export async function setSocialRecovery(
  provider: ethers.providers.JsonRpcProvider,
  accounts: string[]
) {
  const signer = provider.getSigner()
  const zkWalletContract = ZkWallet.connect(signer)
  await zkWalletContract.setTrustees(accounts)
}

export async function initiateSocialRecovery(
  provider: ethers.providers.JsonRpcProvider,
  passwords: string[]
) {
  const signer = provider.getSigner()
  const zkWalletContract = ZkWallet.connect(signer)
  let hashes: string[] = []

  let poseidon = await buildPoseidon()
  for (let password in passwords) {
    const hash = poseidon.F.toObject(poseidon(password))
    hashes.push(hash)
  }

  await zkWalletContract.setTrusteesPasswords(hashes)
}
