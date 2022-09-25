import { useEthers } from '@usedapp/core'
import { info } from 'console'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import {
  BoxApprovedTxs,
  BoxAuthSystem,
  BoxSocialRecovery,
  BoxPendingTransaction,
} from '../components'
import { connectFactory, connectZkWallet } from '../helpers/contracts'

const containerUpperBoxes = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const upperBox = {
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const containerTxBoxes = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const txTitle = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const txBox = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const Dashboard: NextPage = () => {
  const { activate, library, account } = useEthers()

  // Set up provider if already connected
  const checkMetaMaskConnected = useCallback(async () => {
    const { ethereum } = window
    if (ethereum && !library) {
      var provider = new ethers.providers.Web3Provider(ethereum)
      const accounts = await provider.listAccounts()
      const connected = accounts.length > 0
      if (connected) {
        activate(provider)
      }
    }
  }, [activate])

  useEffect(() => {
    checkMetaMaskConnected()
  }, [checkMetaMaskConnected])

  // Load blockchain info
  const router = useRouter()
  const [loadingBlock, setLoadingBlock] = useState(true)
  const [info, setInfo] = useState({
    trustees: [],
    numberTrustees: '0',
  })
  useEffect(() => {
    const loadData = async () => {
      if (library && account) {
        //load factory
        const zkWalletFactory = connectFactory(library)
        const walletAddress = await zkWalletFactory.userAddressToWalletAddress(
          account
        )
        if (walletAddress == ethers.constants.AddressZero) {
          router.push('./login')
          return
        }
        //load wallet
        const zkWallet = connectZkWallet(library, walletAddress)
        const numberTrustees = (await zkWallet.numberTrustees()).toString()
        const trustees = [] //await zkWallet.Trustees(1)
        setInfo({ ...info, numberTrustees: numberTrustees })
        setLoadingBlock(false)
      }
    }
    if (library && account) {
      loadData()
    }
  }, [library, account])

  // Manage theme hydration
  const { theme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (theme) {
      setLoaded(true)
    }
  })
  if (!loaded) return null

  return (
    <div className="h-[calc(100vh-100px)] flex justify-center mt-10">
      {' '}
      {loadingBlock ? (
        <div className="flex justify-center">
          <ThreeDots
            height="50"
            width="70"
            radius="9"
            color={theme == 'dark' ? '#ffffff' : '#3b83f6'}
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <div className="w-[90%] max-w-6xl flex flex-col">
          <motion.div
            variants={containerUpperBoxes}
            initial="hidden"
            animate="show"
            className="w-full grid grid-cols-12 gap-4"
          >
            <motion.div variants={upperBox} className="col-span-4">
              <BoxAuthSystem />
            </motion.div>
            <motion.div variants={upperBox} className="col-span-4">
              <BoxSocialRecovery numberTrustees={info['numberTrustees']} />
            </motion.div>
            <motion.div variants={upperBox} className="col-span-4">
              <BoxApprovedTxs />
            </motion.div>
          </motion.div>
          <motion.div
            variants={containerTxBoxes}
            initial="hidden"
            animate="show"
            className="w-full mt-10"
          >
            <motion.div
              variants={txTitle}
              className="text-2xl text-gray-800 dark:text-white mb-6"
            >
              Pending transactions
            </motion.div>
            {[1, 2].map((key, tx) => (
              <motion.div variants={txBox} key={key} className="w-full mb-6">
                <BoxPendingTransaction />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
