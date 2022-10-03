/* global BigInt */

import { buildPoseidon } from 'circomlibjs'
import totp from 'totp-generator'
import base32 from 'hi-base32'
import { ethers } from 'ethers'
import { encrypt } from 'eth-sig-util'
import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

// Magnitude of the Merkle tree
const TREE_MAG = 16
// exp 11 equals 17 hours into the future. exp 16 equals 22 days
const zkAuthHours = 2 ** TREE_MAG * 30 / (60 * 60)
const zkAuthDays = 2 ** TREE_MAG * 30 / (60 ** 2) / 24

// message which gets encrypted and is used als secret  
const KEY = 'zkSecret'

/**
 * Prepares Merkle Tree of hashes of [time, OTP(time)] and stores it on storage
 *
 * @returns an array containing the uri of TOTP, the secret of the TOTP, the root of the merkle tree and the encrypted hashes
 */
export async function prepareMerkleTree(
  address: string
): Promise<[string, string, BigInt, string] | undefined> {
  // Use the same key every time, this way the user doesn't need to reset his auth app
  const totpSecret = await getEncryptedKey()

  if (!totpSecret) {
    console.error("Error encrypting the secret!")
    return
  }
  const uri = prepareURI(totpSecret, address)
  const startTime = Math.floor(Date.now() / 30000 - 1) * 30000
  let poseidon = await buildPoseidon()
  let hashes: [] = []
  let tokens: Record<number, any> = {}

  // Generate the hashes (merkle tree leaves)
  let hash
  for (let i = 0; i < 2 ** TREE_MAG; i++) {
    let time = startTime + i * 30000
    let token = totp(totpSecret, { timestamp: time })
    tokens[time] = token
    hash = poseidon.F.toObject(poseidon([BigInt(time), BigInt(token)]))
    hashes.push(hash)
  }

  let root: BigInt
  // Generate the tree. The last hash is the root
  for (let i = 0; i < 2 ** TREE_MAG - 1; i++) {
    root = poseidon.F.toObject(poseidon([hashes[i * 2], hashes[i * 2 + 1]]))
    hashes.push(root)
  }

  const encAES = await AES.encrypt(hashes.join(','), totpSecret)
  const encHashes = encAES.toString()
  // console.log("🚀 ~ file: utils.ts ~ line 59 ~ encHashes", encHashes)
  // // test decryption
  // const dechashes = await AES.decrypt(encHashes, totpSecret)
  // console.log("🚀 ~ file: utils.ts ~ line 62 ~ dechashes", dechashes.toString(CryptoJS.enc.Utf8).split(',').length)
  // console.log("🚀 ~ file: utils.ts ~ line 62 ~ dechashes", hashes.length)

  if (encHashes) {
    return [uri, totpSecret, root, encHashes]
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
  // let hashes = localStorage.getItem('OTPhashes')?.split(',').map(BigInt)
  // console.log(hashes)

  const decryptionKey = await getEncryptedKey()
  const decAES = await AES.decrypt(encryptedHashes, decryptionKey)
  const decHashes = decAES.toString(CryptoJS.enc.Utf8)
  const hashes = decHashes?.split(',').map(BigInt)

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

    for (var i = 0; i < TREE_MAG; i++) {
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

/**
 * It encrypts a key using the encryption public key of the user's Ethereum address
 * @returns The encrypted key is being returned.
 */

async function getEncryptedKey(): Promise<string | undefined> {
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
        { data: KEY },
        'x25519-xsalsa20-poly1305'
      )
      const cleanBase32 = base32.encode(encryptedData.ciphertext).replace(/=/g, '')
      return cleanBase32
    }
  }
}


/**
 * It takes a string of data, gets the encryption public key from the Metamask provider, encrypts the
 * data with the public key, and returns the encrypted data
 * @param {string} data - The data you want to encrypt.
 * @returns The encrypted data is being returned.
 */

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
      console.log("🚀 ~ file: utils.ts ~ line 233 ~ encryptedData", encryptedData)

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
