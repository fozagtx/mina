import { PipelineViz } from "@/components/launcher/pipelineViz"
import { StatsCards } from "@/components/launcher/statsCards"
import { LaunchFeed } from "@/components/launcher/launchFeed"
import { LaunchTable } from "@/components/launcher/launchTable"

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            Mina
          </span>
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          AI Memecoin Launcher powered by Chainlink CRE
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Autonomously detects viral crypto memes on Twitter and deploys
          memecoin tokens on Base
        </p>
      </div>

      {/* Pipeline Visualization */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Pipeline
        </h2>
        <PipelineViz />
      </section>

      {/* Stats */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Stats
        </h2>
        <StatsCards />
      </section>

      {/* Live Feed */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Live Activity
        </h2>
        <LaunchFeed />
      </section>

      {/* Launches Table */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Recent Launches
        </h2>
        <LaunchTable />
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
        <p>
          Built for the Chainlink CRE & AI Hackathon | Runs on Chainlink DON
          → Base
        </p>
      </footer>
    </main>
  )
}
