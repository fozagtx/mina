import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Mina - Autonomous Memecoin Deployment on Base",
  description:
    "AI agent that detects viral crypto memes on X and launches tokens in 2 minutes. Powered by Chainlink CRE, Claude AI, and Base blockchain.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-primary-dark text-neutral-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
