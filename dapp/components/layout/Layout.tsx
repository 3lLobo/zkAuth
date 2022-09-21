import { Navbar } from '..'
import Head from 'next/head'

export default function Layout(props: any) {
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
