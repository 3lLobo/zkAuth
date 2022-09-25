/* global BigInt */

import { buildPoseidon } from 'circomlibjs'
import totp from 'totp-generator'
import crypto from 'crypto-browserify'
import base32 from 'hi-base32'
import { ethers } from 'ethers'
import { encrypt, EthEncryptedData } from 'eth-sig-util'

/**
 * Prepares Merkle Tree of hashes of [time, OTP(time)] and stores it on storage
 *
 * @returns an array containing the uri of TOTP, the secret of the TOTP, the root of the merkle tree and the encrypted hashes
 */
export async function prepareMerkleTree(
  address: string
): Promise<[string, string, BigInt, string] | undefined> {
  const SECRET = prepareSecret()
  const uri = prepareURI(SECRET, address)

  const startTime = Math.floor(Date.now() / 30000 - 1) * 30000
  let poseidon = await buildPoseidon()
  let hashes: BigInt[] = []
  let tokens: Record<number, any> = {}

  for (let i = 0; i < 2 ** 7; i++) {
    let time = startTime + i * 30000
    let token = totp(SECRET, { timestamp: time })
    tokens[time] = token
    hashes.push(poseidon.F.toObject(poseidon([BigInt(time), BigInt(token)])))
  }

  // compute root
  let k = 0

  for (let i = 2 ** 7; i < 2 ** 8 - 1; i++) {
    hashes.push(
      poseidon.F.toObject(poseidon([hashes[k * 2], hashes[k * 2 + 1]]))
    )
    k++
  }
  let root = hashes[2 ** 8 - 2]
  console.log('Merkle root:', root)
  // console.table("hashes", hashes)

  // TODO: Replace this local storage to IPFS or Ceramic
  const encryptedHashes = await encryptMetamask(hashes.join(','))
  localStorage.setItem('OTPhashes', hashes.join(','))

  if (encryptedHashes) {
    return [uri, SECRET, root, encryptedHashes]
  }
}

/**
 * Generates inputs for on Chain OTP verification.
 *
 * @param otp - The otp entered by the user to verify
 * @param encryptedHashes - the user specific encrypted hashes
 * @returns a formatted object ready to use with contract verification
 */
export async function generateInput(
  otp: string | number,
  encryptedHashes: string
) {
  let hashes = localStorage.getItem('OTPhashes')?.split(',').map(BigInt)
  // console.log(hashes)
  const hashesString = await decryptOrSignMetamask(encryptedHashes, 'eth_decrypt')
  // const hashes = hashesString.split(',').map(BigInt) 

  if (hashes) {

    let poseidon = await buildPoseidon()

    let currentTime = Math.floor((Date.now() - 5000) / 30000) * 30000 // 3lLobo: Gave it a 5sec backwards buffer

    let currentNode = poseidon.F.toObject(
      poseidon([BigInt(currentTime), BigInt(otp)])
    )
    /* Debugging logs for later:
    // console.log("Hashes length: ", hashes.length); // 255
    // console.log("Hashes: ", hashes); // 255
    // console.log("currentNode: ", Number.parseInt(currentNode)) // 1.9353502285454398e+76
    // console.log("Index Of: ", hashes.indexOf(currentNode))
    */
    if (hashes.indexOf(currentNode) < 0) {
      throw new Error('Invalid OTP.')
    }

    let pathElements = []
    let pathIndex = []

    for (var i = 0; i < 7; i++) {
      if (hashes.indexOf(currentNode) % 2 === 0) {
        pathIndex.push(0)
        let currentIndex = hashes.indexOf(currentNode) + 1
        //console.log(currentIndex);
        pathElements.push(hashes[currentIndex])
        currentNode = poseidon.F.toObject(
          poseidon([hashes[currentIndex - 1], hashes[currentIndex]])
        )
      } else {
        pathIndex.push(1)
        let currentIndex = hashes.indexOf(currentNode) - 1
        //console.log(currentIndex);
        pathElements.push(hashes[currentIndex])
        currentNode = poseidon.F.toObject(
          poseidon([hashes[currentIndex], hashes[currentIndex + 1]])
        )
      }
    }

    return {
      time: currentTime,
      otp: otp,
      pathElements: pathElements,
      pathIndex: pathIndex,
    }
  }
}

function prepareURI(secret: string, address: string) {
  const type = 'totp'
  const issuer = 'zkAuth' //encodeURIComponent(issuer)
  const algorithm = 'SHA1'
  const period = '30'
  const digits = '6'

  const uri = `otpauth://${type}/${issuer}:${address}?secret=${secret}&issuer=${issuer}&algorithm=${algorithm}&digits=${digits}&period=${period}`

  return uri
}

function prepareSecret(length = 20) {
  const randomBuffer = crypto.randomBytes(length)
  return base32.encode(randomBuffer).replace(/=/g, '')
}

// request MetaMask to decrypt data with the users wallet
// decrypt DEPRECATED still works tho https://docs.metamask.io/guide/rpc-api.html#restricted-methods
// Examples https://github.com/metamask/test-dapp
// Signing v4 needs a structure as shown in msgV4
/*
@param method: 
  'eth_decrypt' to decrypt
  'eth_signTypedData_v4' to sign 
*/
export async function decryptOrSignMetamask(
  encryptedData: string,
  method: string
): Promise<string | undefined> {
  var provider = new ethers.providers.Web3Provider(window.ethereum)
  var from = await provider.listAccounts()
  let params

  if (method === 'eth_signTypedData_v4') {
    params = [from[0], msgV4(encryptedData)]
  } else if (method === 'eth_decrypt') {
    params = [encryptedData, from[0]]
  } else {
    return
  }

  if (provider.provider.request) {
    const data = await provider.provider.request({
      method,
      params,
    })
    return data
  }
}

export async function encryptMetamask(
  data: string
): Promise<string | undefined> {
  // let encryptionPublicKey: string;
  var provider = new ethers.providers.Web3Provider(window.ethereum)
  var from = await provider.listAccounts()

  if (provider.provider.request) {
    const encryptionPublicKey = await provider.provider.request({
      method: 'eth_getEncryptionPublicKey',
      params: [from[0]],
    })
    if (encryptionPublicKey) {
      const encryptedData = await encrypt(
        encryptionPublicKey,
        { data },
        'x25519-xsalsa20-poly1305'
      )

      return JSON.stringify(encryptedData)
    }
  }
}

// Standard V4 msg to be signed resolving in the key for encryption
const msgV4 = (Message: string): string => {
  return JSON.stringify({
    domain: {
      name: 'zkAuth App',
      version: '1.11',
      // verifyingContract: '0xfa99801Ec6BeFcbfC1eB2d12dc8255453574b276',
    },
    // Defining the message signing data content.
    message: {
      Key: 'zk-Key',
      Message,
    },
    // Refers to the keys of the *types* object below.
    primaryType: 'SignedKey',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        // { name: 'verifyingContract', type: 'address' },
      ],
      SignedKey: [
        { name: 'Message', type: 'string' },
        { name: 'Key', type: 'string' },
      ],
    },
  })
}

const exampleMsg: string =
  'Sign this msg to provide a wallet-bound key for en-/decryption of the Merkle tree hashes used to proof your authentication with zero Knowledge. Also: plant a tree 🌳'
