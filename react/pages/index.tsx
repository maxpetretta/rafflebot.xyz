import { ethers } from "ethers"
import type { NextPage } from "next"
import Image from "next/image"
import { useState } from "react"
import { useAccount, useContractRead } from "wagmi"
import Controls from "../components/Controls"
import Countdown from "../components/Countdown"
import EntryList from "../components/EntryList"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Winner from "../components/Winner"
import { rafflebotContract } from "../lib/contract"

const Home: NextPage = () => {
  const [address, setAddress] = useState("")
  const [raffleID, setRaffleID] = useState("")

  /**
   * Contract hooks
   */
  useAccount({
    onConnect({ address }) {
      if (address) {
        setAddress(address)
      }
    },
  })

  useContractRead({
    ...rafflebotContract,
    functionName: "getID",
    onSuccess(data) {
      setRaffleID(ethers.utils.formatUnits(data, 0))
    },
  })

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-br from-red-500 to-fuchsia-900">
      <Header />
      <div className="m-auto flex w-3/5 rounded-xl border-2 border-white/50 bg-white/25 p-3">
        <div className="flex w-1/2 flex-col">
          <time className="text-gray-200">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 text-5xl font-semibold">Raffle #{raffleID}</h1>
          <p className="mt-4">
            Welcome to rafflebot, where every day we raffle prizes away to one
            lucky <em>human</em>. To enter today&apos;s raffle, prove you are
            human below using your{" "}
            <a className="font-semibold underline" href="https://worldcoin.org">
              WorldID
            </a>
            !
          </p>
          <div className="h-8" />
          <Countdown />
          <Controls address={address} />
        </div>
        <div className="w-1/2">
          <div className="m-auto flex w-fit justify-center rounded-full border-2 border-white/50 p-4">
            <Image
              src="/poap.svg"
              alt={"The current prize for raffle #" + raffleID}
              width={250}
              height={250}
            />
          </div>
          <Winner raffleID={raffleID} />
          <EntryList />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
