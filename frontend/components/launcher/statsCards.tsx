"use client"

import { useQuery } from "@tanstack/react-query"

type Stats = {
  total: number
  launched: number
  rejected: number
  noOutlier: number
  successRate: string
  avgConfidence: string
}

async function getStats(): Promise<Stats> {
  const res = await fetch("/api/launches?type=stats")
  if (!res.ok) throw new Error("Failed to fetch stats")
  return res.json()
}

export function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["launch-stats"],
    queryFn: getStats,
  })

  const cards = [
    {
      label: "Total Runs",
      value: stats?.total ?? 0,
      color: "text-brand-400",
    },
    {
      label: "Tokens Launched",
      value: stats?.launched ?? 0,
      color: "text-green-400",
    },
    {
      label: "Success Rate",
      value: `${stats?.successRate ?? 0}%`,
      color: "text-amber-400",
    },
    {
      label: "Avg Confidence",
      value: `${stats?.avgConfidence ?? 0}%`,
      color: "text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
        >
          <div className="text-xs text-zinc-500">{card.label}</div>
          <div className={`mt-1 text-2xl font-bold ${card.color}`}>
            {isLoading ? "..." : card.value}
          </div>
        </div>
      ))}
    </div>
  )
}
