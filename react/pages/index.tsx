import { WidgetProps } from "@worldcoin/id"
import { ConnectKitButton } from "connectkit"
import type { NextPage } from 'next'
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAccount } from "wagmi"


const WorldIDWidget = dynamic<WidgetProps>(() => import("@worldcoin/id").then((mod) => mod.WorldIDWidget), { ssr: false });

const Home: NextPage = () => {
  const [address, setAddress] = useState("")

  const raffle = {
    number: 1,
    image: "/poap.svg"
  }

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
          <h1 className="text-5xl font-semibold mt-2">Raffle #{raffle.number}</h1>
          <p className="mt-4">Welcome to rafflebot, where every day we raffle prizes away to one lucky <em>human</em>.  To enter today's raffle, prove you are human below using your <a className="font-semibold underline" href="https://worldcoin.org">WorldID</a>!</p>
          <div className="flex justify-center mt-8">
            <WorldIDWidget
              actionId="wid_staging_f54402327ea85df8002901525f197091"
              signal={address}
              signalDescription="Enter the current daily raffle for a free NFT!"
              enableTelemetry
              onSuccess={(verificationResponse) => console.log(verificationResponse)}
              onError={(error) => console.error(error)}
              debug={true}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="border-2 border-white/50 rounded-full m-auto flex justify-center w-fit p-4">
            <Image
              src={raffle.image}
              alt={"The current prize for raffle #" + raffle.number}
              width={250}
              height={250}
            />
          </div>
          <div className="border-2 border-white/30 h-44 rounded-lg bg-white/30 overflow-y-scroll mt-6">
            <p>Entry 1</p>
            <p>Entry 2</p>
            <p>Entry 3</p>
            <p>Entry 4</p>
            <p>Entry 5</p>
            <p>Entry 6</p>
            <p>Entry 7</p>
            <p>Entry 8</p>
            <p>Entry 9</p>
          </div>
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
