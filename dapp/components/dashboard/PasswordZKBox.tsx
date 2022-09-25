import { useState } from 'react'

interface PasswordZKBoxParams {
  setOpen: any
  allVerified: boolean
}

const PasswordZKBox = (props: PasswordZKBoxParams) => {
  // PIN state management
  const [verified, setVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function verifyCode(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    // Check if there is at least one empty field. If there is, the input is considered empty.
  }
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col justify-center my-4 ">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center"
        >
          Password
        </label>
        <input
          id="passwordzk"
          name="password"
          type="password"
          className="w-1/2 p-2.5 mx-auto rounded-lg
            bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-50 ml-3 button-color disabled:opacity-25"
          onClick={() => props.setOpen(false)}
          disabled={!props.allVerified}
        >
          Set
        </button>

        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm "
          onClick={() => props.setOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default PasswordZKBox
