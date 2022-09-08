import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

let web3Modal: Web3Modal

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: { 42: process.env.NEXT_PUBLIC_RPC_URL }, // required
    },
  },
}

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  })
}

const ConnectWalletButton = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [hasMetamask, setHasMetamask] = useState<boolean>(false)
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >(undefined)

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true)
    }
  })

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect()
        setIsConnected(true)
        const provider = new ethers.providers.Web3Provider(web3ModalProvider)
        setSigner(provider.getSigner())
      } catch (e) {
        console.log(e)
      }
    } else {
      setIsConnected(false)
    }
  }
  return (
    <button
      className="w-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={connect}
    >
      Connect Wallet
    </button>
  )
}

export default ConnectWalletButton
