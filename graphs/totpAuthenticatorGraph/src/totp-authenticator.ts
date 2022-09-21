import { BigInt } from '@graphprotocol/graph-ts'
import {
  TotpAuthenticator,
  EventAuthRequest,
  EventAuthResponse,
  EventAuthValid,
  EventResetContract,
  OwnershipTransferred,
} from '../generated/TotpAuthenticator/TotpAuthenticator'
import {
  Address,
  AuthData,
  AuthStatus,
  Authentication,
} from '../generated/schema'
import { Bytes } from '@graphprotocol/graph-ts'


export function handleEventAuthRequest(event: EventAuthRequest): void {

  const requestor = getAddress(event.params.requestor)
  let target = getAddress(event.params.target)

  const requestId = event.params.requestId
  let authentication = new Authentication(requestId.toString())
  authentication.requestId = requestId
  authentication.requestor = requestor.id
  authentication.requestee = target.id
  authentication.created = event.block.timestamp.toString()

  authentication.save()
}


export function handleEventAuthResponse(event: EventAuthResponse): void {

  const requestId = event.params.requestId.toString()
  let authentication = Authentication.load(requestId)

  if (!authentication) {
    authentication = new Authentication(requestId)
  }

  const authDataId = event.params.requestId.toString() + '_data'

  let authData = new AuthData(authDataId)

  authData.totp5 = event.params.response.totp5
  authData.totp6Hash = event.params.response.totp6hash
  authData.genTime = event.params.response.time
  authData.created = event.block.timestamp.toString()

  authData.authentication = authentication.id
  authData.save()

  // authentication.authData = authDataId

  const authStatusId = event.params.requestId.toString() + '_status'
  let authStatus = new AuthStatus(authStatusId)
  authStatus.hasResponse = true
  authStatus.isValid = false

  authStatus.authentication = authentication.id
  authStatus.save()

  // authentication.status = authStatusId
  // authentication.save()
}

export function handleEventAuthValid(event: EventAuthValid): void {
  let authStatus = new AuthStatus(event.params.requestId.toString() + 'status')
  authStatus.isValid = true
  authStatus.validationTime = event.block.timestamp.toString()

  authStatus.save()
}

export function handleEventResetContract(event: EventResetContract): void {
  // TODO: delete all.
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }


// Returns an Address entity for a a byte address
function getAddress(address: Bytes): Address {

  let addressEntity = Address.load(address.toHexString())
  if (!addressEntity) {
    addressEntity = new Address(address.toHexString())
    addressEntity.address = address
    addressEntity.save()
  }
  return addressEntity
}

// Entities can be loaded from the store using a string ID; this ID
// needs to be unique across all entities of the same type
// Entities only exist after they have been saved to the store;
// `null` checks allow to create entities on demand

// Entity fields can be set using simple assignments
// entity.count = BigInt.fromI32(0)
// BigInt and BigDecimal math are supported
// entity.count = entity.count + BigInt.fromI32(1)

// Entities can be written to the store with `.save()`

// Note: If a handler doesn't require existing field values, it is faster
// _not_ to load the entity from the store. Instead, create it fresh with
// `new Entity(...)`, set the fields that should be updated and save the
// entity back to the store. Fields that were not set or unset remain
// unchanged, allowing for partial updates to be applied.

// It is also possible to access smart contracts from mappings. For
// example, the contract that has emitted the event can be connected to
// with:
//
// let contract = Contract.bind(event.address)
//
// The following functions can then be called on this contract to access
// state variables and other data:
//
// - contract.completedAuth(...)
// - contract.getAuthentication(...)
// - contract.owner(...)
// - contract.requestCounter(...)
// - contract.requests(...)
// - contract.responses(...)