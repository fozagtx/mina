"use client"

import { useQuery } from "@tanstack/react-query"
import type { Launch } from "@/lib/supabase"

async function getLaunches(): Promise<Launch[]> {
  const res = await fetch("/api/launches?limit=10")
  if (!res.ok) throw new Error("Failed to fetch launches")
  return res.json()
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  launched: { label: "LAUNCHED", color: "text-green-400", bg: "bg-green-500/10" },
  rejected: { label: "REJECTED", color: "text-red-400", bg: "bg-red-500/10" },
  no_outlier: { label: "NO OUTLIER", color: "text-zinc-400", bg: "bg-zinc-500/10" },
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function LaunchFeed() {
  const { data: launches, isLoading } = useQuery({
    queryKey: ["launches-feed"],
    queryFn: getLaunches,
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-zinc-800/50"
          />
        ))}
      </div>
    )
  }

  if (!launches?.length) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-500">
        No activity yet. The CRE workflow will populate this feed.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {launches.map((launch) => {
        const config = statusConfig[launch.status] || statusConfig.no_outlier
        return (
          <div
            key={launch.id}
            className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3"
          >
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.color} ${config.bg}`}
            >
              {config.label}
            </span>

            <div className="min-w-0 flex-1">
              {launch.token_name ? (
                <span className="text-sm font-medium text-zinc-200">
                  {launch.token_name}{" "}
                  <span className="text-zinc-500">
                    ${launch.token_symbol}
                  </span>
                </span>
              ) : (
                <span className="text-sm text-zinc-500">
                  {launch.tweet_text
                    ? launch.tweet_text.substring(0, 60) + "..."
                    : "Pipeline scan"}
                </span>
              )}
            </div>

            {launch.ai_confidence !== null && (
              <span className="text-xs text-zinc-500">
                {launch.ai_confidence}% conf
              </span>
            )}

            <span className="shrink-0 text-xs text-zinc-600">
              {timeAgo(launch.created_at)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
