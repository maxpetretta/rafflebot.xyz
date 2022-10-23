import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { rafflebotContract } from "../lib/contract";

const WorldIDWidget = dynamic<WidgetProps>(() => import("@worldcoin/id").then((mod) => mod.WorldIDWidget), { ssr: false });

export default function Controls(props: { address: string }) {

  /**
   * Contract hooks
   */
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

  return (
    <div className="flex flex-col grow justify-center items-center">
      <WorldIDWidget
        actionId="wid_staging_f54402327ea85df8002901525f197091"
        signal={props.address}
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
  )
}
