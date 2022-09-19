import type { NextPage } from 'next'
import {
  BoxAuthSystem,
  BoxSocialRecovery,
  BoxPendingTransaction,
} from '../components'

const Dashboard: NextPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex justify-center mt-10">
      <div className="w-[80%] max-w-7xl flex flex-col">
        <div className="w-full grid grid-cols-12 gap-4">
          <BoxAuthSystem />
          <BoxSocialRecovery />
          <BoxAuthSystem />
        </div>
        <div className="w-full mt-10">
          <div className="text-2xl text-gray-800 dark:text-white mb-6">
            Pending transactions
          </div>
          <BoxPendingTransaction />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
