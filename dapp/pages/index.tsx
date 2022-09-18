import type { NextPage } from 'next'
import { LogInBox } from '../components'

const Home: NextPage = () => {
  return (
    <div>
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <LogInBox />
      </div>
    </div>
  )
}

export default Home
