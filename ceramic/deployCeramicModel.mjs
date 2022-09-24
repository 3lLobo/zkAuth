import { ModelManager, } from '@glazed/devtools'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { ThreeIdProvider } from '@3id/did-provider'

// ✔ Created DID did:key:z6Mkf2fFDdBuKxnZfQeTAk6sPBt4PJog9EdhGytXyMApni9e with seed 3922d415162fdd43f4c627acb7577288fcd9ea37ff3fd4fa223e26c650ec3243

const didKey = "z6Mkf2fFDdBuKxnZfQeTAk6sPBt4PJog9EdhGytXyMApni9e"
const SEED = "3922d415162fdd43f4c627acb7577288fcd9ea37ff3fd4fa223e26c650ec3243"

// `seed` must be a 32-byte long Uint8Array
async function authenticateWithSecret() {

  const seed = Uint8Array.from(SEED)
  const ceramicEndpoint = {
    "read": {

      mainnet: "https://gateway-clay.ceramic.network",
      testnet: "https://gateway-clay.ceramic.network",
    },
    "write": {
      testnet: "https://ceramic-clay.3boxlabs.com",
    }
  }

  const ceramic = new CeramicClient(ceramicEndpoint.write.testnet)

  const threeID = await ThreeIdProvider.create({
    seed,
    // did: didKey,
    // See the section above about permissions management
    getPermission: (request) => Promise.resolve(request.payload.path),
    ceramic
  })

  const did = new DID({
    // provider: threeID.getDidProvider(),
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



const deployZkAuthModel = async () => {


  const ceramic = await authenticateWithSecret()


  const manager = new ModelManager({ ceramic })

  const zkAuthModel = await manager.createSchema('zkAuthSchema', {
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