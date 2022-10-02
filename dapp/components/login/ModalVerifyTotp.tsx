import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { ThreeDots } from 'react-loader-spinner'
import { useTheme } from 'next-themes'

interface ModalVerifyTotpProps {
  verified: boolean
  verifyCode: any
}

const ModalVerifyTotp = (props: ModalVerifyTotpProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    await props.verifyCode(e)
    setLoading(false)
    setOpen(true)
  }

  const goToDashboard = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('./dashboard')
  }

  // Manage theme hydration
  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (theme) {
      setLoaded(true)
    }
  })

  return (
    <>
      <button
        type="button"
        className="w-full h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(e) => onSubmit(e)}
      >
        {loading ? (
          <div className="flex justify-center">
            <ThreeDots
              height="20"
              width="35"
              radius="9"
              color={theme == 'dark' ? '#ffffff' : '#3b83f6'}
              ariaLabel="three-dots-loading"
            />
          </div>
        ) : (
          <div>Verify</div>
        )}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ">
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
                  <div className="sm:flex sm:items-start">
                    {props.verified === true ? (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >
                        {props.verified === true ? (
                          <div>Successful verification</div>
                        ) : (
                          <div>Error</div>
                        )}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="mb-5 text-md font-normal text-gray-500 dark:text-gray-300">
                          {props.verified === true ? (
                            <p>You have successfully verified your account</p>
                          ) : (
                            <p>Wrong code. Please try again.</p>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    {props.verified === false ? (
                      <>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base text-center font-medium shadow-sm focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => setOpen(false)}
                        >
                          Try Again
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base text-center font-medium shadow-sm focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={(e) => goToDashboard(e)}
                      >
                        Go to Dashboard
                      </button>
                    )}
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

export default ModalVerifyTotp
