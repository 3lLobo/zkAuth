import { useEthers, shortenAddress, useLookupAddress } from "@usedapp/core"
import { ethers } from "ethers"
import { useState, useRef } from "react"
import { usePinInput, PinInputActions } from "react-pin-input-hook"
import ConnectWalletButton from "./connectWalletButton"
import QrCodeAuth from "./qrCodeAuth"

var jsotp = require("jsotp")

const LogInBox = () => {
  const { account } = useEthers()
  const { ens } = useLookupAddress(account)

  // PIN state management
  const [verified, setVerified] = useState<boolean | undefined>(undefined)
  const [pin, setPin] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState(false)
  const actionRef = useRef<PinInputActions>(null)
  const { fields } = usePinInput({
    values: pin,
    onChange: setPin,
    error,
    actionRef,
    placeholder: "•",
  })

  function verifyCode(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    // Check if there is at least one empty field. If there is, the input is considered empty.
    if (pin.includes("")) {
      // Setting the error.
      setError(true)
      // We set the focus on the first empty field if `error: true` was passed as a parameter in `options`.
      actionRef.current?.focus()
    }
    const verifier = jsotp.TOTP("JBXWY2LUME")
    if (verifier.verify(pin.join(""))) {
      setVerified(true)
    }
  }

  const [addressInputStyle, setAddressInputStyle] = useState(
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
  )

  return (
    <>
      {!account ? (
        <div className="flex justify-center">
          <ConnectWalletButton />
        </div>
      ) : (
        <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {verified === undefined ? (
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h5>
              <label
                htmlFor="account"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your account
              </label>
              <span>{ens ?? shortenAddress(account)}</span>

              <QrCodeAuth account={account} />

              <div>{jsotp.TOTP("JBXWY2LUME").now()}</div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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

              <button
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => verifyCode(e)}
              >
                Verify
              </button>
            </form>
          ) : (
            <>
              {verified === true ? (
                <div>You have succesfully verified your account</div>
              ) : (
                <div>Wrong code. Please try again.</div>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default LogInBox
