# This is the smart-contract crib

![crib](https://user-images.githubusercontent.com/25290565/190274993-05c12f02-aa56-4041-af27-67ffda79bcf1.jpg)

We disclose the smart-logic, turing the wheels of the zkAuthenticator.
One step closer to zero trust and away from web2.

The zkAuth onchain authentication can be invoked by both wallets and contracts.
For optimal security and user-experience, incorporate it with 2nd gen Wallets (ERC 4337) or similar contracts supporting paymasters. 



## The turing wheels

Here an walk-through of our complete contracts:

### zkWalletFactory

<!-- TODO:  -->
Upon successfully setting up 2FA, the msg.sender gets assigned a personal `ZkSocialRecoveryWallet`.
The Factory takes on the tasks of creating those wallets, mapping addresses to wallets and connecting to the hash-verifier for social recovery.

### HashCheckVerifier

<!-- TODO: -->
The logic used to recover wa compromised wallet and reassign its owner.

### OtpMerkleTreeVerifier

<!-- TODO: -->
The logic  to verify the wallet specific 2 factor authentication.


## Delpoy on Optimism Görli

First set your private key on a .env file

yarn hardhat deploy --network optimsm-goerli

## Cyborg Run 🏃‍♂️

How to setup the project, compile the contracts, run the test and deploy.

@Rish check if you can scale scope the tests :)


Yarn, remix and hardhat:

```shell
yarn hardhat node

yarn remixed -s . --remix-ide https://remix.ethereum.org

yarn hardhat test
```


## Optimism

A blocqchain with free lunch, I mean, free gas! How could we not choose for Optimism?


### Contracts on Optimism-Goerli

Last deployment: 26.9.2022

```js
export const address = { 
      zkWalletFactory: "0xcaF6c8C45c4fA0d2F6BFcE0c904FBedE08c773f1",
      HashCheckVerifier: "0xDFD466d2A14cB2895f2C8BCacc67BDEF37C60De0",
      OtpMerkleTreeVerifier: "0x87469041b414E1f2dEC2e79e32f4E911E7f50622",
    }
```

<!-- Contract TotpAuthenticator deployed to Optimism Goerli:

```bash
0xfa99801Ec6BeFcbfC1eB2d12dc8255453574b276
#  Deployment transaction hash
0x846528416731ddd42e37b8f2dc9fbac24aaf105ebe23d53707a680fc99d68ce0
``` -->

Deployer wallet:

```sh
0x369551E7c1D29756e18BA4Ed7f85f2E6663e1e8d
```

[Testnet Explorer](https://blockscout.com/optimism/goerli)

[Faucets](https://optimismfaucet.xyz/)


## Notes4devs

A collection of more and less relevant technical tips and hacqs for our fellow devs and future selfs.

### Onchain sha256 Hashing

How to calculate and submit hash:

convert TOTP (eg. `123456`) to bytes/hex with ethers. Padding left!!!
Then sha256 it and insert `0x` at the start.
That's it, now it should match the sha256 on-chain.

123456 as hex: 0x000000000000000000000000000000000000000000000000000000000001e240

123456 to hex to sha256 hash: 0x4a438cf911dc63bd7d53c1be977516e82f4d8f19b950d72d6730d4717709eae1

[bytes32](https://web3-type-converter.onbrn.com/)
[sha256 from hex](https://www.liavaag.org/English/SHA-Generator/)
