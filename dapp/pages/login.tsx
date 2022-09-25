import type { NextPage } from 'next'
import { LogInBox } from '../components'

const LogIn: NextPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex justify-center items-center">
      <LogInBox />
    </div>
  )
}

export default LogIn
