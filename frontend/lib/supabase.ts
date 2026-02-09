import { createClient } from "@supabase/supabase-js"

export type Launch = {
  id: string
  status: "launched" | "rejected" | "no_outlier"
  tweet_text: string | null
  tweet_views: number | null
  view_multiplier: number | null
  ai_confidence: number | null
  token_name: string | null
  token_symbol: string | null
  risk_level: string | null
  tx_hash: string | null
  token_address: string | null
  chain: string | null
  total_supply: string | null
  created_at: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchLaunches(limit = 50): Promise<Launch[]> {
  const { data, error } = await supabase
    .from("cre_launches")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data as Launch[]) || []
}

export async function fetchStats() {
  const { data, error } = await supabase
    .from("cre_launches")
    .select("status, ai_confidence")

  if (error) throw error

  const launches = data || []
  const total = launches.length
  const launched = launches.filter((l) => l.status === "launched").length
  const rejected = launches.filter((l) => l.status === "rejected").length
  const noOutlier = launches.filter((l) => l.status === "no_outlier").length
  const avgConfidence =
    launches
      .filter((l) => l.ai_confidence !== null)
      .reduce((sum, l) => sum + (l.ai_confidence || 0), 0) /
      (launches.filter((l) => l.ai_confidence !== null).length || 1)

  return {
    total,
    launched,
    rejected,
    noOutlier,
    successRate: total > 0 ? ((launched / total) * 100).toFixed(1) : "0",
    avgConfidence: avgConfidence.toFixed(1),
  }
}
