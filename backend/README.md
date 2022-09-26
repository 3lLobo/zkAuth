# This is the bacqend, the smart-contract crib

![crib](https://user-images.githubusercontent.com/25290565/190274993-05c12f02-aa56-4041-af27-67ffda79bcf1.jpg)

We proudly present the TotpAuthenticator.
One step closer to zero trust and one step away from web2.
You can now use 2FA authentication for your business contacts your web-applications or even your IOTs without a centralized database storing your keys and authenticating users. The Blocqchain takes over!

## Delpoy on Optimism Görli

First set your private key on a .env file

yarn hardhat deploy --network optimsm-goerli

## Cyborg Run 🏃‍♂️

Yarn, remix and hardhat:

```shell
yarn hardhat node

yarn remixed -s . --remix-ide https://remix.ethereum.org

yarn hardhat test
```

## Hashing

How to calculate and submit hash:

convert TOTP (eg. `123456`) to bytes/hex with ethers. Padding left!!!
Then sha256 it and insert `0x` at the start.
That's it, now it should match the sha256 on-chain.

123456 as hex: 0x000000000000000000000000000000000000000000000000000000000001e240

123456 to hex to sha256 hash: 0x4a438cf911dc63bd7d53c1be977516e82f4d8f19b950d72d6730d4717709eae1

[bytes32](https://web3-type-converter.onbrn.com/)
[sha256 from hex](https://www.liavaag.org/English/SHA-Generator/)

## Optimism

A blocqchain with free lunch, I mean, free gas! How could we not choose for Optimism?

Contract TotpAuthenticator deployed to Optimism Goerli:

```bash
0xfa99801Ec6BeFcbfC1eB2d12dc8255453574b276
#  Deployment transaction hash
0x846528416731ddd42e37b8f2dc9fbac24aaf105ebe23d53707a680fc99d68ce0
```

Also on Main Goerli bcs Opt Goerli goes not yet get indexed by theGraph:

```bash
0x5E9607EE52286732A5E3A0Fc57dF367bCb8adAa5
# Tx hash
0x1462f472eb8cda174a47529f6ea0be6a97965e175be9f7f3709a54844228f24a
```

It's the same address, ain't that funney 🤔
**Update** not the same anymore after debugging the contract and redeploying. Curious if the new contract would again give the same pub address on Optimism - nope.

Owner wallet:

```sh
0x369551E7c1D29756e18BA4Ed7f85f2E6663e1e8d
```

[Testnet Explorer](https://blockscout.com/optimism/goerli)

[Faucets](https://optimismfaucet.xyz/)
