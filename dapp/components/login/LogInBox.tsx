import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { ConnectWalletButton, TotpSetup, ZkPasswordSetup, CardChoice } from '.'
import { connectFactory } from '../../helpers/contracts'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

const LogInBox = () => {
  const { account, library: provider } = useEthers()
  const [authType, setAuthType] = useState('')
  const router = useRouter()

  // Load data to know if user has wallet
  useEffect(() => {
    const loadInfo = async () => {
      if (provider && account) {
        try {
          const zkWalletFactory = connectFactory(provider)
          console.log("🚀 ~ file: LogInBox.tsx ~ line 21 ~ loadInfo ~ zkWalletFactory", zkWalletFactory.userAddressToWalletAddress(account))
          console.log("🚀 ~ file: LogInBox.tsx ~ line 24 ~ loadInfo ~ account", account)
          const walletAddress =
            await zkWalletFactory.userAddressToWalletAddress(account)
          console.log(walletAddress)
          if (walletAddress !== ethers.constants.AddressZero) {
            router.push('./dashboard')
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    if (provider && account) {
      loadInfo()
    }
  }, [provider, account])

  return (
    <>
      {!account ? (
        <motion.div
          className="flex justify-center"
          initial={{ y: 10, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <ConnectWalletButton />
        </motion.div>
      ) : (
        {
          totp: (
            <motion.div
              initial={{ y: 10, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <TotpSetup setAuthType={setAuthType} />
            </motion.div>
          ),
          zk: (
            <motion.div
              initial={{ y: 10, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <ZkPasswordSetup setAuthType={setAuthType} />
            </motion.div>
          ),
        }[authType] || (
          <div className="flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:space-x-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <CardChoice authType="totp" setAuthType={setAuthType} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <CardChoice authType="zk" setAuthType={setAuthType} />
            </motion.div>
          </div>
        )
      )}
    </>
  )
}

export default LogInBox
