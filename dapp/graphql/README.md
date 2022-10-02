# GraphAPI

Steps:

1. File with the query `query.qraphql`
2. Config file `.graphclientrc.yml` in root
3. Install `@graphprotocol/client-cli` for dev
4. Install `graphql` for dev
5. Run `yarn graphclient build`
6. Update your `.tsx` file as follows:

```ts
import React, { useEffect } from 'react'
// we import types and typed-graphql document from the generated code (`..graphclient/`)
import {
  ExampleQueryDocument,
  ExampleQueryQuery,
  execute,
} from '../.graphclient'

function App() {
  const [data, setData] = React.useState<ExampleQueryQuery>()

  useEffect(() => {
    execute(ExampleQueryDocument, {}).then((result) => {
      setResult(result?.data)
    })
  }, [])
  return (
    <div className="App">
      <p>Graph Client Example</p>
      <textarea
        value={JSON.stringify(result.data, null, 2)}
        readOnly
        rows={25}
      />
    </div>
  )
}

export default App
```

Full tutorial [here](https://thegraph.com/docs/en/querying/querying-from-an-application/)
