import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import { expect } from 'chai'
import { ethers } from 'hardhat'


describe('TotpAuthenticator', () => {

  async function deployTotp() {
    const Totp = await ethers.getContractFactory("TotpAuthenticator")
    const totp = await Totp.deploy()

    await totp.deployed()
    console.log(`Totp successfully deployed to ${totp.address}`)
    return totp
  }
  deployTotp()
}


)