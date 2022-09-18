import { useEthers } from "@usedapp/core"
import { DropdownAccount, ToggleColorMode } from "./"

const Navbar = () => {
  const { account } = useEthers()

  return (
    <nav
      className="
        dark:bg-gray-900 bg-white 
        border-gray-200 
        px-2 sm:px-4 py-2.5 rounded"
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto max-w-6xl">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          zkAuth
        </span>
        <div className="flex flex-row space-x-4 align-middle">
          {account ? <DropdownAccount account={account} /> : <></>}

          <ToggleColorMode />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
