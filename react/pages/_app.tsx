import { ConnectKitProvider, getDefaultClient } from "connectkit"
import type { AppProps } from "next/app"
import Head from "next/head"
import { chain, createClient, WagmiConfig } from "wagmi"
import "../styles/globals.css"

const client = createClient(
  getDefaultClient({
    appName: "rafflebot.xyz",
    infuraId: process.env.INFURA_ID,
    chains: [chain.hardhat],
  })
)

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <WagmiConfig client={client}>
        <ConnectKitProvider theme="retro">
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
