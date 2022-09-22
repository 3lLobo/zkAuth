import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { ThemeProvider } from 'next-themes'
import { DAppProvider } from '@usedapp/core'
import { store } from '../app/store'
import { Provider } from 'react-redux'

const config = {
  multicallAddresses: ['0x'],
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Provider store={store}>
        <DAppProvider config={config}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DAppProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
