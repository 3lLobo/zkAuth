import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { shortenAddress, useEthers } from '@usedapp/core'

import { useTheme } from 'next-themes'

//TODO: Load data and pass into accounts, setAccounts state

const ModalChangePassword = () => {
  const [open, setOpen] = useState(false)
  const { account, library: provider } = useEthers()

  const onSubmit = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
    //TODO: Sumbit passwords to Smart Contract
  }

  interface Accounts {
    [key: string]: Account
  }
  interface Account {
    [address: string]: string
    ens: string
    password: string
    value: string
  }
  const [accounts, setAccount] = useState<Accounts>({
    0: { address: '', ens: '', password: '', value: '' },
    1: { address: '', ens: '', password: '', value: '' },
    2: { address: '', ens: '', password: '', value: '' },
  })

  //TODO: get rid of naccounts
  const [naccounts, setNAccounts] = useState(3)

  // Sets the password when input changes value
  const setPasswords = (password: string, index: string) => {
    setAccount({
      ...accounts,
      [index]: {
        ...accounts[index],
        password: password,
      },
    })
  }

  // Loads and formats address when having an ENS
  const loadAccounts = async () => {
    if (provider && account) {
      for (let index in [0, 1, 2]) {
        const ensFromAdddress = await provider.lookupAddress(
          accounts[index]['address']
        )
        setAccount({
          ...accounts,
          [index]: {
            ...accounts[index],
            ens: ensFromAdddress ?? '',
            value: ensFromAdddress
              ? `${ensFromAdddress} (${shortenAddress(
                  accounts[index]['address']
                )})`
              : shortenAddress(accounts[index]['address']),
          },
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

  return (
    <>
      <button
        className="w-3/4 px-2 py-2 button-unsaturated"
        onClick={(e) => onSubmit(e)}
      >
        Set Accounts
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start w-full">
                    <div className="w-full mt-3 text-center px-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium flex justify-center leading-6 text-gray-900 dark:text-gray-100 mb-8"
                      >
                        Change your Password
                      </Dialog.Title>
                      <form className="space-y-4" action="#">
                        <div className="text-gray-700 dark:text-gray-300 mb-10">
                          <p className="mb-2">
                            <b>Step 1:</b> Set a different password for each of
                            your recovery accounts.
                          </p>
                          <p className="mb-2">
                            <b>Step 1:</b> Contact your friends, give them their
                            respective password and tell them to approve your
                            password reset.
                          </p>
                          <p className="mb-2">
                            <b>Step 3:</b> Go to our homepage to reset your
                            password.
                          </p>
                        </div>
                        {Array.from(Array(naccounts).keys()).map((index) => (
                          <div key={index}>
                            <label
                              htmlFor="text"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Account {index + 1}
                            </label>
                            <div
                              className="w-full flex flex-row gap-2 items-center h-16 p-2 rounded-lg
                            bg-gray-50 text-gray-900 dark:bg-gray-900 dark:bg-opacity-25  dark:text-white"
                            >
                              <div className="w-4/6">
                                {accounts[index]['value']}
                              </div>
                              <input
                                id={`account${index + 1}`}
                                name="account"
                                type="text"
                                className="w-2/6 p-2.5 rounded-lg
                                bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="••••••••"
                                onChange={(e) =>
                                  setPasswords(e.target.value, index.toString())
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-50 ml-3 button-color disabled:opacity-25"
                      onClick={() => setOpen(false)}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm "
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ModalChangePassword
