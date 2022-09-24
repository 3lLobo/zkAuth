import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import fs from 'fs'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { owner } = await getNamedAccounts()

  const ZkWalletFactory = await deploy('ZkWalletFactory', {
    from: owner,
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  })

  fs.writeFileSync(
    './config.ts',
    `export const zkWalletFactoryAddress = "${ZkWalletFactory.address}"\n`
  )
}
export default func
func.tags = ['all']
