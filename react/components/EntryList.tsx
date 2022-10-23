import { useState } from "react"
import { useContractEvent, useContractRead } from "wagmi"
import { rafflebotContract } from "../lib/contract"

export default function EntryList() {
  const [entrants, setEntrants] = useState<Set<string>>()

  /**
   * Contract hooks
   */
  useContractRead({
    ...rafflebotContract,
    functionName: "getEntrants",
    onSuccess(data) {
      setEntrants(new Set(data as string[]))
    },
  })

  useContractEvent({
    ...rafflebotContract,
    eventName: "NewEntry",
    listener: (event) => {
      if (event[0]) {
        let newState = new Set(entrants)
        newState.add(event[0])
        setEntrants(newState)
      }
    }
  })

  return (
    <div className="mt-6 h-44 overflow-y-scroll rounded-lg border-2 border-white/30 bg-white/30">
      {entrants &&
        [...entrants].map((entry) => {
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
        (entrants.size == 0 && (
          <div className="border-b border-white p-4">
            <p>No entries yet...</p>
          </div>
        ))}
    </div>
  )
}
