import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { DAppProvider } from "@usedapp/core"

const config = {
  multicallAddresses: ["0x"],
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <DAppProvider config={config}>
        <Component {...pageProps} />
      </DAppProvider>
    </ThemeProvider>
  )
}

export default MyApp
