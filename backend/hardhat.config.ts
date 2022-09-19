import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    // for testnet
    'optimism-goerli': {
      url: 'https://goerli.optimism.io',
      // accounts: [privateKey1, ]
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
