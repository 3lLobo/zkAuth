import { Navbar } from './'
import Head from 'next/head'

export default function Layout(props: any) {
  return (
    <>
      <Head>
        <title>zkAuth</title>
        <meta name="description" content="zero-knowledge Authentification" />
        <link rel="icon" href="" />
      </Head>
      <Navbar />
      <main>{props.children}</main>
    </>
  )
}
