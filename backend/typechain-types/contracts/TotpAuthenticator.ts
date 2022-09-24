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

export type AuthDataStruct = {
  totp5: PromiseOrValue<BigNumberish>;
  totp6hash: PromiseOrValue<BytesLike>;
  time: PromiseOrValue<BigNumberish>;
};

export type AuthDataStructOutput = [BigNumber, string, BigNumber] & {
  totp5: BigNumber;
  totp6hash: string;
  time: BigNumber;
};

export type AuthenticationStruct = {
  isValid: PromiseOrValue<boolean>;
  time: PromiseOrValue<BigNumberish>;
};

export type AuthenticationStructOutput = [boolean, BigNumber] & {
  isValid: boolean;
  time: BigNumber;
};

export interface TotpAuthenticatorInterface extends utils.Interface {
  functions: {
    "authenticate(uint256,uint256)": FunctionFragment;
    "completedAuth(uint256)": FunctionFragment;
    "getAuthentication(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "requestCounter()": FunctionFragment;
    "requests(uint256,uint256)": FunctionFragment;
    "resetAuthenticator()": FunctionFragment;
    "responses(uint256)": FunctionFragment;
    "setRequest(address)": FunctionFragment;
    "setResponse(uint256,uint256,bytes32,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "authenticate"
      | "completedAuth"
      | "getAuthentication"
      | "owner"
      | "renounceOwnership"
      | "requestCounter"
      | "requests"
      | "resetAuthenticator"
      | "responses"
      | "setRequest"
      | "setResponse"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "authenticate",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "completedAuth",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuthentication",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requestCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requests",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "resetAuthenticator",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "responses",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRequest",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setResponse",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "authenticate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "completedAuth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAuthentication",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requests", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "resetAuthenticator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "responses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRequest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setResponse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "EventAuthRequest(address,address,uint256)": EventFragment;
    "EventAuthResponse(address,uint256,tuple)": EventFragment;
    "EventAuthValid(uint256,tuple)": EventFragment;
    "EventResetContract(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EventAuthRequest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EventAuthResponse"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EventAuthValid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EventResetContract"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface EventAuthRequestEventObject {
  requestor: string;
  target: string;
  requestId: BigNumber;
}
export type EventAuthRequestEvent = TypedEvent<
  [string, string, BigNumber],
  EventAuthRequestEventObject
>;

export type EventAuthRequestEventFilter =
  TypedEventFilter<EventAuthRequestEvent>;

export interface EventAuthResponseEventObject {
  responder: string;
  requestId: BigNumber;
  response: AuthDataStructOutput;
}
export type EventAuthResponseEvent = TypedEvent<
  [string, BigNumber, AuthDataStructOutput],
  EventAuthResponseEventObject
>;

export type EventAuthResponseEventFilter =
  TypedEventFilter<EventAuthResponseEvent>;

export interface EventAuthValidEventObject {
  requestId: BigNumber;
  authentication: AuthenticationStructOutput;
}
export type EventAuthValidEvent = TypedEvent<
  [BigNumber, AuthenticationStructOutput],
  EventAuthValidEventObject
>;

export type EventAuthValidEventFilter = TypedEventFilter<EventAuthValidEvent>;

export interface EventResetContractEventObject {
  time: BigNumber;
}
export type EventResetContractEvent = TypedEvent<
  [BigNumber],
  EventResetContractEventObject
>;

export type EventResetContractEventFilter =
  TypedEventFilter<EventResetContractEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TotpAuthenticator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TotpAuthenticatorInterface;

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
    authenticate(
      _requestId: PromiseOrValue<BigNumberish>,
      _lastDigit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    completedAuth(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber] & { isValid: boolean; time: BigNumber }>;

    getAuthentication(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[AuthenticationStructOutput]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestCounter(overrides?: CallOverrides): Promise<[BigNumber]>;

    requests(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    resetAuthenticator(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    responses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        totp5: BigNumber;
        totp6hash: string;
        time: BigNumber;
      }
    >;

    setRequest(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setResponse(
      _requestId: PromiseOrValue<BigNumberish>,
      _totp5: PromiseOrValue<BigNumberish>,
      _totp6hash: PromiseOrValue<BytesLike>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  authenticate(
    _requestId: PromiseOrValue<BigNumberish>,
    _lastDigit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  completedAuth(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[boolean, BigNumber] & { isValid: boolean; time: BigNumber }>;

  getAuthentication(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<AuthenticationStructOutput>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestCounter(overrides?: CallOverrides): Promise<BigNumber>;

  requests(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  resetAuthenticator(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  responses(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber] & {
      totp5: BigNumber;
      totp6hash: string;
      time: BigNumber;
    }
  >;

  setRequest(
    _target: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setResponse(
    _requestId: PromiseOrValue<BigNumberish>,
    _totp5: PromiseOrValue<BigNumberish>,
    _totp6hash: PromiseOrValue<BytesLike>,
    _time: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    authenticate(
      _requestId: PromiseOrValue<BigNumberish>,
      _lastDigit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    completedAuth(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber] & { isValid: boolean; time: BigNumber }>;

    getAuthentication(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<AuthenticationStructOutput>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    requestCounter(overrides?: CallOverrides): Promise<BigNumber>;

    requests(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    resetAuthenticator(overrides?: CallOverrides): Promise<void>;

    responses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        totp5: BigNumber;
        totp6hash: string;
        time: BigNumber;
      }
    >;

    setRequest(
      _target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setResponse(
      _requestId: PromiseOrValue<BigNumberish>,
      _totp5: PromiseOrValue<BigNumberish>,
      _totp6hash: PromiseOrValue<BytesLike>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "EventAuthRequest(address,address,uint256)"(
      requestor?: null,
      target?: null,
      requestId?: null
    ): EventAuthRequestEventFilter;
    EventAuthRequest(
      requestor?: null,
      target?: null,
      requestId?: null
    ): EventAuthRequestEventFilter;

    "EventAuthResponse(address,uint256,tuple)"(
      responder?: null,
      requestId?: null,
      response?: null
    ): EventAuthResponseEventFilter;
    EventAuthResponse(
      responder?: null,
      requestId?: null,
      response?: null
    ): EventAuthResponseEventFilter;

    "EventAuthValid(uint256,tuple)"(
      requestId?: null,
      authentication?: null
    ): EventAuthValidEventFilter;
    EventAuthValid(
      requestId?: null,
      authentication?: null
    ): EventAuthValidEventFilter;

    "EventResetContract(uint256)"(time?: null): EventResetContractEventFilter;
    EventResetContract(time?: null): EventResetContractEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    authenticate(
      _requestId: PromiseOrValue<BigNumberish>,
      _lastDigit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    completedAuth(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAuthentication(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestCounter(overrides?: CallOverrides): Promise<BigNumber>;

    requests(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    resetAuthenticator(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    responses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setRequest(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setResponse(
      _requestId: PromiseOrValue<BigNumberish>,
      _totp5: PromiseOrValue<BigNumberish>,
      _totp6hash: PromiseOrValue<BytesLike>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authenticate(
      _requestId: PromiseOrValue<BigNumberish>,
      _lastDigit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    completedAuth(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAuthentication(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    requests(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    resetAuthenticator(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    responses(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setRequest(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setResponse(
      _requestId: PromiseOrValue<BigNumberish>,
      _totp5: PromiseOrValue<BigNumberish>,
      _totp6hash: PromiseOrValue<BytesLike>,
      _time: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}