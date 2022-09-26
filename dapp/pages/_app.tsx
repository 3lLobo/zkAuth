import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { ThemeProvider } from 'next-themes'
import { DAppProvider, Localhost, Chain } from '@usedapp/core'

import { Provider as CeramicProvider } from '@self.id/react'

export const OptimismGoerli: Chain = {
  chainId: 420,
  chainName: 'Optimism Goerli Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) =>
    `https://blockscout.com/optimism/goerli//address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://blockscout.com/optimism/goerli//tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://goerli.optimism.io',
  blockExplorerUrl: 'https://blockscout.com/optimism/goerli',
  nativeCurrency: {
    name: 'Optimism Goerli Testnet',
    symbol: 'ETH',
    decimals: 18,
  },
}
const config = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: 'http://127.0.0.1:8545',
  },
  networks: [OptimismGoerli],
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
