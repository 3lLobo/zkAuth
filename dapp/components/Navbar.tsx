import { useEthers } from '@usedapp/core'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DropdownAccount, ToggleColorMode } from '.'

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
          <Image
            src="/zkAuth.svg"
            height={50}
            width={150}
            className={`filter-logo-${theme}`}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-row space-x-4 align-middle">
          {account ? <DropdownAccount account={account} /> : <></>}

          <ToggleColorMode />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
