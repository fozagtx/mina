"use client"

import { useQuery } from "@tanstack/react-query"
import type { Launch } from "@/lib/supabase"

async function getLaunches(): Promise<Launch[]> {
  const res = await fetch("/api/launches?limit=20")
  if (!res.ok) throw new Error("Failed to fetch launches")
  return res.json()
}

function truncate(str: string | null, len: number): string {
  if (!str) return "-"
  return str.length > len ? str.substring(0, len) + "..." : str
}

function formatNumber(num: number | null): string {
  if (num === null) return "-"
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

function basescanLink(hash: string | null): string | null {
  if (!hash) return null
  return `https://sepolia.basescan.org/tx/${hash}`
}

export function LaunchTable() {
  const { data: launches, isLoading } = useQuery({
    queryKey: ["launches-table"],
    queryFn: getLaunches,
  })

  const launched = launches?.filter((l) => l.status === "launched") || []

  if (isLoading) {
    return (
      <div className="h-48 animate-pulse rounded-xl bg-zinc-800/50" />
    )
  }

  if (!launched.length) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-500">
        No tokens launched yet.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-800 bg-zinc-900/80">
          <tr>
            <th className="px-4 py-3 font-medium text-zinc-400">Token</th>
            <th className="px-4 py-3 font-medium text-zinc-400">Symbol</th>
            <th className="px-4 py-3 font-medium text-zinc-400">
              Confidence
            </th>
            <th className="px-4 py-3 font-medium text-zinc-400">
              Tweet Views
            </th>
            <th className="px-4 py-3 font-medium text-zinc-400">Risk</th>
            <th className="px-4 py-3 font-medium text-zinc-400">TX</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {launched.map((launch) => (
            <tr
              key={launch.id}
              className="bg-zinc-900/30 transition-colors hover:bg-zinc-800/30"
            >
              <td className="px-4 py-3 font-medium text-zinc-200">
                {truncate(launch.token_name, 20)}
              </td>
              <td className="px-4 py-3 text-brand-400">
                ${launch.token_symbol}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    (launch.ai_confidence || 0) >= 80
                      ? "text-green-400"
                      : "text-amber-400"
                  }
                >
                  {launch.ai_confidence}%
                </span>
              </td>
              <td className="px-4 py-3 text-zinc-400">
                {formatNumber(launch.tweet_views)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    launch.risk_level === "low"
                      ? "text-green-400"
                      : launch.risk_level === "medium"
                        ? "text-amber-400"
                        : "text-red-400"
                  }
                >
                  {launch.risk_level || "-"}
                </span>
              </td>
              <td className="px-4 py-3">
                {launch.tx_hash ? (
                  <a
                    href={basescanLink(launch.tx_hash)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 hover:underline"
                  >
                    {launch.tx_hash.substring(0, 10)}...
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
