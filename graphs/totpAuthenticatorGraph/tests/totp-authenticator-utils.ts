import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EventAuthRequest,
  EventAuthResponse,
  EventAuthValid,
  EventResetContract,
  OwnershipTransferred
} from "../generated/TotpAuthenticator/TotpAuthenticator"

export function createEventAuthRequestEvent(
  requestor: Address,
  target: Address,
  requestId: BigInt
): EventAuthRequest {
  let eventAuthRequestEvent = changetype<EventAuthRequest>(newMockEvent())

  eventAuthRequestEvent.parameters = new Array()

  eventAuthRequestEvent.parameters.push(
    new ethereum.EventParam("requestor", ethereum.Value.fromAddress(requestor))
  )
  eventAuthRequestEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  eventAuthRequestEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )

  return eventAuthRequestEvent
}

export function createEventAuthResponseEvent(
  responder: Address,
  requestId: BigInt,
  response: ethereum.Tuple
): EventAuthResponse {
  let eventAuthResponseEvent = changetype<EventAuthResponse>(newMockEvent())

  eventAuthResponseEvent.parameters = new Array()

  eventAuthResponseEvent.parameters.push(
    new ethereum.EventParam("responder", ethereum.Value.fromAddress(responder))
  )
  eventAuthResponseEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  eventAuthResponseEvent.parameters.push(
    new ethereum.EventParam("response", ethereum.Value.fromTuple(response))
  )

  return eventAuthResponseEvent
}

export function createEventAuthValidEvent(
  requestId: BigInt,
  authentication: ethereum.Tuple
): EventAuthValid {
  let eventAuthValidEvent = changetype<EventAuthValid>(newMockEvent())

  eventAuthValidEvent.parameters = new Array()

  eventAuthValidEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  eventAuthValidEvent.parameters.push(
    new ethereum.EventParam(
      "authentication",
      ethereum.Value.fromTuple(authentication)
    )
  )

  return eventAuthValidEvent
}

export function createEventResetContractEvent(
  time: BigInt
): EventResetContract {
  let eventResetContractEvent = changetype<EventResetContract>(newMockEvent())

  eventResetContractEvent.parameters = new Array()

  eventResetContractEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return eventResetContractEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
