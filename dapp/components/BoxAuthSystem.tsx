import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const BoxAuthSystem = () => {
  const { theme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (theme) {
      setIsLoaded(true)
    }
  })

  if (!isLoaded) return null

  return (
    <div
      className="grid grid-cols-12 col-span-4 w-full p-6 rounded-lg border shadow-md 
      bg-white  dark:bg-gray-800 
      border-gray-200  dark:border-gray-700"
    >
      <div className="col-span-8 flex flex-col">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Your 2FA System
        </div>
        <div className="text-2xl mb-5">zk-TOTP</div>
        <button className="w-3/4 px-2 py-2 button-unsaturated">
          Reset Passwords
        </button>
      </div>

      <div className="flex h-full col-span-4 items-center justify-center">
        <Image
          src="/TOTP.svg"
          alt="TOTP"
          width={100}
          height={100}
          className={`filter-${theme}`}
        />
      </div>
    </div>
  )
}

export default BoxAuthSystem
