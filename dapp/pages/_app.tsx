import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { ThemeProvider } from 'next-themes'
import { DAppProvider, Localhost } from '@usedapp/core'

import { Provider as CeramicProvider } from '@self.id/react'

const config = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: 'http://127.0.0.1:8545',
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <DAppProvider config={config}>
        <CeramicProvider client={{ ceramic: 'testnet-clay' }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CeramicProvider>
      </DAppProvider>
    </ThemeProvider>
  )
}

export default MyApp
