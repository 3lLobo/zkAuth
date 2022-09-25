import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import fs from 'fs'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { owner } = await getNamedAccounts()

  const HashCheckVerifier = await deploy('HashCheckVerifier', {
    from: owner,
    log: true,
    autoMine: true,
  })

  const OtpMerkleTreeVerifier = await deploy('OtpMerkleTreeVerifier', {
    from: owner,
    log: true,
    autoMine: true,
  })

  const ZkWalletFactory = await deploy('ZkWalletFactory', {
    from: owner,
    args: [HashCheckVerifier.address],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  })

  fs.writeFileSync(
    './config.ts',
    `export const address = { 
      zkWalletFactory: "${ZkWalletFactory.address}",
      HashCheckVerifier: "${HashCheckVerifier.address}",
      OtpMerkleTreeVerifier: "${OtpMerkleTreeVerifier.address}",
    }\n`
  )
}
export default func
func.tags = ['all']
