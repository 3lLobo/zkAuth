import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DropdownAccount, ToggleColorMode } from '.'

const Navbar = () => {
  const { account, library, activate } = useEthers()
  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (theme) {
      setLoaded(true)
    }
  })

  // Set up provider if already connected

  useEffect(() => {
    const { ethereum } = window
    const checkMetaMaskConnected = async () => {
      if (ethereum && !library) {
        var provider = new ethers.providers.Web3Provider(ethereum)
        const accounts = await provider.listAccounts()
        const connected = accounts.length > 0
        if (connected) {
          activate(provider)
        }
      }
    }
    checkMetaMaskConnected()
  }, [library])

  return (
    <nav className="px-4 py-4">
      <div className="container flex flex-wrap justify-between items-center mx-auto max-w-6xl">
        {loaded ? (
          <Link href="/">
            <a>
              <Image
                src="/zkAuth.svg"
                height={50}
                width={100}
                className={`filter-logo-${theme}`}
              />
            </a>
          </Link>
        ) : (
          <></>
        )}
        <div className="flex flex-row space-x-4 align-middle">
          {account ? (
            <DropdownAccount account={account} />
          ) : (
            <></>
            //<ConnectWalletButton />
          )}

          <ToggleColorMode />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
