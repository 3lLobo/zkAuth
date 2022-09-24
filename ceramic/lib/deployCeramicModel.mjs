import { ModelManager, } from '@glazed/devtools'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { ThreeIdProvider } from '@3id/did-provider'
import { Ed25519Provider } from 'key-did-provider-ed25519'

// ✔ Created DID did:key:z6Mkf2fFDdBuKxnZfQeTAk6sPBt4PJog9EdhGytXyMApni9e with seed 3922d415162fdd43f4c627acb7577288fcd9ea37ff3fd4fa223e26c650ec3243

const ceramicEndpoint = {
  "read": {

    mainnet: "https://gateway-clay.ceramic.network",
    testnet: "https://gateway-clay.ceramic.network",
  },
  "write": {
    testnet: "https://ceramic-clay.3boxlabs.com",
  }
}

const didKey = process.env.DIDKEY
const SEED = process.env.SEED

// `seed` must be a 32-byte long Uint8Array
async function authenticateDID() {

  const seed = Uint32Array.from(SEED)
  const provider = new Ed25519Provider(seed)
  const did = new DID({ provider, resolver: getKeyResolver() })
  await did.authenticate()
  return did
}

// `seed` must be a 32-byte long Uint8Array
async function authenticateWithSecret() {

  const seed = Uint8Array.from(SEED)

  const ceramic = new CeramicClient(ceramicEndpoint.write.testnet)

  const threeID = await ThreeIdProvider.create({
    seed,
    // did: didKey,
    // See the section above about permissions management
    getPermission: (request) => Promise.resolve(request.payload.path),
    ceramic
  })

  const did = new DID({
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  })

  // Authenticate the DID using the 3ID provider
  await did.authenticate()

  // The Ceramic client can create and update streams using the authenticated DID
  ceramic.did = did

  return ceramic
}

async function resolveDID() {
  const did = new DID({ resolver: getKeyResolver() })
  // await did.authenticate()
  return await did.resolve('did:key:' + didKey)
}

const deployZkAuthModel = async () => {

  // const ceramic = await authenticateWithSecret()
  const ceramic = new CeramicClient(ceramicEndpoint.write.testnet)
  const did = await authenticateDID(Uint8Array.from(didKey))
  // const didRes = await resolveDID()
  ceramic.did = didRes

  const manager = new ModelManager({ ceramic })

  const zkAuthModel = await manager.createSchema('MySchema', {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'zkAuthModel',
    type: 'object',
    properties: {
      "MerkleTree": {
        "type": "string"
      }
    },
  })
  const modelAliases = await manager.deploy()

}

deployZkAuthModel()


export default deployZkAuthModel