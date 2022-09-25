import {
  ArrowUturnLeftIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useEthers } from '@usedapp/core'
import { useState } from 'react'

import dynamic from 'next/dynamic'
const PasswordChecklist = dynamic(import('react-password-checklist'), {
  ssr: false,
})
interface ZkSetupProps {
  setAuthType: (arg: string) => void
}
const ZkPasswordSetup = (props: ZkSetupProps) => {
  const { account, library: provider } = useEthers()

  // PIN state management
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [isValid, setIsValid] = useState(false)

  // Set password to blockchain
  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  if (!account) return null
  return (
    <div className="relative w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={() => props.setAuthType('')}
        >
          <span className="sr-only">Back</span>
          <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <form className="space-y-6" action="#">
        <h5 className="text-2xl font-medium flex justify-center text-gray-900 dark:text-white">
          Set up zk-Password
        </h5>

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
            type="password"
            className="w-full p-2.5 rounded-lg
            bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Repeat Password
          </label>
          <input
            id="passwordRepeat"
            name="password"
            type="password"
            className="w-full p-2.5 rounded-lg
            bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="••••••••"
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </div>
        <div>
          <PasswordChecklist
            rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            iconComponents={{
              ValidIcon: <CheckIcon className="h-5 w-5 mr-1 text-green-600" />,
              InvalidIcon: <XMarkIcon className="h-5 w-5 mr-1 text-red-600" />,
            }}
            className="flex flex-col text-sm align-middle"
            onChange={(isValid) => {
              setIsValid(isValid)
            }}
          />
        </div>
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          disabled:opacity-25"
          onClick={(e) => onSubmit(e)}
          disabled={!isValid}
        >
          Set password
        </button>
      </form>
    </div>
  )
}

export default ZkPasswordSetup
