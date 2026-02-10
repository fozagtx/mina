import { PipelineViz } from "@/components/launcher/pipelineViz"
import { StatsCards } from "@/components/launcher/statsCards"
import { LaunchFeed } from "@/components/launcher/launchFeed"
import { LaunchTable } from "@/components/launcher/launchTable"
import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-primary-electric"
          >
            &larr; Back to Home
          </Link>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
            <span className="text-gradient">Mina</span>
            <span className="ml-3 text-lg font-normal text-neutral-400">
              Live Dashboard
            </span>
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Real-time view of the autonomous memecoin deployment pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-blink-dot rounded-full bg-primary-electric" />
          <span className="font-mono text-xs text-primary-electric">LIVE</span>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-medium uppercase tracking-wider text-neutral-400">
          Pipeline
        </h2>
        <PipelineViz />
      </section>

      {/* Stats */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-medium uppercase tracking-wider text-neutral-400">
          Stats
        </h2>
        <StatsCards />
      </section>

      {/* Live Feed */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-medium uppercase tracking-wider text-neutral-400">
          Live Activity
        </h2>
        <LaunchFeed />
      </section>

      {/* Launches Table */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-sm font-medium uppercase tracking-wider text-neutral-400">
          Recent Launches
        </h2>
        <LaunchTable />
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-700 pt-8 text-center text-sm text-neutral-500">
        <p>
          Built for the Chainlink CRE &amp; AI Hackathon | Runs on Chainlink
          DON &rarr; Base
        </p>
      </footer>
    </main>
  )
}
