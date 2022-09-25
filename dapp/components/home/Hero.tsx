import { motion } from 'framer-motion'
import Link from 'next/link'
import Lottie from 'react-lottie-player'
import lottieJson from '../../public/security.json'

const containerBox = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const ImageBox = {
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

const containerLeft = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const txTitle = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const txButtons = {
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const Hero = () => {
  return (
    <section>
      <motion.div
        variants={containerBox}
        initial="hidden"
        animate="show"
        className="grid max-w-6xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
      >
        <motion.div
          variants={containerLeft}
          initial="hidden"
          animate="show"
          className="mr-auto place-self-center lg:col-span-7"
        >
          <motion.div variants={txTitle}>
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Zero-knowledge authentification for your smart contracts
            </h1>
          </motion.div>
          <motion.div variants={txTitle}>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Secure your onchain operations with a two-factor authentification
              system powered by zero-knowledge proofs
            </p>
          </motion.div>
          <motion.div variants={txButtons}>
            <Link href="/login">
              <a className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </Link>
            <Link href="recovery">
              <a className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Authenticate a friend
              </a>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          variants={ImageBox}
          initial="hidden"
          animate="show"
          className="hidden lg:mt-0 lg:col-span-5 lg:flex"
        >
          <Lottie loop animationData={lottieJson} play style={{ width: 600 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
