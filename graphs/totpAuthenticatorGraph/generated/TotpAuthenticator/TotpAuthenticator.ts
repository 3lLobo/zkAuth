// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class EventAuthRequest extends ethereum.Event {
  get params(): EventAuthRequest__Params {
    return new EventAuthRequest__Params(this);
  }
}

export class EventAuthRequest__Params {
  _event: EventAuthRequest;

  constructor(event: EventAuthRequest) {
    this._event = event;
  }

  get requestor(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get target(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get requestId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class EventAuthResponse extends ethereum.Event {
  get params(): EventAuthResponse__Params {
    return new EventAuthResponse__Params(this);
  }
}

export class EventAuthResponse__Params {
  _event: EventAuthResponse;

  constructor(event: EventAuthResponse) {
    this._event = event;
  }

  get responder(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get requestId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get response(): EventAuthResponseResponseStruct {
    return changetype<EventAuthResponseResponseStruct>(
      this._event.parameters[2].value.toTuple()
    );
  }
}

export class EventAuthResponseResponseStruct extends ethereum.Tuple {
  get totp5(): BigInt {
    return this[0].toBigInt();
  }

  get totp6hash(): Bytes {
    return this[1].toBytes();
  }

  get time(): BigInt {
    return this[2].toBigInt();
  }
}

export class EventAuthValid extends ethereum.Event {
  get params(): EventAuthValid__Params {
    return new EventAuthValid__Params(this);
  }
}

export class EventAuthValid__Params {
  _event: EventAuthValid;

  constructor(event: EventAuthValid) {
    this._event = event;
  }

  get requestId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get authentication(): EventAuthValidAuthenticationStruct {
    return changetype<EventAuthValidAuthenticationStruct>(
      this._event.parameters[1].value.toTuple()
    );
  }
}

export class EventAuthValidAuthenticationStruct extends ethereum.Tuple {
  get isValid(): boolean {
    return this[0].toBoolean();
  }

  get time(): BigInt {
    return this[1].toBigInt();
  }

  get authenticatedAddress(): Address {
    return this[2].toAddress();
  }
}

export class EventResetContract extends ethereum.Event {
  get params(): EventResetContract__Params {
    return new EventResetContract__Params(this);
  }
}

export class EventResetContract__Params {
  _event: EventResetContract;

  constructor(event: EventResetContract) {
    this._event = event;
  }

  get time(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TotpAuthenticator__completedAuthResult {
  value0: boolean;
  value1: BigInt;
  value2: Address;

  constructor(value0: boolean, value1: BigInt, value2: Address) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    return map;
  }

  getIsValid(): boolean {
    return this.value0;
  }

  getTime(): BigInt {
    return this.value1;
  }

  getAuthenticatedAddress(): Address {
    return this.value2;
  }
}

export class TotpAuthenticator__getAuthenticationResultValue0Struct extends ethereum.Tuple {
  get isValid(): boolean {
    return this[0].toBoolean();
  }

  get time(): BigInt {
    return this[1].toBigInt();
  }

  get authenticatedAddress(): Address {
    return this[2].toAddress();
  }
}

export class TotpAuthenticator__responsesResult {
  value0: BigInt;
  value1: Bytes;
  value2: BigInt;

  constructor(value0: BigInt, value1: Bytes, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromFixedBytes(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getTotp5(): BigInt {
    return this.value0;
  }

  getTotp6hash(): Bytes {
    return this.value1;
  }

  getTime(): BigInt {
    return this.value2;
  }
}

export class TotpAuthenticator extends ethereum.SmartContract {
  static bind(address: Address): TotpAuthenticator {
    return new TotpAuthenticator("TotpAuthenticator", address);
  }

  completedAuth(param0: BigInt): TotpAuthenticator__completedAuthResult {
    let result = super.call(
      "completedAuth",
      "completedAuth(uint256):(bool,uint256,address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new TotpAuthenticator__completedAuthResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toAddress()
    );
  }

  try_completedAuth(
    param0: BigInt
  ): ethereum.CallResult<TotpAuthenticator__completedAuthResult> {
    let result = super.tryCall(
      "completedAuth",
      "completedAuth(uint256):(bool,uint256,address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TotpAuthenticator__completedAuthResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toAddress()
      )
    );
  }

  getAuthentication(
    _requestId: BigInt
  ): TotpAuthenticator__getAuthenticationResultValue0Struct {
    let result = super.call(
      "getAuthentication",
      "getAuthentication(uint256):((bool,uint256,address))",
      [ethereum.Value.fromUnsignedBigInt(_requestId)]
    );

    return changetype<TotpAuthenticator__getAuthenticationResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getAuthentication(
    _requestId: BigInt
  ): ethereum.CallResult<
    TotpAuthenticator__getAuthenticationResultValue0Struct
  > {
    let result = super.tryCall(
      "getAuthentication",
      "getAuthentication(uint256):((bool,uint256,address))",
      [ethereum.Value.fromUnsignedBigInt(_requestId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<TotpAuthenticator__getAuthenticationResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  requestCounter(): BigInt {
    let result = super.call("requestCounter", "requestCounter():(uint256)", []);

    return result[0].toBigInt();
  }

  try_requestCounter(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "requestCounter",
      "requestCounter():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  requests(param0: BigInt, param1: BigInt): Address {
    let result = super.call("requests", "requests(uint256,uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);

    return result[0].toAddress();
  }

  try_requests(param0: BigInt, param1: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "requests",
      "requests(uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  responses(
    param0: BigInt,
    param1: Address
  ): TotpAuthenticator__responsesResult {
    let result = super.call(
      "responses",
      "responses(uint256,address):(uint256,bytes32,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return new TotpAuthenticator__responsesResult(
      result[0].toBigInt(),
      result[1].toBytes(),
      result[2].toBigInt()
    );
  }

  try_responses(
    param0: BigInt,
    param1: Address
  ): ethereum.CallResult<TotpAuthenticator__responsesResult> {
    let result = super.tryCall(
      "responses",
      "responses(uint256,address):(uint256,bytes32,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TotpAuthenticator__responsesResult(
        value[0].toBigInt(),
        value[1].toBytes(),
        value[2].toBigInt()
      )
    );
  }
}

export class AuthenticateCall extends ethereum.Call {
  get inputs(): AuthenticateCall__Inputs {
    return new AuthenticateCall__Inputs(this);
  }

  get outputs(): AuthenticateCall__Outputs {
    return new AuthenticateCall__Outputs(this);
  }
}

export class AuthenticateCall__Inputs {
  _call: AuthenticateCall;

  constructor(call: AuthenticateCall) {
    this._call = call;
  }

  get _requestId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _lastDigit(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _responseAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class AuthenticateCall__Outputs {
  _call: AuthenticateCall;

  constructor(call: AuthenticateCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class ResetAuthenticatorCall extends ethereum.Call {
  get inputs(): ResetAuthenticatorCall__Inputs {
    return new ResetAuthenticatorCall__Inputs(this);
  }

  get outputs(): ResetAuthenticatorCall__Outputs {
    return new ResetAuthenticatorCall__Outputs(this);
  }
}

export class ResetAuthenticatorCall__Inputs {
  _call: ResetAuthenticatorCall;

  constructor(call: ResetAuthenticatorCall) {
    this._call = call;
  }
}

export class ResetAuthenticatorCall__Outputs {
  _call: ResetAuthenticatorCall;

  constructor(call: ResetAuthenticatorCall) {
    this._call = call;
  }
}

export class SetRequestCall extends ethereum.Call {
  get inputs(): SetRequestCall__Inputs {
    return new SetRequestCall__Inputs(this);
  }

  get outputs(): SetRequestCall__Outputs {
    return new SetRequestCall__Outputs(this);
  }
}

export class SetRequestCall__Inputs {
  _call: SetRequestCall;

  constructor(call: SetRequestCall) {
    this._call = call;
  }

  get _target(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetRequestCall__Outputs {
  _call: SetRequestCall;

  constructor(call: SetRequestCall) {
    this._call = call;
  }
}

export class SetResponseCall extends ethereum.Call {
  get inputs(): SetResponseCall__Inputs {
    return new SetResponseCall__Inputs(this);
  }

  get outputs(): SetResponseCall__Outputs {
    return new SetResponseCall__Outputs(this);
  }
}

export class SetResponseCall__Inputs {
  _call: SetResponseCall;

  constructor(call: SetResponseCall) {
    this._call = call;
  }

  get _requestId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _totp5(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _totp6hash(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _time(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SetResponseCall__Outputs {
  _call: SetResponseCall;

  constructor(call: SetResponseCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
