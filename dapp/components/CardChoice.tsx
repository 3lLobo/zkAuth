import { useTheme } from "next-themes"
import Image from "next/image"

interface CardChoiceProps {
  authType: string
  setAuthType: (arg: string) => void
}

const CardChoice = (props: CardChoiceProps) => {
  const { theme } = useTheme()
  return (
    {
      totp: (
        <button
          className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transition ease-in-out duration-500 grid grid-cols-12 gap-4"
          onClick={() => props.setAuthType("totp")}
        >
          <div className="flex h-full col-span-3 lg:col-span-12 items-center justify-center">
            <Image
              src="/TOTP.svg"
              alt="TOTP"
              width={150}
              height={150}
              className={`filter-${theme}`}
            />
          </div>
          <div className="col-span-9 lg:col-span-12">
            <div className="text-xl lg:text-2xl font-medium lg:mt-4 text-start lg:text-center text-gray-900 dark:text-white">
              Set up TOTP 2FA
            </div>
            <div className="text-sm lg:text-base text-start lg:text-center mt-2 text-gray-500 dark:text-gray-400">
              This option will generate a set of Time dependent
              One-Time-Passwords that you can verify by using apps like Google
              Authenticator.
            </div>
          </div>
        </button>
      ),
      zk: (
        <button
          className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transition ease-in-out duration-500 grid grid-cols-12 gap-4"
          onClick={() => props.setAuthType("zk")}
        >
          <div className="flex h-full col-span-3 lg:col-span-12 items-center justify-center">
            <Image
              src="/ZK.svg"
              alt="ZK"
              width={150}
              height={150}
              className={`filter-${theme}`}
            />
          </div>
          <div className="col-span-9 lg:col-span-12">
            <div className="text-xl lg:text-2xl font-medium lg:mt-4 text-start lg:text-center text-gray-900 dark:text-white">
              Set up zk-Password 2FA
            </div>
            <div className="text-sm lg:text-base text-start lg:text-center mt-2 text-gray-500 dark:text-gray-400">
              Set up your own password, that will be encripted and stored
              on-chain. To verify it a zk-Proof will be generated in the
              frontend and verified on-chain.
            </div>
          </div>
        </button>
      ),
    }[props.authType] || <></>
  )
}

export default CardChoice
