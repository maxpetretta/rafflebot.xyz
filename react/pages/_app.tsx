import { ConnectKitProvider, getDefaultClient } from "connectkit"
import type { AppProps } from 'next/app'
import { chain, createClient, WagmiConfig } from "wagmi"
import '../styles/globals.css'

const client = createClient(
  getDefaultClient({
    appName: "rafflebot.xyz",
    infuraId: process.env.INFURA_ID,
    chains: [chain.hardhat, chain.goerli]
  })
)

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
        <ConnectKitProvider theme="retro">
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App
