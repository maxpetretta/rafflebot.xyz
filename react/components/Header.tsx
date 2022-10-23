import { ConnectKitButton } from "connectkit"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex justify-between p-6 items-center">
      <Link href="/">
        <a className="text-xl text-white font-semibold rounded-lg p-3 bg-white/25 transition-transform hover:scale-110 ease-in-out">
          🤖 Rafflebot.xyz
        </a>
      </Link>
      <ConnectKitButton />
    </header>
  )
}
