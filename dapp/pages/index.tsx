import type { NextPage } from 'next'
import { Hero } from '../components'

const Home: NextPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] w-6xl flex justify-center items-center">
      <Hero />
    </div>
  )
}

export default Home
