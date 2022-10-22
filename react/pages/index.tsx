import { ConnectKitButton } from "connectkit"
import type { NextPage } from 'next'
import Link from "next/link"
import { useState } from "react"
import { useAccount } from "wagmi"

const Home: NextPage = () => {
  const [address, setAddress] = useState("")

  /**
   * Contract hooks
   */
  useAccount({
    onConnect({address}) {
      if (address) {
        setAddress(address)
      }
    }
  })

  return (
    <div className="bg-gradient-to-br from-red-500 to-fuchsia-900 min-h-screen flex flex-col justify-between">
      <header className="flex justify-between p-6 items-center">
        <Link href="/">
          <a className="text-xl text-white font-semibold rounded-lg p-3 bg-white/25 transition-transform hover:scale-110 ease-in-out">
            🤖 Rafflebot.xyz
          </a>
        </Link>
        <ConnectKitButton />
      </header>
      <div className="flex m-auto w-3/5 bg-white/25 rounded-xl border-2 border-white/50 p-3">
        <div className="w-1/2">
          <time className="text-gray-200">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-5xl font-semibold mt-2">Raffle ##</h1>
          <p className="mt-4">Welcome to rafflebot, where every day we raffle prizes away to one lucky <em>human</em>.  To enter today's raffle, prove you are human below using your <a className="font-semibold underline" href="https://worldcoin.org">WorldID</a>!</p>
          <div className="flex justify-center mt-8">
            {/* Add buttons here */}
          </div>
        </div>
        <div className="w-1/2">
          <p>Testing</p>
        </div>
      </div>
      <footer className="p-6">
        <p>Built by <a className="font-semibold underline" href="https://maxpetretta.com">Max Petretta</a></p>
        <p>Check out the source code on <a className="font-semibold underline" href="https://github.com/maxpetretta/rafflebot.xyz">GitHub</a></p>
      </footer>
    </div>
  )
}

export default Home
