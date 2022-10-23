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
    }
  })

  return (
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
  )
}
