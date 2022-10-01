import { Web3Storage } from 'web3.storage'
import { Web3File } from 'web3.storage/dist/src/lib/interface'

const token = process.env.NEXT_PUBLIC_WEB3STORAGE

function getClient(): Web3Storage | null {
  if (token) {
    const client = new Web3Storage({ token })
    return client
  } else {
    console.error('Web3Storage api token required!')
    return null
  }
}

// function to store on web3Storage over IPFS gateway
export const ipfsUpload = async (fileToUpload: any) => {
  // We need to provide our token here. Better solution is to ask the user for a token.
  const client = getClient()
  try {
    const cid = await client?.put(fileToUpload, {
      onRootCidReady: (localCid) => {
        // console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
        console.log('> 📡 sending files to web3.storage ')
      },
    })
    console.log(`> ✅ web3.storage now hosting ${cid}`)
    return cid
  } catch (error) {
    console.log(error)
  }
}

// function to fetch from web3Storage over IPFS gateway
export const ipfsFetch = async (
  cid: string
): Promise<Web3File[] | undefined> => {
  const client = getClient()
  if (client) {
    const res = await client?.get(cid)
    const files = await res?.files()

    if (files) {
      for (const file of files) {
        console.log(`${file.cid} ${file.name} ${file.size}`)
      }
    }
    return files
  }
}
