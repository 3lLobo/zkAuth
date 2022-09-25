import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ethers } from 'ethers'
import { AlchemyProvider } from '@ethersproject/providers'
import { shortenAddress, useEthers, useResolveName } from '@usedapp/core'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { useTheme } from 'next-themes'
import { PlusIcon } from '@heroicons/react/24/solid'
import { PasswordTOTPBox, PasswordZKBox } from '.'

interface ModalSetSocialProps {
  enabled: boolean
}

const ModalSetSocial = (props: ModalSetSocialProps) => {
  const [open, setOpen] = useState(false)
  const { account } = useEthers()

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

  const onSubmit = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  interface Accounts {
    [key: string]: Account
  }
  interface Account {
    [address: string]: string
    ens: string
    verified: string
    value: string
  }
  const [accounts, setAccount] = useState<Accounts>({
    0: { address: '', ens: '', verified: '', value: '' },
    1: { address: '', ens: '', verified: '', value: '' },
    2: { address: '', ens: '', verified: '', value: '' },
  })
  const [naccounts, setNAccounts] = useState(3)

  // Sets the address when input changes value
  const setAddress = (name: string, index: string) => {
    //TODO: Extra fromatting
    if (name.includes('.')) {
      setAccount({
        ...accounts,
        [index]: {
          ...accounts[index],
          address: '',
          ens: name,
          verified: '',
          value: name,
        },
      })
    } else {
      setAccount({
        ...accounts,
        [index]: {
          ...accounts[index],
          address: name,
          ens: '',
          verified: '',
          value: name,
        },
      })
    }
  }

  // Verifies if account address is correct. If normal address fetches ENS and viceversa. Formats input value.
  const verifyAccount = async (index: string) => {
    setAccount({
      ...accounts,
      [index]: { ...accounts[index], verified: 'loading' },
    })

    if (alchemyProvider && account) {
      // Get address from ENS if exists
      const addressfromENS = await alchemyProvider.resolveName(
        accounts[index]['ens']
      )
      const isValidAccount = ethers.utils.isAddress(accounts[index]['address'])

      //Check that is not user's own account and not the same as others
      const list = Array.from(Array(3).keys()).filter(
        (item) => item !== parseInt(index)
      )
      let otherAccounts = list.map((i) => accounts[i]['address'])
      otherAccounts.push(account)

      // We verify if either ENS or address are correctly set and modify states
      if (addressfromENS) {
        if (otherAccounts.includes(addressfromENS)) {
          setAccount({
            ...accounts,
            [index]: { ...accounts[index], verified: 'error' },
          })
          return
        } else {
          setAccount({
            ...accounts,
            [index]: {
              ...accounts[index],
              address: addressfromENS,
              verified: 'verified',
              value: `${accounts[index]['ens']} (${shortenAddress(
                addressfromENS
              )})`,
            },
          })
        }
      } else if (isValidAccount) {
        if (otherAccounts.includes(accounts[index]['address'])) {
          setAccount({
            ...accounts,
            [index]: { ...accounts[index], verified: 'error' },
          })
          return
        } else {
          const ensFromAdddress = await alchemyProvider.lookupAddress(
            accounts[index]['address']
          )
          setAccount({
            ...accounts,
            [index]: {
              ...accounts[index],
              ens: ensFromAdddress ?? '',
              verified: 'verified',
              value: ensFromAdddress
                ? `${ensFromAdddress} (${shortenAddress(
                    accounts[index]['address']
                  )})`
                : accounts[index]['address'],
            },
          })
        }
      } else {
        setAccount({
          ...accounts,
          [index]: { ...accounts[index], verified: 'error' },
        })
      }
    }
  }

  const [allVerified, setAllVerified] = useState(false)
  useEffect(() => {
    const verified = []
    for (let index in accounts) {
      verified.push(accounts[index]['verified'] == 'verified')
    }

    setAllVerified(verified.every((v) => v === true))
  })

  const addAccount = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAccount({
      ...accounts,
      [naccounts]: { address: '', ens: '', verified: '', value: '' },
    })
    setNAccounts(naccounts + 1)
  }

  const removeAccount = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newAccounts = accounts
    delete accounts[naccounts]
    setAccount(newAccounts)
    setNAccounts(naccounts - 1)
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
      {props.enabled ? (
        <button
          className="w-3/4 px-2 py-2 button-unsaturated"
          onClick={(e) => onSubmit(e)}
        >
          Set Accounts
        </button>
      ) : (
        <></>
      )}
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
                        Set up recovery accounts
                      </Dialog.Title>
                      <form className="space-y-4" action="#">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Accounts or ENS Domains
                        </h5>
                        {Array.from(Array(naccounts).keys()).map((index) => (
                          <div key={index}>
                            <label
                              htmlFor="text"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Account {index + 1}
                            </label>
                            <div
                              className={`w-full flex flex-row items-center h-14 p-2 rounded-lg
                            bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500  dark:text-white focus-within:outline focus-within:outline-2 ${
                              accounts[index]['verified'] == 'error'
                                ? 'outline outline-2 outline-red-500 dark:outline-red-500 focus-within:outline-red-500 dark:focus-within:outline-red-500'
                                : 'focus-within:outline-blue-500 dark:focus-within:outline-blue-500'
                            }`}
                            >
                              <input
                                id={`account${index + 1}`}
                                name="account"
                                type="text"
                                className="w-5/6 border-none bg-transparent dark:bg-transparent outline-0 focus:ring-0 placeholder-gray-300 dark:placeholder-gray-500"
                                placeholder="0x000...0000 or vitalik.eth"
                                value={accounts[index]['value']}
                                onChange={(e) =>
                                  setAddress(e.target.value, index.toString())
                                }
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
                                      color={
                                        theme == 'dark' ? '#ffffff' : '#3b83f6'
                                      }
                                      ariaLabel="three-dots-loading"
                                    />
                                  </div>
                                ),
                              }[accounts[index]['verified']] || (
                                <button
                                  className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-2 py-2 mx-auto"
                                  onClick={() =>
                                    verifyAccount(index.toString())
                                  }
                                >
                                  Verify
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="mt-3 flex flex-row gap-3 justify-center">
                          <button
                            className="dark:bg-gray-800 bg-white
                      dark:hover:bg-gray-700 hover:bg-gray-100
                      dark:border-gray-600 border-gray-300
                      rounded-full border w-9 h-9"
                            onClick={(e) => addAccount(e)}
                          >
                            <PlusIcon
                              height={'1.2rem'}
                              width={'1.2rem'}
                              className="mx-auto"
                            />
                          </button>
                          {naccounts > 3 ? (
                            <button
                              className="dark:bg-gray-800 bg-white
                        dark:hover:bg-gray-700 hover:bg-gray-100
                        dark:border-gray-600 border-gray-300
                        rounded-full border w-9 h-9"
                              onClick={(e) => removeAccount(e)}
                            >
                              <MinusIcon
                                height={'1.2rem'}
                                width={'1.2rem'}
                                className="mx-auto"
                              />
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div
                          id="password"
                          className="w-full mt-3 flex flex-row gap-3 justify-center"
                        >
                          {true ? (
                            <PasswordTOTPBox
                              setOpen={setOpen}
                              allVerified={allVerified}
                            />
                          ) : (
                            <PasswordZKBox
                              setOpen={setOpen}
                              allVerified={allVerified}
                            />
                          )}
                        </div>
                      </form>
                    </div>
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

export default ModalSetSocial
