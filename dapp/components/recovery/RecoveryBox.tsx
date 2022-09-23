import {
  ArrowUturnLeftIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ethers } from 'ethers'
import { AlchemyProvider } from '@ethersproject/providers'
import { shortenAddress, useEthers, useResolveName } from '@usedapp/core'
import { ThreeDots } from 'react-loader-spinner'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const RecoveryBox = () => {
  const { account, library: provider } = useEthers()

  // PIN state management
  const [password, setPassword] = useState('')

  // Set password to blockchain
  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  // Setting Infura Provider TODO: Optimize
  let providerIsSet = false
  const [alchemyProvider, setInfuraProvider] = useState<
    AlchemyProvider | undefined
  >()
  useEffect(() => {
    if (!providerIsSet) {
      const infura = new AlchemyProvider('homestead', process.env.API_KEY)
      setInfuraProvider(infura)
      providerIsSet = true
    }
  }, [providerIsSet])

  interface Account {
    [address: string]: string
    ens: string
    verified: string
    value: string
  }
  const [accounts, setAccount] = useState<Account>({
    address: '',
    ens: '',
    verified: '',
    value: '',
  })

  // Sets the address when input changes value
  const setAddress = (name: string) => {
    //TODO: Extra fromatting
    if (name.includes('.')) {
      setAccount({
        ...accounts,
        address: '',
        ens: name,
        verified: '',
        value: name,
      })
    } else {
      setAccount({
        ...accounts,
        address: name,
        ens: '',
        verified: '',
        value: name,
      })
    }
  }

  const verifyAccount = async () => {
    setAccount({
      ...accounts,
      verified: 'loading',
    })

    // TODO: Verify if account has indeed requested recovery

    if (alchemyProvider) {
      // Get address from ENS if exists
      const addressfromENS = await alchemyProvider.resolveName(accounts['ens'])
      const isValidAccount = ethers.utils.isAddress(accounts['address'])

      // We verify if either ENS or address are correctly set and modify states
      if (addressfromENS) {
        setAccount({
          ...accounts,
          address: addressfromENS,
          verified: 'verified',
          value: `${accounts['ens']} (${shortenAddress(addressfromENS)})`,
        })
      } else if (isValidAccount) {
        const ensFromAdddress = await alchemyProvider.lookupAddress(
          accounts['address']
        )
        setAccount({
          ...accounts,
          ens: ensFromAdddress ?? '',
          verified: 'verified',
          value: ensFromAdddress
            ? `${ensFromAdddress} (${shortenAddress(accounts['address'])})`
            : accounts['address'],
        })
      } else {
        setAccount({
          ...accounts,
          verified: 'error',
        })
      }
    }
  }

  // Manage theme hydration
  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (theme) {
      setLoaded(true)
    }
  })
  if (!loaded) return null

  //if (!account) return null
  return (
    <div className="relative w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-md p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
        <Link href="/">
          <a className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
            <span className="sr-only">Back</span>
            <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </Link>
      </div>
      <form className="space-y-6 mb-2" action="#">
        <h5 className="text-2xl font-medium flex justify-center text-gray-900 dark:text-white">
          Validate Account Recovery
        </h5>

        <div>
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Address or ENS domain to recover
          </label>
          <div
            className={`w-full flex flex-row items-center h-14 p-2 rounded-lg
             bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500  dark:text-white focus-within:outline focus-within:outline-2 ${
               accounts['verified'] == 'error'
                 ? 'outline outline-2 outline-red-500 dark:outline-red-500 focus-within:outline-red-500 dark:focus-within:outline-red-500'
                 : 'focus-within:outline-blue-500 dark:focus-within:outline-blue-500'
             }`}
          >
            <input
              id="account"
              name="account"
              type="text"
              className="w-5/6 border-none bg-transparent dark:bg-transparent outline-0 focus:ring-0 placeholder-gray-300 dark:placeholder-gray-500"
              placeholder="0x000...0000 or vitalik.eth"
              value={accounts['value']}
              onChange={(e) => setAddress(e.target.value)}
            />
            {{
              verified: (
                <div className="mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-200">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
              ),
              error: (
                <div className="mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-200">
                  <XMarkIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              ),
              loading: (
                <div className="mx-auto">
                  <ThreeDots
                    height="35"
                    width="35"
                    radius="9"
                    color={theme == 'dark' ? '#ffffff' : '#3b83f6'}
                    ariaLabel="three-dots-loading"
                  />
                </div>
              ),
            }[accounts['verified']] || (
              <button
                className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-2 py-2 mx-auto"
                onClick={() => verifyAccount()}
              >
                Verify
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="text"
            className="w-full p-2.5 mb-4 rounded-lg
              bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            disabled:opacity-25"
          onClick={(e) => onSubmit(e)}
          disabled={accounts['verified'] != 'verified'}
        >
          Confirm Recovery
        </button>
      </form>
    </div>
  )
}

export default RecoveryBox
