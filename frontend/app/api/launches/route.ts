import { NextResponse } from "next/server"
import { fetchLaunches, fetchStats } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (type === "stats") {
    const stats = await fetchStats()
    return NextResponse.json(stats)
  }

  const limit = Number(searchParams.get("limit") || "50")
  const launches = await fetchLaunches(limit)
  return NextResponse.json(launches)
}
