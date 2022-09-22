import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index'
import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ExampleEntity } from '../generated/schema'
import { EventAuthRequest } from '../generated/TotpAuthenticator/TotpAuthenticator'
import { handleEventAuthRequest } from '../src/totp-authenticator'
import { createEventAuthRequestEvent } from './totp-authenticator-utils'

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let requestor = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    )
    let target = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    )
    let requestId = BigInt.fromI32(234)
    let newEventAuthRequestEvent = createEventAuthRequestEvent(
      requestor,
      target,
      requestId
    )
    handleEventAuthRequest(newEventAuthRequestEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('ExampleEntity created and stored', () => {
    assert.entityCount('ExampleEntity', 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'ExampleEntity',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      'requestor',
      '0x0000000000000000000000000000000000000001'
    )
    assert.fieldEquals(
      'ExampleEntity',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      'target',
      '0x0000000000000000000000000000000000000001'
    )
    assert.fieldEquals(
      'ExampleEntity',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      'requestId',
      '234'
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
