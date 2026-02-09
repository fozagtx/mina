import {
  CronCapability,
  HTTPClient,
  EVMClient,
  handler,
  getNetwork,
  hexToBase64,
  bytesToHex,
  TxStatus,
  type Runtime,
  type NodeRuntime,
  Runner,
} from "@chainlink/cre-sdk"
import {
  encodeFunctionData,
  encodeAbiParameters,
  parseAbiParameters,
  parseAbi,
} from "viem"
import { z } from "zod"

// ─── Config ──────────────────────────────────────────────────────────────────

const configSchema = z.object({
  schedule: z.string(),
  chainSelectorName: z.string(),
  factoryAddress: z.string(),
  gasLimit: z.string(),
  twitterSearchUrl: z.string(),
  twitterSearchQuery: z.string(),
  twitterSearchCount: z.number(),
  anthropicApiUrl: z.string(),
  anthropicModel: z.string(),
  outlierMultiplier: z.number(),
  confidenceThreshold: z.number(),
  defaultTotalSupply: z.string(),
  supabaseTable: z.string(),
})

type Config = z.infer<typeof configSchema>

// ─── Types ───────────────────────────────────────────────────────────────────

type Tweet = {
  id: string
  text: string
  views: number
  likes: number
  retweets: number
  author: string
}

type OutlierResult = {
  found: boolean
  tweet: Tweet | null
  medianViews: number
  multiplier: number
}

type ClaudeAnalysis = {
  tokenName: string
  tokenSymbol: string
  confidence: number
  launchRecommendation: boolean
  totalSupply: string
  reasoning: string
  riskLevel: string
}

type LaunchResult = {
  status: "launched" | "rejected" | "no_outlier" | "error"
  tweet: Tweet | null
  analysis: ClaudeAnalysis | null
  txHash: string
  tokenAddress: string
}

// ─── Factory ABI ─────────────────────────────────────────────────────────────

const factoryAbi = parseAbi([
  "function createToken(string name_, string symbol_, uint256 totalSupply_, string sourceTweetId_, uint256 aiConfidence_, uint256 viewCount_) external returns (address)",
])

// ─── Step 1: Fetch Tweets ────────────────────────────────────────────────────

const fetchTweets = (nodeRuntime: NodeRuntime<Config>): Tweet[] => {
  const httpClient = new HTTPClient()
  const secrets = nodeRuntime.secrets

  const searchUrl = `${nodeRuntime.config.twitterSearchUrl}?query=${encodeURIComponent(nodeRuntime.config.twitterSearchQuery)}&count=${nodeRuntime.config.twitterSearchCount}`

  const resp = httpClient
    .sendRequest(nodeRuntime, {
      url: searchUrl,
      method: "GET" as const,
      headers: {
        "x-rapidapi-key": secrets.get("RAPID_API_KEY") || "",
        "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
      },
    })
    .result()

  if (resp.statusCode !== 200) {
    throw new Error(`Twitter API returned status ${resp.statusCode}`)
  }

  const bodyText = new TextDecoder().decode(resp.body)
  const data = JSON.parse(bodyText)

  const tweets: Tweet[] = []
  const timeline = data.timeline || data.results || []

  for (const entry of timeline) {
    const tweet = entry.tweet || entry
    if (!tweet.text) continue

    tweets.push({
      id: tweet.rest_id || tweet.id || "",
      text: tweet.text || "",
      views: Number(tweet.views?.count || tweet.view_count || 0),
      likes: Number(tweet.favorite_count || tweet.likes || 0),
      retweets: Number(tweet.retweet_count || tweet.retweets || 0),
      author: tweet.user?.screen_name || tweet.author || "unknown",
    })
  }

  return tweets
}

// ─── Step 2: Detect Outlier ──────────────────────────────────────────────────

const detectOutlier = (
  tweets: Tweet[],
  multiplierThreshold: number
): OutlierResult => {
  if (tweets.length === 0) {
    return { found: false, tweet: null, medianViews: 0, multiplier: 0 }
  }

  // Calculate median views
  const viewCounts = tweets
    .map((t) => t.views)
    .filter((v) => v > 0)
    .sort((a, b) => a - b)

  if (viewCounts.length === 0) {
    return { found: false, tweet: null, medianViews: 0, multiplier: 0 }
  }

  const mid = Math.floor(viewCounts.length / 2)
  const medianViews =
    viewCounts.length % 2 === 0
      ? (viewCounts[mid - 1] + viewCounts[mid]) / 2
      : viewCounts[mid]

  // Find tweet with highest views-to-median ratio
  let bestTweet: Tweet | null = null
  let bestMultiplier = 0

  for (const tweet of tweets) {
    if (tweet.views <= 0 || medianViews <= 0) continue
    const mult = tweet.views / medianViews
    if (mult > bestMultiplier) {
      bestMultiplier = mult
      bestTweet = tweet
    }
  }

  if (bestMultiplier >= multiplierThreshold && bestTweet) {
    return {
      found: true,
      tweet: bestTweet,
      medianViews,
      multiplier: bestMultiplier,
    }
  }

  return { found: false, tweet: null, medianViews, multiplier: bestMultiplier }
}

