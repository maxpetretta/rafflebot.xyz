import { useState } from "react"
import { useContractRead } from "wagmi"
import { rafflebotContract } from "../lib/contract"

export default function Winner(props: { raffleID: string }) {
  const [winner, setWinner] = useState("")

  /**
   * Contract hooks
   */
  useContractRead({
    ...rafflebotContract,
    functionName: "getWinner",
    args: [Number(props.raffleID) > 0 ? Number(props.raffleID) - 1 : 0],
    onSuccess(data) {
      setWinner(String(data))
    },
  })

  return (
    <div className="mt-6 rounded-lg border-2 border-white/30 bg-yellow-500/50 p-4">
      <p className="font-semibold">
        Yesterday&apos;s winner:{" "}
        {winner != "0x0000000000000000000000000000000000000000"
          ? winner
          : "No entrants :("}
      </p>
    </div>
  )
}
