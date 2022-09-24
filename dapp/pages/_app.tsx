import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { ThemeProvider } from 'next-themes'
import { DAppProvider } from '@usedapp/core'
import { Provider as CeramicProvider } from '@self.id/react'


const config = {
  multicallAddresses: ['0x'],
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
