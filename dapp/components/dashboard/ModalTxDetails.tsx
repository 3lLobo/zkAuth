import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowTopRightOnSquareIcon,
  ArrowUpOnSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ethers } from 'ethers'
import { useResolveName } from '@usedapp/core'

interface ModalTxDetailsProps {}

const ModalTxDetails = (props: ModalTxDetailsProps) => {
  const [open, setOpen] = useState(false)
  const onSubmit = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <button className="w-1/2 button-color" onClick={(e) => onSubmit(e)}>
        Details
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 ">
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
                        Transaction Details
                      </Dialog.Title>
                      <div className="flex flex-col gap-4">
                        <div className="w-full grid grid-cols-12 gap-6">
                          <div className="col-span-2 text-gray-500 dark:text-gray-400 text-right">
                            Contract
                          </div>
                          <div className="col-span-10 text-gray-700 dark:text-gray-200">
                            <a
                              href=""
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex flex-row">
                                {`0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`}
                                <ArrowTopRightOnSquareIcon
                                  height={'1rem'}
                                  className="mt-1 ml-1"
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-6">
                          <div className="col-span-2 text-gray-500 dark:text-gray-400 text-right">
                            Method
                          </div>
                          <div className="col-span-10 text-gray-700 dark:text-gray-200">
                            {'swap'}
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-6">
                          <div className="col-span-2 text-gray-500 dark:text-gray-400 text-right">
                            Signature
                          </div>
                          <div className="col-span-10 text-gray-700 dark:text-gray-200">
                            {'swap(uint256,uint256)'}
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-6">
                          <div className="col-span-2 text-gray-500 dark:text-gray-400 text-right">
                            Parameters
                          </div>
                          <div className="col-span-10 text-gray-700 dark:text-gray-200">
                            {'(15, 16)'}
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-6">
                          <div className="col-span-2 text-gray-500 dark:text-gray-400 text-right">
                            Date
                          </div>
                          <div className="col-span-10 text-gray-700 dark:text-gray-200">
                            {'22-10-2022 15:06:13 UTC'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-50 ml-3 button-color"
                      onClick={() => setOpen(false)}
                    >
                      Execute
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Delete
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

export default ModalTxDetails
