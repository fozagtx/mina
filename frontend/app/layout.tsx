import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Mina - AI Memecoin Launcher",
  description: "Autonomous AI agent that detects viral crypto memes and deploys memecoins on Base via Chainlink CRE",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
