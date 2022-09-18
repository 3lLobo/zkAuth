import NextLink from "next/link"

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col justify-center items-center">
      <h1 className="text-6xl">404</h1>
      <h2 className="text-xl mt-3 mb-2 text-gray-800 dark:text-gray-100">
        Page Not Found
      </h2>
      <div className="text-gray-600 dark:text-gray-300 mb-8">
        The page you are looking for does not seem to exist.
      </div>

      <button className="w-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <NextLink href="/" passHref>
          Go to Home
        </NextLink>
      </button>
    </div>
  )
}
