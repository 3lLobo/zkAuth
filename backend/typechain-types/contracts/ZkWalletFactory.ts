/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ZkWalletFactoryInterface extends utils.Interface {
  functions: {
    "deployWallet(uint256,uint256,address,uint256)": FunctionFragment;
    "getUserWalletAddress(address)": FunctionFragment;
    "hashCheckVerifier()": FunctionFragment;
    "userAddressToWalletAddress(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deployWallet"
      | "getUserWalletAddress"
      | "hashCheckVerifier"
      | "userAddressToWalletAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployWallet",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserWalletAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hashCheckVerifier",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "userAddressToWalletAddress",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserWalletAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hashCheckVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userAddressToWalletAddress",
    data: BytesLike
  ): Result;

  events: {
    "WalletCreated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "WalletCreated"): EventFragment;
}

export interface WalletCreatedEventObject {
  walletAddress: string;
}
export type WalletCreatedEvent = TypedEvent<[string], WalletCreatedEventObject>;

export type WalletCreatedEventFilter = TypedEventFilter<WalletCreatedEvent>;

export interface ZkWalletFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZkWalletFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployWallet(
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      _root: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getUserWalletAddress(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { _walletAddress: string }>;

    hashCheckVerifier(overrides?: CallOverrides): Promise<[string]>;

    userAddressToWalletAddress(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  deployWallet(
    _ownerPasswordHash: PromiseOrValue<BigNumberish>,
    _thresholdForRecovery: PromiseOrValue<BigNumberish>,
    _otpVerifier: PromiseOrValue<string>,
    _root: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getUserWalletAddress(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  hashCheckVerifier(overrides?: CallOverrides): Promise<string>;

  userAddressToWalletAddress(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    deployWallet(
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      _root: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUserWalletAddress(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    hashCheckVerifier(overrides?: CallOverrides): Promise<string>;

    userAddressToWalletAddress(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "WalletCreated(address)"(walletAddress?: null): WalletCreatedEventFilter;
    WalletCreated(walletAddress?: null): WalletCreatedEventFilter;
  };

  estimateGas: {
    deployWallet(
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      _root: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getUserWalletAddress(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hashCheckVerifier(overrides?: CallOverrides): Promise<BigNumber>;

    userAddressToWalletAddress(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployWallet(
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      _root: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getUserWalletAddress(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hashCheckVerifier(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    userAddressToWalletAddress(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