// ─── Step 3: Analyze with Claude ─────────────────────────────────────────────

const analyzeWithClaude = (
  nodeRuntime: NodeRuntime<Config>,
  tweet: Tweet,
  multiplier: number
): ClaudeAnalysis => {
  const httpClient = new HTTPClient()
  const secrets = nodeRuntime.secrets

  const prompt = `You are an AI memecoin analyst. Analyze this viral crypto tweet and decide if it should become a memecoin token.

Tweet: "${tweet.text}"
Author: @${tweet.author}
Views: ${tweet.views}
Likes: ${tweet.likes}
Retweets: ${tweet.retweets}
Virality multiplier: ${multiplier.toFixed(1)}x above median

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "tokenName": "string - creative memecoin name based on the tweet meme",
  "tokenSymbol": "string - 3-5 char ticker symbol",
  "confidence": number 0-100,
  "launchRecommendation": boolean,
  "totalSupply": "string - total supply in wei (default 1000000000000000000000000000 = 1B tokens)",
  "reasoning": "string - brief analysis",
  "riskLevel": "low|medium|high"
}`

  const requestBody = JSON.stringify({
    model: nodeRuntime.config.anthropicModel,
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  })

  const resp = httpClient
    .sendRequest(nodeRuntime, {
      url: nodeRuntime.config.anthropicApiUrl,
      method: "POST" as const,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secrets.get("ANTHROPIC_API_KEY") || "",
        "anthropic-version": "2023-06-01",
      },
      body: new TextEncoder().encode(requestBody),
    })
    .result()

  if (resp.statusCode !== 200) {
    throw new Error(`Anthropic API returned status ${resp.statusCode}`)
  }

  const bodyText = new TextDecoder().decode(resp.body)
  const apiResponse = JSON.parse(bodyText)
  const content = apiResponse.content?.[0]?.text || ""

  return JSON.parse(content) as ClaudeAnalysis
}

// ─── Step 4: Deploy Token ────────────────────────────────────────────────────

const deployToken = (
  runtime: Runtime<Config>,
  analysis: ClaudeAnalysis,
  tweet: Tweet
): { txHash: string } => {
  const network = getNetwork({
    chainFamily: "evm",
    chainSelectorName: runtime.config.chainSelectorName,
    isTestnet: true,
  })

  if (!network) {
    throw new Error(
      `Network not found: ${runtime.config.chainSelectorName}`
    )
  }

  const evmClient = new EVMClient(network.chainSelector.selector)

  const totalSupply = BigInt(
    analysis.totalSupply || runtime.config.defaultTotalSupply
  )

  // Encode the createToken call
  const callData = encodeFunctionData({
    abi: factoryAbi,
    functionName: "createToken",
    args: [
      analysis.tokenName,
      analysis.tokenSymbol,
      totalSupply,
      tweet.id,
      BigInt(analysis.confidence),
      BigInt(tweet.views),
    ],
  })

  // Encode the report payload
  const reportData = encodeAbiParameters(
    parseAbiParameters("bytes callData"),
    [callData as `0x${string}`]
  )

  const reportResponse = runtime
    .report({
      encodedPayload: hexToBase64(reportData),
      encoderName: "evm",
      signingAlgo: "ecdsa",
      hashingAlgo: "keccak256",
    })
    .result()

  const writeResult = evmClient
    .writeReport(runtime, {
      receiver: runtime.config.factoryAddress,
      report: reportResponse,
      gasConfig: {
        gasLimit: runtime.config.gasLimit,
      },
    })
    .result()

  if (writeResult.txStatus === TxStatus.SUCCESS) {
    const txHash = bytesToHex(writeResult.txHash || new Uint8Array(32))
    runtime.log(`Token deployed! TX: ${txHash}`)
    return { txHash }
  }

  throw new Error(`Token deploy failed with status: ${writeResult.txStatus}`)
}

// ─── Step 5: Log to Supabase ─────────────────────────────────────────────────

