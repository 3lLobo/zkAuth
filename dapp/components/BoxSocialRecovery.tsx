import { ModalSetSocial } from './'

const BoxSocialRecovery = () => {
  return (
    <div
      className="grid grid-cols-12 col-span-4 w-full p-6 rounded-lg border shadow-md 
      bg-white  dark:bg-gray-800 
      border-gray-200  dark:border-gray-700"
    >
      <div className="col-span-8 flex flex-col">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Social Recovery
        </div>
        <div className="text-2xl mb-5">Enabled</div>
        <ModalSetSocial />
      </div>

      <div className="flex flex-col col-span-4 items-center justify-center">
        <div className="text-[6rem] text-gray-900 dark:text-gray-200 leading-none -mt-4">
          3
        </div>
        <div className="text-xs text-center text-gray-600 dark:text-gray-400">
          Recovery accounts
        </div>
      </div>
    </div>
  )
}

export default BoxSocialRecovery
