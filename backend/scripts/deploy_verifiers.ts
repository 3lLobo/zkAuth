import { ethers } from 'hardhat'

async function main() {
  const hashCheckVerifier = await ethers.getContractFactory('HashCheckVerifier')
  const HashCheckVerifier = await hashCheckVerifier.deploy()

  await HashCheckVerifier.deployed()

  console.log(`HashCheckVerifier successfully deployed to ${HashCheckVerifier.address}`)

  const otpMerkleTreeVerifier = await ethers.getContractFactory('OtpMerkleTreeVerifier')
  const OtpMerkleTreeVerifier = await otpMerkleTreeVerifier.deploy()

  await OtpMerkleTreeVerifier.deployed()

  console.log(`OtpMerkleTreeVerifier successfully deployed to ${OtpMerkleTreeVerifier.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
