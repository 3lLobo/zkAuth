import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { ThemeProvider } from 'next-themes'
import { DAppProvider } from '@usedapp/core'

const config = {}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <DAppProvider config={config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </ThemeProvider>
  )
}

export default MyApp
