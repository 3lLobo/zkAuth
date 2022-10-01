import { Navbar } from '..'
import Head from 'next/head'
import { useTheGraph } from '../../hooks/useTheGraph'

export default function Layout(props: any) {
  const walletAddress = '0x369551e7c1d29756e18ba4ed7f85f2e6663e1e8d'

  const data = useTheGraph(walletAddress)

  return (
    <>
      <Head>
        <title>zkAuth</title>
        <meta name="description" content="zero-knowledge Authentification" />
        <link rel="icon" type="image/svg+xml" href="/zkAuthIcon.svg" />
      </Head>
      <Navbar />
      <main>{props.children}</main>
    </>
  )
}
