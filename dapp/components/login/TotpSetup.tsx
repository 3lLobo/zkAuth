import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { ThreeDots } from 'react-loader-spinner'

import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import { useState, useRef, useEffect } from 'react'
import { usePinInput, PinInputActions } from 'react-pin-input-hook'
import { ModalVerifyTotp, QrCodeAuth } from './'

import { prepareMerkleTree, generateInput } from '../../helpers/utils'
import {
  connectFactory,
  connectTOTPVerifier,
  deployZkOTPValidator,
  deployZkWallet,
  zkTimestampProof,
} from '../../helpers/contracts'
import { useCeramic } from '../../hooks/useCeramic'

interface TotpSetupProps {
  setAuthType: (arg: string) => void
}

const TotpSetup = (props: TotpSetupProps) => {
  const { account, library: provider } = useEthers()

  // URI State Management
  const [uri, setUri] = useState('')
  const [blur, setBlur] = useState('opacity-50 blur-sm')
  const [loading, setLoading] = useState(false)

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

  // Manage ceramic connection
  const [addressCeramic, setAddressCeramic] = useState<string | null>(null)
  const { ceramicData, ceramicStatus } = useCeramic(addressCeramic)

  // Create Wallet
  useEffect(() => {
    const createWallet = async () => {
      if (ceramicData && ceramicData.set && provider && account) {
        const tree = await prepareMerkleTree(account)

        if (tree) {
          const [URI, _, root, encrypted] = tree
          ceramicData.set({ MerkleTree: encrypted })
          connectFactory(provider)
          const otpValidator = await deployZkOTPValidator(root, provider)
          await deployZkWallet(otpValidator, root, provider)

          setUri(URI)
          setBlur('')
        } else {
          console.log('CONNECTION ERROR')
        }
      }
    }
    if (ceramicStatus == 'connected' && provider && account) {
      createWallet()
    }
  }, [ceramicStatus, ceramicData, provider, account])

  const createTOTPWallet = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    if (account) {
      setAddressCeramic(account)
    }
  }

  useEffect(() => {
    const zkProof = async () => {
      if (ceramicData && ceramicData.content && provider && account) {
        console.log('Read the hashes: ', ceramicData.content.MerkleTree)
        const encryptedHashes = ceramicData.content.MerkleTree
        const totpObject = await generateInput(pin.join(''), encryptedHashes)
        if (totpObject) {
          connectTOTPVerifier(provider, account)
          try {
            const tx = await zkTimestampProof(totpObject)
            await tx.wait()
            setVerified(true)
          } catch (e) {
            console.log(e)
            setVerified(false)
          }
        }
      }
    }
    if (
      ceramicStatus == 'connected' &&
      ceramicData.content.MerkleTree &&
      provider &&
      account
    ) {
      zkProof()
    }
  }, [ceramicStatus, ceramicData, provider, account])

  const verifyCode = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Check if there is at least one empty field. If there is, the input is considered empty.
    if (pin.includes('')) {
      // Setting the error.
      setError(true)
      // We set the focus on the first empty field if `error: true` was passed as a parameter in `options`.
      actionRef.current?.focus()
      return
    }
    if (account) {
      setAddressCeramic(account)
    }
  }

  // Manage theme hydration
  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (theme) {
      setLoaded(true)
    }
  })

  if (!account || !loaded) return null
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
        <div className="text-2xl font-medium flex justify-center text-gray-900 dark:text-white">
          Set up your TOTP
        </div>
        <div className="relative flex justify-center items-center">
          <div className={blur}>
            <QrCodeAuth uri={uri} />
          </div>
          {uri == '' ? (
            <button
              className="absolute w-1/2 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => createTOTPWallet(e)}
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
                <div>Set up 2FA</div>
              )}
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

        <ModalVerifyTotp verified={verified} verifyCode={verifyCode} />
      </form>
    </div>
  )
}

export default TotpSetup
