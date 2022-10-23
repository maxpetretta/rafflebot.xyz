import { WidgetProps } from "@worldcoin/id"
import { ConnectKitButton } from "connectkit"
import { ethers } from "ethers"
import type { NextPage } from 'next'
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAccount, useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi"
import { rafflebotContract } from "../lib/contract"

// Need type definitions, see: https://github.com/iamkun/dayjs/issues/297
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
dayjs.extend(duration)

const WorldIDWidget = dynamic<WidgetProps>(() => import("@worldcoin/id").then((mod) => mod.WorldIDWidget), { ssr: false });

const Home: NextPage = () => {
  const [address, setAddress] = useState()
  const [raffleID, setRaffleID] = useState()
  const [countdown, setCountdown] = useState(0)
  const [entrants, setEntrants] = useState()
  const [winner, setWinner] = useState()

  // const now = new Date()

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

  useContractReads({
    contracts: [
      {
        ...rafflebotContract,
        functionName: "getID",
      },
      {
        ...rafflebotContract,
        functionName: "getEndTime",
      },
      {
        ...rafflebotContract,
        functionName: "getEntrants",
      },
      {
        ...rafflebotContract,
        functionName: "getWinner",
        args: [raffleID > 0 ? raffleID - 1 : 0]
      }
    ],
    onSuccess(data) {
      if (data[0]) {
        setRaffleID(ethers.utils.formatUnits(data[0], 0))
      }
      if (data[1]) {
        const now = dayjs()
        const end = dayjs(data[1] * 1000)
        const countdown = end.diff(now)
        console.log(dayjs.duration(countdown))
        setCountdown(countdown)
      }
      if (data[2]) {
        console.log(entrants)
        setEntrants(data[2])
      }
      if (data[3]) {
        setWinner(data[3])
      }
    }
  })

  const { config: enterConfig } = usePrepareContractWrite({
    ...rafflebotContract,
    functionName: "enter"
  })
  const { write: enter } = useContractWrite({
    ...enterConfig,
    onSuccess(data) {
      console.debug("Entered raffle --", data)
    },
    onError(error) {
      console.error("Transaction failed --", error)
    }
  })

  const { config: endConfig } = usePrepareContractWrite({
    ...rafflebotContract,
    functionName: "end"
  })
  const { write: end } = useContractWrite({
    ...endConfig,
    onSuccess(data) {
      console.debug("Ended raffle --", data)
    },
    onError(error) {
      console.error("Transaction failed --", error)
    }
  })

  /**
   * On page load, begin a countdown timer for the raffle
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1000)
    }, 1000)
    return () => clearInterval(interval)
  }, [countdown])

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
        <div className="flex flex-col w-1/2">
          <time className="text-gray-200">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-5xl font-semibold mt-2">Raffle #{raffleID}</h1>
          <p className="mt-4">Welcome to rafflebot, where every day we raffle prizes away to one lucky <em>human</em>.  To enter today's raffle, prove you are human below using your <a className="font-semibold underline" href="https://worldcoin.org">WorldID</a>!</p>
          <div className="h-8" />
          <p>Today's raffle ends in:</p>
          <h2 className="mt-8 text-center text-5xl font-bold">
            {countdown && 
              <time className="whitespace-pre">{dayjs.duration(countdown).hours() + "h  " + dayjs.duration(countdown).minutes() + "m  " + dayjs.duration(countdown).seconds() + "s"}</time>
            }
          </h2>
          <div className="flex grow justify-center items-center">
            <WorldIDWidget
              actionId="wid_staging_f54402327ea85df8002901525f197091"
              signal={address}
              signalDescription="Enter the current daily raffle for a free NFT!"
              enableTelemetry
              onSuccess={(verificationResponse) => console.log(verificationResponse)}
              onError={(error) => console.error(error)}
              debug={true}
            />
            <button disabled={!enter} onClick={() => enter?.()}>
              Enter Raffle
            </button>
            <button disabled={!end} onClick={() => end?.()}>
              End Raffle
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="border-2 border-white/50 rounded-full m-auto flex justify-center w-fit p-4">
            <Image
              src="/poap.svg"
              alt={"The current prize for raffle #" + raffleID}
              width={250}
              height={250}
            />
          </div>
          <div className="border-2 border-white/30 h-44 rounded-lg bg-white/30 overflow-y-scroll mt-6">
            {entrants && 
              entrants.map((entry) => {
                return (
                  <div key={entry} className="border-b border-white p-4 font-medium text-center">
                    {entry}
                  </div>
                )
              })
            }
            {!entrants || entrants.length == 0 && 
              <div className="border-b border-white p-4">
                <p>No entries yet...</p>
              </div>
            }
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
