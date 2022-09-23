/* global BigInt */

import { buildPoseidon } from 'circomlibjs'
import totp from 'totp-generator'
import crypto from 'crypto-browserify'
import base32 from 'hi-base32'
import QRCode from 'qrcode'
import { ethers } from 'ethers'

const uriPrefix = 'otpauth://totp/zkAuth:account?secret='
const uriSuffix = '&issuer=zkAuth'

/**
 * Prepares Merkle Tree of hashes of [time, OTP(time)] and stores it on storage
 *
 * @returns an array containing the uri of TOTP, the secret of the TOTP and the root of the merkle tree
 */
export async function prepareMerkleTree() {
  const SECRET = prepareSecret()
  const uri = await prepareQRCode(SECRET)

  const startTime = Math.floor(Date.now() / 30000 - 1) * 30000
  let poseidon = await buildPoseidon()
  let hashes: string[] = []
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
  const encryptedHashes = requestMetamask(hashes.join(','), 'eth_encrypt')
  // localStorage.setItem('OTPhashes', hashes.join(','))

  return [uri, SECRET, root, encryptedHashes]
}

/**
 * Generates inputs for on Chain OTP verification.
 *
 * @param otp - The otp entered by the user to verify
 * @returns a formatted object ready to use with contract verification
 */
export async function generateInput(otp: string | number, encryptedHashes: string) {
  // TODO: Replace this local storage to IPFS or Ceramic. Optimization: Get it on local on load.
  // let hashes = localStorage.getItem('OTPhashes')?.split(',').map(BigInt)
  // console.log(hashes)
  const hashes = await requestMetamask(encryptedHashes, 'eth_decrypt')

  if (hashes) {
    let poseidon = await buildPoseidon()

    let currentTime = Math.floor(Date.now() / 30000) * 30000

    let currentNode = poseidon.F.toObject(
      poseidon([BigInt(currentTime), BigInt(otp)])
    )
    //console.log(currentNode);

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

async function prepareQRCode(secret: string) {
  return await QRCode.toDataURL(uriPrefix.concat(secret).concat(uriSuffix))
}

function prepareSecret(length = 20) {
  const randomBuffer = crypto.randomBytes(length)
  return base32.encode(randomBuffer).replace(/=/g, '')
}


// request MetaMask to decrypt data with the users wallet
// decrypt DEPRECATED still works tho https://docs.metamask.io/guide/rpc-api.html#restricted-methods
// Signing v4 needs a structure as shown in msgV4
/*
@param method: 
  'eth_decrypt' to decrypt
  'eth_decrypt' to encrypt
  'eth_signTypedData_v4' to sign 
*/
async function requestMetamask(encryptedData: string, method: string): Promise<string | undefined> {
  var provider = new ethers.providers.Web3Provider(window.ethereum)
  var from = await provider.listAccounts()

  if (provider.provider.request) {

    const data = await provider.provider.request({
      method,
      params: [encryptedData, from[0]],
    })
    return data
  }

}

// Standard msg to be signed resolving in the key for encrytion
const msgV4 = (Message: string): string => {
  return JSON.stringify({
    domain: {
      name: 'zkAuth App',
      version: '1.11',
    },
    // Defining the message signing data content.
    message: {
      Key: "zk-Key",
      Message,
    },
    // Refers to the keys of the *types* object below.
    primaryType: 'SignedKey',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
      ],
      SignedKey: [
        { name: 'Message', type: 'string' },
        { name: 'Key', type: 'string' },
      ],
    },
  }
  )
};

const exampleMsg: string = "Sign this msg to provide a wallet-bound key for en-/decryption of the Merkle tree hashes used to proof your authentication with zero Knowledge. Also: plant a tree 🌳"
