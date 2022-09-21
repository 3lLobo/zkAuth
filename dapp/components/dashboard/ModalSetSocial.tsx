import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ethers } from 'ethers'
import { useEthers, useResolveName } from '@usedapp/core'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { useTheme } from 'next-themes'

interface ModalSetSocialProps {}

const ModalSetSocial = (props: ModalSetSocialProps) => {
  const [open, setOpen] = useState(false)
  //const { library: provider } = useEthers()

  const onSubmit = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  interface Accounts {
    [key: string]: string
  }
  const [accounts, setAccount] = useState<Accounts>({
    0: '',
    1: '',
    2: '',
  })

  const [verifiedAccounts, setVerifiedAccounts] = useState({
    0: '',
    1: '',
    2: '',
  })

  const invalidStyleInput = 'outline-red-500'

  const url = `https://mainnet.infura.io/v3/${process.env.API_KEY}`
  const provider = new ethers.providers.JsonRpcProvider(url)

  const verifyAccount = async (index: string) => {
    setVerifiedAccounts({ ...verifiedAccounts, [index]: 'loading' })
    const account = accounts[index]
    const address = await provider?.resolveName(account)
    const isValidAccount = ethers.utils.isAddress(account)
    //TODO: resolve ENS
    if (isValidAccount || address) {
      setVerifiedAccounts({ ...verifiedAccounts, [index]: 'verified' })
    }
    console.log(verifiedAccounts['0'])
  }

  // Manage theme
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
                        Set up recovery accounts
                      </Dialog.Title>
                      <form className="space-y-4" action="#">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          Accounts or ENS Domains
                        </h5>
                        <div>
                          <label
                            htmlFor="text"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Account 1
                          </label>
                          <div
                            className="w-full flex flex-row items-center h-14 p-2 rounded-lg
                            bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500  dark:text-white focus-within:outline focus-within:outline-2 focus-within:outline-blue-500
                            dark:focus-within:outline-blue-500"
                          >
                            <input
                              id="account1"
                              name="account"
                              type="text"
                              className="w-5/6 border-none bg-transparent outline-0 focus:ring-0 placeholder-gray-300 dark:placeholder-gray-500"
                              placeholder="0x000...0000 or vitalik.eth"
                              onChange={(e) =>
                                setAccount({ ...accounts, '0': e.target.value })
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
                            }[verifiedAccounts[0]] || (
                              <button
                                className="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-2 py-2 mx-auto"
                                onClick={() => verifyAccount('0')}
                              >
                                Verify
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-50 ml-3 button-color"
                      onClick={() => setOpen(false)}
                    >
                      Set
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
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

export default ModalSetSocial
