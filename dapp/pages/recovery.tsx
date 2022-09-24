import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import { RecoveryBox } from '../components'

const Recovery: NextPage = () => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="h-[calc(100vh-100px)] flex justify-center items-center"
    >
      <RecoveryBox />
    </motion.div>
  )
}

export default Recovery
