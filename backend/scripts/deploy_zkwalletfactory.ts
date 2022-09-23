import { ethers } from 'hardhat'

async function main() {
  const zkWalletFactory = await ethers.getContractFactory('ZkWalletFactory')
  const ZkWalletFactory = await zkWalletFactory.deploy()

  await ZkWalletFactory.deployed()

  console.log(`ZkWalletFactory successfully deployed to ${ZkWalletFactory.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
