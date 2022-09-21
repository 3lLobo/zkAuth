import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import {
  BoxApprovedTxs,
  BoxAuthSystem,
  BoxSocialRecovery,
  BoxPendingTransaction,
} from '../components'

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
  return (
    <div className="h-[calc(100vh-100px)] flex justify-center mt-10">
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
            <BoxSocialRecovery />
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
    </div>
  )
}

export default Dashboard
