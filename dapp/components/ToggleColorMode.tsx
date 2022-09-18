import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ToggleColorMode = () => {
  const { theme, setTheme } = useTheme()

  // Handle Hydration mismatch
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  if (!loaded) return null

  return (
    <div className="flex flex-0 color-snow hover:scale-110 transition ease-in-out duration-500">
      <button
        className="
            dark:bg-gray-800 bg-white
            dark:hover:bg-gray-700 hover:bg-gray-100
            dark:border-gray-600 border-gray-300  
            rounded-full border p-2"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <MoonIcon className="h-4 w-4 text-snow fill-snow" />
        ) : (
          <SunIcon className="h-4 w-4 text-snow fill-snow" />
        )}
      </button>
    </div>
  )
}

export default ToggleColorMode
