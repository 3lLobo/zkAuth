import { useEthers } from '@usedapp/core'
import { useState } from 'react'
import { motion } from 'framer-motion'


import { ConnectWalletButton, TotpSetup, ZkPasswordSetup, CardChoice } from '.'

const LogInBox = () => {
  const { account, library: provider } = useEthers()
  const [authType, setAuthType] = useState('')

  return (
    <>
      {!account ? (
        <motion.div
          key="connect"
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
              key="settotp"
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
              key="setzk"
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
              key="totp"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <CardChoice authType="totp" setAuthType={setAuthType} />
            </motion.div>
            <motion.div
              key="zk"
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
