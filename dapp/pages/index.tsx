import type { NextPage } from "next"
import Head from "next/head"
import LogInBox from "../components/logInBox"
import Navbar from "../components/navbar"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>zk-2FA</title>
        <meta
          name="description"
          content="zero-knowledge two factor authentification"
        />
        <link rel="icon" href="" />
      </Head>

      <Navbar />

      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <LogInBox />
      </div>
    </div>
  )
}

export default Home