const logToSupabase = (
  nodeRuntime: NodeRuntime<Config>,
  result: LaunchResult
): void => {
  const httpClient = new HTTPClient()
  const secrets = nodeRuntime.secrets
  const supabaseUrl = secrets.get("SUPABASE_URL") || ""
  const supabaseKey = secrets.get("SUPABASE_ANON_KEY") || ""

  const row = {
    status: result.status,
    tweet_text: result.tweet?.text || null,
    tweet_views: result.tweet?.views || null,
    view_multiplier: result.tweet ? result.tweet.views : null,
    ai_confidence: result.analysis?.confidence || null,
    token_name: result.analysis?.tokenName || null,
    token_symbol: result.analysis?.tokenSymbol || null,
    risk_level: result.analysis?.riskLevel || null,
    tx_hash: result.txHash || null,
    token_address: result.tokenAddress || null,
    chain: nodeRuntime.config.chainSelectorName,
    total_supply: result.analysis?.totalSupply || null,
  }

  const requestBody = JSON.stringify(row)

  httpClient
    .sendRequest(nodeRuntime, {
      url: `${supabaseUrl}/rest/v1/${nodeRuntime.config.supabaseTable}`,
      method: "POST" as const,
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: new TextEncoder().encode(requestBody),
    })
    .result()
}

// ─── Main Pipeline ───────────────────────────────────────────────────────────

const onCronTrigger = (runtime: Runtime<Config>): string => {
  runtime.log("=== Memecoin Launcher Pipeline Start ===")

  // Step 1: Fetch tweets (runs in node mode for HTTP access)
  const tweets = runtime
    .runInNodeMode(fetchTweets, { mode: "first" as any })()
    .result()

  runtime.log(`Fetched ${tweets.length} tweets`)

  // Step 2: Detect outlier (pure computation, runs in consensus)
  const outlier = detectOutlier(tweets, runtime.config.outlierMultiplier)

  if (!outlier.found || !outlier.tweet) {
    runtime.log(
      `No outlier found. Best multiplier: ${outlier.multiplier.toFixed(1)}x (threshold: ${runtime.config.outlierMultiplier}x)`
    )

    // Log the no-outlier result
    runtime.runInNodeMode(
      (nr: NodeRuntime<Config>) => {
        logToSupabase(nr, {
          status: "no_outlier",
          tweet: null,
          analysis: null,
          txHash: "",
          tokenAddress: "",
        })
        return "logged"
      },
      { mode: "first" as any }
    )().result()

    return "no_outlier"
  }

  runtime.log(
    `Outlier found! "${outlier.tweet.text.substring(0, 50)}..." - ${outlier.multiplier.toFixed(1)}x multiplier`
  )

  // Step 3: Analyze with Claude (runs in node mode for HTTP)
  const analysis = runtime
    .runInNodeMode(
      (nr: NodeRuntime<Config>) =>
        analyzeWithClaude(nr, outlier.tweet!, outlier.multiplier),
      { mode: "first" as any }
    )()
    .result()

  runtime.log(
    `Claude analysis: ${analysis.tokenName} ($${analysis.tokenSymbol}) - Confidence: ${analysis.confidence}%`
  )

  // Step 4: Decision gate
  if (
    analysis.confidence < runtime.config.confidenceThreshold ||
    !analysis.launchRecommendation
  ) {
    runtime.log(
      `Rejected: confidence=${analysis.confidence}%, recommendation=${analysis.launchRecommendation}`
    )

    runtime.runInNodeMode(
      (nr: NodeRuntime<Config>) => {
        logToSupabase(nr, {
          status: "rejected",
          tweet: outlier.tweet,
          analysis,
          txHash: "",
          tokenAddress: "",
        })
        return "logged"
      },
      { mode: "first" as any }
    )().result()

    return "rejected"
  }

  // Step 5: Deploy token on-chain
  runtime.log("Deploying token on-chain...")
  const { txHash } = deployToken(runtime, analysis, outlier.tweet)

  // Step 6: Log success to Supabase
  runtime.runInNodeMode(
    (nr: NodeRuntime<Config>) => {
      logToSupabase(nr, {
        status: "launched",
        tweet: outlier.tweet,
        analysis,
        txHash,
        tokenAddress: "", // Extracted from event logs post-deploy
      })
      return "logged"
    },
    { mode: "first" as any }
  )().result()

  runtime.log(
    `=== Launch Complete: ${analysis.tokenName} ($${analysis.tokenSymbol}) TX: ${txHash} ===`
  )

  return `launched:${txHash}`
}

// ─── Workflow Init ───────────────────────────────────────────────────────────

const initWorkflow = (config: Config) => {
  const cron = new CronCapability()

  return [
    handler(
      cron.trigger({ schedule: config.schedule }),
      onCronTrigger
    ),
  ]
}

export async function main() {
  const runner = await Runner.newRunner<Config>()
  await runner.run(initWorkflow)
}
