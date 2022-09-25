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
} from "../../common";

export interface ZkSocialRecoveryWalletInterface extends utils.Interface {
  functions: {
    "cancelRecovery(uint256[2],uint256[2][2],uint256[2],uint256[1],uint256)": FunctionFragment;
    "currentRecoveryNumber()": FunctionFragment;
    "executeRecoveryChange(uint256[2],uint256[2][2],uint256[2],uint256[1],uint256)": FunctionFragment;
    "executeTxn(uint256[2],uint256[2][2],uint256[2],uint256[2],address,uint256)": FunctionFragment;
    "isRecoveryOn()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "otpVerifierAddress()": FunctionFragment;
    "owner()": FunctionFragment;
    "startRecovery(uint256[2],uint256[2][2],uint256[2],uint256[1],address)": FunctionFragment;
    "voteInRecovery(uint256[2],uint256[2][2],uint256[2],uint256[1],uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cancelRecovery"
      | "currentRecoveryNumber"
      | "executeRecoveryChange"
      | "executeTxn"
      | "isRecoveryOn"
      | "onERC721Received"
      | "otpVerifierAddress"
      | "owner"
      | "startRecovery"
      | "voteInRecovery"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelRecovery",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "currentRecoveryNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeRecoveryChange",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "executeTxn",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isRecoveryOn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "otpVerifierAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "startRecovery",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>],
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "voteInRecovery",
    values: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelRecovery",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentRecoveryNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeRecoveryChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "executeTxn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isRecoveryOn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "otpVerifierAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "startRecovery",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteInRecovery",
    data: BytesLike
  ): Result;

  events: {
    "NewRecoveryProcedure(address,address,uint256)": EventFragment;
    "RecoveryCancelled(address,uint256)": EventFragment;
    "RecoveryExecuted(address,address,uint256)": EventFragment;
    "VotedInRecovery(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewRecoveryProcedure"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RecoveryCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RecoveryExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VotedInRecovery"): EventFragment;
}

export interface NewRecoveryProcedureEventObject {
  newProposedOwner: string;
  trusteeInitializer: string;
  currRecoveryRound: BigNumber;
}
export type NewRecoveryProcedureEvent = TypedEvent<
  [string, string, BigNumber],
  NewRecoveryProcedureEventObject
>;

export type NewRecoveryProcedureEventFilter =
  TypedEventFilter<NewRecoveryProcedureEvent>;

export interface RecoveryCancelledEventObject {
  Owner: string;
  RecoveryRound: BigNumber;
}
export type RecoveryCancelledEvent = TypedEvent<
  [string, BigNumber],
  RecoveryCancelledEventObject
>;

export type RecoveryCancelledEventFilter =
  TypedEventFilter<RecoveryCancelledEvent>;

export interface RecoveryExecutedEventObject {
  oldOwner: string;
  newOwner: string;
  RecoveryRound: BigNumber;
}
export type RecoveryExecutedEvent = TypedEvent<
  [string, string, BigNumber],
  RecoveryExecutedEventObject
>;

export type RecoveryExecutedEventFilter =
  TypedEventFilter<RecoveryExecutedEvent>;

export interface VotedInRecoveryEventObject {
  trustee: string;
  RecoveryRound: BigNumber;
}
export type VotedInRecoveryEvent = TypedEvent<
  [string, BigNumber],
  VotedInRecoveryEventObject
>;

export type VotedInRecoveryEventFilter = TypedEventFilter<VotedInRecoveryEvent>;

export interface ZkSocialRecoveryWallet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZkSocialRecoveryWalletInterface;

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
    cancelRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    currentRecoveryNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    executeRecoveryChange(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeTxn(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      input: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      callee: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isRecoveryOn(overrides?: CallOverrides): Promise<[boolean]>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    otpVerifierAddress(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    startRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voteInRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  cancelRecovery(
    a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    b: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ],
    c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    Input: [PromiseOrValue<BigNumberish>],
    recoveryRoundNumber: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  currentRecoveryNumber(overrides?: CallOverrides): Promise<BigNumber>;

  executeRecoveryChange(
    a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    b: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ],
    c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    Input: [PromiseOrValue<BigNumberish>],
    recoveryRoundNumber: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeTxn(
    a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    b: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ],
    c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    input: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    callee: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isRecoveryOn(overrides?: CallOverrides): Promise<boolean>;

  onERC721Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  otpVerifierAddress(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  startRecovery(
    a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    b: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ],
    c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    Input: [PromiseOrValue<BigNumberish>],
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voteInRecovery(
    a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    b: [
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
    ],
    c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    Input: [PromiseOrValue<BigNumberish>],
    recoveryRoundNumber: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    currentRecoveryNumber(overrides?: CallOverrides): Promise<BigNumber>;

    executeRecoveryChange(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    executeTxn(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      input: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      callee: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    isRecoveryOn(overrides?: CallOverrides): Promise<boolean>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    otpVerifierAddress(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    startRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    voteInRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "NewRecoveryProcedure(address,address,uint256)"(
      newProposedOwner?: PromiseOrValue<string> | null,
      trusteeInitializer?: PromiseOrValue<string> | null,
      currRecoveryRound?: null
    ): NewRecoveryProcedureEventFilter;
    NewRecoveryProcedure(
      newProposedOwner?: PromiseOrValue<string> | null,
      trusteeInitializer?: PromiseOrValue<string> | null,
      currRecoveryRound?: null
    ): NewRecoveryProcedureEventFilter;

    "RecoveryCancelled(address,uint256)"(
      Owner?: PromiseOrValue<string> | null,
      RecoveryRound?: null
    ): RecoveryCancelledEventFilter;
    RecoveryCancelled(
      Owner?: PromiseOrValue<string> | null,
      RecoveryRound?: null
    ): RecoveryCancelledEventFilter;

    "RecoveryExecuted(address,address,uint256)"(
      oldOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
      RecoveryRound?: null
    ): RecoveryExecutedEventFilter;
    RecoveryExecuted(
      oldOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
      RecoveryRound?: null
    ): RecoveryExecutedEventFilter;

    "VotedInRecovery(address,uint256)"(
      trustee?: PromiseOrValue<string> | null,
      RecoveryRound?: null
    ): VotedInRecoveryEventFilter;
    VotedInRecovery(
      trustee?: PromiseOrValue<string> | null,
      RecoveryRound?: null
    ): VotedInRecoveryEventFilter;
  };

  estimateGas: {
    cancelRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    currentRecoveryNumber(overrides?: CallOverrides): Promise<BigNumber>;

    executeRecoveryChange(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeTxn(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      input: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      callee: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isRecoveryOn(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    otpVerifierAddress(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    startRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voteInRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    currentRecoveryNumber(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    executeRecoveryChange(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeTxn(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      input: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      callee: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isRecoveryOn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    otpVerifierAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voteInRecovery(
      a: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      b: [
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
        [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
      ],
      c: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      Input: [PromiseOrValue<BigNumberish>],
      recoveryRoundNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
