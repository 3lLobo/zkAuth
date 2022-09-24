import { prepareMerkleTree } from 'helpers/utils.ts'
import { ethers } from 'ethers'
import { useEthers } from '@usedapp/core'
import { useEffect } from 'react'
import { decryptOrSignMetamask, encryptMetamask } from 'helpers/utils'
import { useState, SetStateAction } from 'react'


function demoEncryption() {
  const { activateBrowserWallet, library } = useEthers()

  const topSecret = "TopSecret🔐"
  const [text, setText] = useState(topSecret)
  const [buttonText, setButtonText] = useState("Encrypt")

  useEffect(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  // prepareMerkleTree()

  return (
    <>
      <div className="flex justify-center w-full max-w-7xl lg:px-8">
        <div className="w-full flex flex-col justify-center place-items-center bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20">

          <button
            onClick={() => {
              signMsg(topSecret, setText, setButtonText)
              // prepareMerkleTree()
            }
            }

            className=' w-fit px-6 py-1 bg-violet-400 dark:bg-violet-500 hover:bg-violet-500 rounded-3xl m-3'
          >
            {buttonText}
          </button>
          <div
            className='m-3 truncate max-w-3xl'>
            {text}
          </div>
        </div>
      </div>
    </>
  )
}

// Using EPI-712 to sign the msg. https://eips.ethereum.org/EIPS/eip-712
async function signMsg(msg, setText, setButtonText) {

  var provider = new ethers.providers.Web3Provider(window.ethereum)
  var from = await provider.listAccounts()
  var method = 'eth_signTypedData_v4';

  var encMsg = await encryptMetamask(msg)
  setText(JSON.parse(encMsg).ciphertext)
  setButtonText("Decrypt")

  const restoredMsg = await decryptOrSignMetamask(encMsg, 'eth_decrypt')
  setText(restoredMsg)
  setButtonText("SignV4")

  const res = await decryptOrSignMetamask(restoredMsg, 'eth_signTypedData_v4')
  console.log("Signed Data:", res)
  setText(res)
  setButtonText("Encrypt")
}



export default demoEncryption