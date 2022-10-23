import { useState } from "react"
import { useContractRead } from "wagmi"
import { rafflebotContract } from "../lib/contract"

export default function EntryList() {
  const [entrants, setEntrants] = useState<string[]>()

  /**
   * Contract hooks
   */
  useContractRead({
    ...rafflebotContract,
    functionName: "getEntrants",
    onSuccess(data) {
      setEntrants(data as string[])
    },
  })

  return (
    <div className="mt-6 h-44 overflow-y-scroll rounded-lg border-2 border-white/30 bg-white/30">
      {entrants &&
        entrants.map((entry) => {
          return (
            <div
              key={entry}
              className="border-b border-white p-4 text-center font-medium"
            >
              {entry}
            </div>
          )
        })}
      {!entrants ||
        (entrants.length == 0 && (
          <div className="border-b border-white p-4">
            <p>No entries yet...</p>
          </div>
        ))}
    </div>
  )
}
