import { HardhatUserConfig } from 'hardhat/config'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import '@typechain/hardhat'

import '@nomicfoundation/hardhat-toolbox'
require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  namedAccounts: {
    owner: 0,
  },
  networks: {
    // for testnet
    'optimism-goerli': {
      url: 'https://goerli.optimism.io',
      accounts: [process.env.PRIVATE_GOERLII_KEY ?? ''],
    },
    // for the local dev environment
    'optimism-local': {
      url: 'http://localhost:8545',
      accounts: [
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
      ],
    },
  },
}

export default config
