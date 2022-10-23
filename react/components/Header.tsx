import { ConnectKitButton } from "connectkit"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Link href="/">
        <a className="rounded-lg bg-white/25 p-3 text-xl font-semibold text-white transition-transform ease-in-out hover:scale-110">
          🤖 Rafflebot.xyz
        </a>
      </Link>
      <ConnectKitButton />
    </header>
  )
}
