import { useState, useRef } from 'react'
import { usePinInput, PinInputActions } from 'react-pin-input-hook'
var jsotp = require('jsotp')
var base32 = require('thirty-two')

interface PasswordTOTPBoxParams {
  setOpen: any
  allVerified: boolean
}

const PasswordTOTPBox = (props: PasswordTOTPBoxParams) => {
  // PIN state management
  const [verified, setVerified] = useState(false)
  const [pin, setPin] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState(false)
  const actionRef = useRef<PinInputActions>(null)
  const { fields } = usePinInput({
    values: pin,
    onChange: setPin,
    error,
    actionRef,
    placeholder: '•',
  })

  function verifyCode(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    // Check if there is at least one empty field. If there is, the input is considered empty.
    if (pin.includes('')) {
      // Setting the error.
      setError(true)
      // We set the focus on the first empty field if `error: true` was passed as a parameter in `options`.
      actionRef.current?.focus()
    }
    const verifier = jsotp.TOTP('SECRET')
    if (verifier.verify(pin.join(''))) {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }
  return (
    <div className="w-full flex flex-col">
      <div className="my-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center"
        >
          Authenticator Code
        </label>

        <div className="pin-input flex flex-row justify-center">
          {fields.map((propsField, index) => (
            <input
              key={index}
              className="pin-input__field w-10 p-2.5 mx-1 text-2xl rounded-lg text-center font-mono
                  bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...propsField}
            />
          ))}
        </div>
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

export default PasswordTOTPBox
