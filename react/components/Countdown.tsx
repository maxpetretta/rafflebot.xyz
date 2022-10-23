import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"
import { rafflebotContract } from "../lib/contract"

import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
dayjs.extend(duration)

export default function Countdown() {
  const [countdown, setCountdown] = useState(0)

  /**
   * Contract hooks
   */
   useContractRead({
    ...rafflebotContract,
    functionName: "getEndTime",
    onSuccess(data) {
      const end = dayjs(Number(data) * 1000)
      const difference = end.diff(dayjs())
      setCountdown(difference)
    },
  })
  
  /**
   * On page load, begin a countdown timer for the raffle
   */
  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(countdown - 1000)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [countdown])

  return (
    <>
      <p>Today&apos;s raffle ends in:</p>
      <h2 className="mt-8 text-center text-5xl font-bold">
        {countdown > 0 && (
          <time className="whitespace-pre">
            {dayjs.duration(countdown).hours() +
              "h  " +
              dayjs.duration(countdown).minutes() +
              "m  " +
              dayjs.duration(countdown).seconds() +
              "s"}
          </time>
        )}
        {countdown <= 0 && <p>Raffle over!</p>}
      </h2>
    </>
  )
}