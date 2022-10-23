import { useState } from "react"
import { useContractRead } from "wagmi"
import { rafflebotContract } from "../lib/contract"

export default function Winner(props: { raffleID: string }) {
  const [winner, setWinner] = useState()

  /**
   * Contract hooks
   */
  useContractRead({
    ...rafflebotContract,
    functionName: "getWinner",
    args: [Number(props.raffleID) - 1],
    onSuccess(data) {
      console.log("Winner: ", winner)
      setWinner(data)
    }
  })

  return (
    <div className="border-2 border-white/30 p-4 rounded-lg bg-yellow-500/50 mt-6">
      <p className="font-semibold">Yesterday's winner: {winner != "0x0000000000000000000000000000000000000000" ? winner : "No entrants :("}</p>
    </div>
  )
}
