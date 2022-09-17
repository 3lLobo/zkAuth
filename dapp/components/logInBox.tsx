import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import { ethers } from 'ethers'
import { useState, useRef, useEffect } from 'react'
import { usePinInput, PinInputActions } from 'react-pin-input-hook'
import ConnectWalletButton from './connectWalletButton'
import ModalVerify from './modalVerify'
import QrCodeAuth from './qrCodeAuth'

var jsotp = require('jsotp')
var base32 = require('thirty-two')

const LogInBox = () => {
  const { account, library: provider } = useEthers()
  const { ens } = useLookupAddress(account)

  // Secret State Management
  const [secret, setSecret] = useState('')
  const [blur, setBlur] = useState('opacity-50 blur-sm')
  const loadSecret = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (provider != undefined) {
      const signer = provider.getSigner()
      const signature = await signer.signMessage('zkAuth') // TODO: Random Input? ZK?
      const secretEncoded = base32
        .encode(signature)
        .toString()
        .replace(/=/g, '')
      setSecret(secretEncoded)
      setBlur('')
    }
  }

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
    const verifier = jsotp.TOTP(secret)
    if (verifier.verify(pin.join(''))) {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }

  return (
    <>
      {!account ? (
        <div className="flex justify-center">
          <ConnectWalletButton />
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
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
            <div className="relative flex justify-center items-center">
              <div className={blur}>
                <QrCodeAuth account={account} secret={secret} />
              </div>
              {secret == '' ? (
                <button
                  className="absolute w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => loadSecret(e)}
                >
                  Set up 2FA
                </button>
              ) : (
                <></>
              )}
            </div>

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

            <ModalVerify verified={verified} verifyCode={verifyCode} />
          </form>
        </div>
      )}
    </>
  )
}

export default LogInBox
