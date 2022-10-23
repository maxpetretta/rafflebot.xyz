import { WidgetProps } from "@worldcoin/id"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { rafflebotContract } from "../lib/contract"

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
)

export default function Controls(props: { address: string }) {
  const [isHuman, setIsHuman] = useState(false)

  /**
   * Contract hooks
   */
  const { config: enterConfig } = usePrepareContractWrite({
    ...rafflebotContract,
    functionName: "enter",
  })
  const { write: enter } = useContractWrite({
    ...enterConfig,
    onSuccess(data) {
      console.debug("Entered raffle --", data)
    },
    onError(error) {
      console.error("Transaction failed --", error)
    },
  })

  const { config: endConfig } = usePrepareContractWrite({
    ...rafflebotContract,
    functionName: "end",
  })
  const { write: end } = useContractWrite({
    ...endConfig,
    onSuccess(data) {
      console.debug("Ended raffle --", data)
    },
    onError(error) {
      console.error("Transaction failed --", error)
    },
  })

  /**
   * Prove that the user is a unique human, using WorldID
   * 
   * Note: In a production version of this app, this simple check would not be sufficient.  The preference would be either:
   *    - Send the WorldID response to a backend service, which would handle the raffle registration itself
   *    - Pass the WorldID response to the smart contract, which could perform the proof-of-personhood verification on-chain
   * Since this is an MVP, skipping for now
   * 
   * @param response 
   */
  const proveHumanity = async (response: any) => {
    console.debug(response)
    setIsHuman(true)
  }

  return (
    <div className="flex grow flex-col items-center justify-center">
      <WorldIDWidget
        actionId="wid_staging_f54402327ea85df8002901525f197091"
        signal={props.address}
        signalDescription="Enter the current daily raffle for a free NFT!"
        enableTelemetry
        onSuccess={(response) => proveHumanity(response)}
        onError={(error) => console.error(error)}
        debug={true}
      />
      <button
        className="mt-2 rounded-lg bg-gradient-to-r from-[#fe6849] to-[#4a40df] p-0.5 disabled:opacity-60"
        disabled={!isHuman}
        onClick={() => enter?.()}
      >
        <span className="block w-[295px] rounded-lg bg-white p-3 font-semibold text-black">
          Enter Raffle
        </span>
      </button>
      <button
        className="mt-2 rounded-lg bg-gradient-to-r from-[#fe6849] to-[#4a40df] p-0.5 disabled:opacity-60"
        disabled={!isHuman}
        onClick={() => end?.()}
      >
        <span className="block w-[295px] rounded-lg bg-white p-3 font-semibold text-black">
          End Raffle
        </span>
      </button>
    </div>
  )
}
