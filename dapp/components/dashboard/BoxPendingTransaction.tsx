import ModalTxDetails from './ModalTxDetails'

const BoxPendingTransaction = () => {
  return (
    <div
      className="w-full p-6 grid grid-cols-12 gap-4 divide-x rounded-lg border shadow-md 
        bg-white  dark:bg-gray-800 
        border-gray-200  dark:border-gray-700
        divide-gray-200  dark:divide-gray-700"
    >
      <div className="col-span-3 flex flex-col items-center justify-center ">
        <div>0x93902...309209</div>
        <div className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          Contract
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center">
        <div>swap</div>
        <div className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          Function
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center">
        <div>22-03-09 13:44:42</div>
        <div className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          Date
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center">
        <ModalTxDetails />
      </div>
    </div>
  )
}

export default BoxPendingTransaction
