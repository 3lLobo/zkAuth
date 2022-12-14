/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IHashCheckVerifier,
  IHashCheckVerifierInterface,
} from "../../../contracts/ZkSocialRecoveryWallet.sol/IHashCheckVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "a",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "b",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "c",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[1]",
        name: "input",
        type: "uint256[1]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IHashCheckVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): IHashCheckVerifierInterface {
    return new utils.Interface(_abi) as IHashCheckVerifierInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IHashCheckVerifier {
    return new Contract(address, _abi, signerOrProvider) as IHashCheckVerifier;
  }
}
