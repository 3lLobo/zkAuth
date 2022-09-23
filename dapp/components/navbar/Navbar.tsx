import { useEthers } from '@usedapp/core'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DropdownAccount, ToggleColorMode } from '.'
import { ConnectWalletButton } from '..'

const Navbar = () => {
  const { account } = useEthers()
  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (theme) {
      setLoaded(true)
    }
  })

  return (
    <nav className="px-4 py-4">
      <div className="container flex flex-wrap justify-between items-center mx-auto max-w-6xl">
        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          zkAuth
        </span> */}
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
