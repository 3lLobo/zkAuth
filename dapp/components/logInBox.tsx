import { useEthers, shortenAddress, useLookupAddress } from "@usedapp/core"
import { ethers } from "ethers"
import { useState } from "react"
import ConnectWalletButton from "./connectWalletButton"

const LogInBox = () => {
  const { account } = useEthers()
  const { ens } = useLookupAddress(account)

  const [addressInputStyle, setAddressInputStyle] = useState(
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  )

  function validatePassword() {}

  function validateAddress(e: React.FormEvent<HTMLInputElement>) {
    let correct = ethers.utils.isAddress(e.currentTarget.value)
    const validClassName = "focus:ring-blue-500 focus:border-blue-500"
    const invalidClassName = "focus:ring-red-500 focus:border-red-500"
    const baseClassName = ""
  }

  return (
    <>
      {!account ? (
        <div className="flex justify-center">
          <ConnectWalletButton />
        </div>
      ) : (
        <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <label
              htmlFor="account"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your account
            </label>
            <span>{ens ?? shortenAddress(account)}</span>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Recovery Account
              </label>
              <input
                type="text"
                name="recoveryAccount"
                id="recoveryAccount"
                placeholder="0x..."
                className="focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div className="flex items-start">
              <a
                href="#"
                className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default LogInBox
