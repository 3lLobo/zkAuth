import { useEffect, useState } from 'react'
import { AddressAllDocument, AddressAllQuery, execute } from '../.graphclient'


// Hook to interact with the TotpAuth subgraph
// An example of the returned data can be found in ./exampleResult.json
export function useTheGraph(walletAddress: string) {

  const [result, setResult] = useState<AddressAllQuery>()

  useEffect(() => {

    async function getGraphData() {
      const gqlRes = await execute(
        AddressAllDocument, { walletAddress: walletAddress.toLowerCase() })

      setResult(gqlRes.data)
    }

    if (walletAddress?.length == 42) {
      getGraphData()
    }

  }, [walletAddress]);

  return result;
}
