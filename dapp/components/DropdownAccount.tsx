/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { shortenAddress, useEthers, useLookupAddress } from '@usedapp/core'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface DropdownProps {
  account: string
}

const DropdownAccount = (props: DropdownProps) => {
  const { deactivate } = useEthers()
  const { ens } = useLookupAddress(props.account)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="font-medium rounded-lg text-sm px-3 py-1.5 
          text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          {ens ?? shortenAddress(props.account)}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white 
        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                      : 'text-gray-700 dark:text-gray-300',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowTopRightOnSquareIcon
                    className="mr-3 h-5 w-5 text-gray-400 
                    dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100"
                    aria-hidden="true"
                  />
                  See on Etherscan
                </a>
              )}
            </Menu.Item>
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                  onClick={() => deactivate()}
                >
                  <ArrowRightOnRectangleIcon
                    className="mr-3 h-5 w-5 text-gray-400 
                    dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100"
                    aria-hidden="true"
                  />
                  Logout
                </a>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownAccount
