/* global BigInt */

import { buildPoseidon } from 'circomlibjs'
import totp from 'totp-generator'
import crypto from 'crypto-browserify'
import base32 from 'hi-base32'
import QRCode from 'qrcode'

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

  // TODO: Replace this local storage to IPFS or Ceramic
  localStorage.setItem('OTPhashes', hashes.join(','))
  return [uri, SECRET, root]
}

/**
 * Generates inputs for on Chain OTP verification.
 *
 * @param otp - The otp entered by the user to verify
 * @returns a formatted object ready to use with contract verification
 */
export async function generateInput(otp: string | number) {
  // TODO: Replace this local storage to IPFS or Ceramic. Optimization: Get it on local on load.
  let hashes = localStorage.getItem('OTPhashes')?.split(',').map(BigInt)
  console.log(hashes)

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
