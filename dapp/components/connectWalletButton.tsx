import { useState, useEffect, useCallback } from "react"
import { useEthers } from "@usedapp/core"
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { useTheme } from "next-themes"

const ConnectWalletButton = () => {
  const { theme } = useTheme()
  const { activate } = useEthers()
  const [activateError, setActivateError] = useState("")
  // const { error } = useEthers()
  //   useEffect(() => {
  //     if (error) {
  //       setActivateError(error.message)
  //     }
  //   }, [error])

  // TODO: Manage case where user does not have a wallet
  //   const [hasMetamask, setHasMetamask] = useState<boolean>(false)

  //   useEffect(() => {
  //     if (typeof window.ethereum !== "undefined") {
  //       setHasMetamask(true)
  //     }
  //   })

  // Handle Hydration mismatch
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(undefined)
  useEffect(() => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: "14a0951f47e646c1b241aa533e150219",
        },
      },
    }

    if (loaded) {
      const newWeb3Modal = new Web3Modal({
        providerOptions,
        cacheProvider: false,
        theme: theme,
      })

      setWeb3Modal(newWeb3Modal)
    }
  }, [loaded, theme])

  // const connect = async () => {
  //   try {
  //     const provider = await web3Modal?.connect()
  //     await activate(provider)
  //     setActivateError("")
  //   } catch (error: any) {
  //     setActivateError(error.message)
  //   }
  // }

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal?.connect()
      await activate(provider)
      setActivateError("")
    } catch (error: any) {
      setActivateError(error.message)
    }
  }, [web3Modal, activate])

  // useEffect(() => {
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     console.log(web3Modal.cachedProvider)
  //     connect()
  //   }
  // }, [connect, web3Modal])

  if (!loaded) return null

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
