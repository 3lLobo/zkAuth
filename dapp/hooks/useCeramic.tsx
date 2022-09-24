import { useViewerConnection, ViewerRecord } from '@self.id/react'
import { useViewerRecord } from '@self.id/react'
import { EthereumAuthProvider } from '@self.id/web'
import { Dispatch, SetStateAction, useState } from 'react'


async function connectCeramic({ address, connect, setConnecting }: { address: string, connect: any, setConnecting: Dispatch<SetStateAction<boolean>> }) {
  // Assumes there is an injected `window.ethereum` provider
  const provider = await new EthereumAuthProvider(window.ethereum, address)
  setConnecting(() => true)
  connect(provider).then((res: any) => {
    console.warn("ceramic connecting: ", res)
    setConnecting(() => false)
  })
}

// A hook combining login and fetching data. Gets triggered when a eth address is passed.
export function useCeramic(address: string | null): {
  ceramicData: ViewerRecord<any>,
  ceramicStatus: string
  // setCeramicAddress: Dispatch<SetStateAction<string | null | undefined>>
} {
  const [connection, connect, disconnect] = useViewerConnection()
  const [connecting, setConnecting] = useState<boolean>(false)
  const record = useViewerRecord('kjzl6cwe1jw149ljmroydckks0ihhv2qel7wpyrold7qs3bgp765siz8234jqge')

  if (connection.status !== 'connected' && address && !connecting) {
    connectCeramic({
      address,
      connect,
      setConnecting
    })
  }

  return { ceramicData: record, ceramicStatus: connection.status }
}

// Excerpt from the docs. The data is stored in record.content. To write use record.set or record.merge.

/*
A ViewerRecord provides an interface for interacting with record stored on Ceramic, depending on the current ViewerID value:

If null, no interaction is possible with the record.
If it is an instance of PublicID, only reads are possible.
If it is an instance of SelfID, all interactions (reads and mutations) are possible.
The ViewerRecord object contains the following properties:

isLoadable: false if the viewer ID is null, true otherwise.
isLoading: true when the record is being loaded, false otherwise.
content: the record contents, if loaded.
isError: true when the record failed to load, false otherwise.
error: possible error raised when attempting to load the record.
isMutable: true if the viewer ID is an instance of SelfID, false otherwise.
isMutating: true when the record is being mutated as the result of calling the ViewerRecord object merge or set function, false otherwise.
set: function used to replace the record contents using the set method, only available if isMutating is true.
merge: function used to merge the record contents using the merge method, only available if isMutating is true.
*/
