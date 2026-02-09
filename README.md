# Mina - AI Memecoin Launcher

Autonomous AI agent that detects viral crypto memes on Twitter and deploys memecoin tokens on Base blockchain, powered by Chainlink CRE.

Built for the **Chainlink CRE & AI Hackathon**.

## Architecture

```
                    Chainlink DON (Decentralized Oracle Network)
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ⏰ Cron        🐦 Fetch         📊 Detect        🧠 Claude         │
│  Trigger ──→  Tweets via  ──→  Outlier    ──→  Analysis    ──→ ...  │
│  (2 min)     RapidAPI          (50x+ views)    (confidence)          │
│                                                                      │
│  ... ──→  🚀 Deploy Token  ──→  💾 Log to Supabase                  │
│           Factory on Base       (cre_launches table)                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌─────────────────────┐
              │  Next.js Dashboard  │
              │  (reads Supabase)   │
              └─────────────────────┘
```

### Pipeline Steps

| Step | Action | Tool |
|------|--------|------|
| 1 | Cron trigger fires every 2 minutes | CRE CronCapability |
| 2 | Fetch 100 crypto tweets | HTTPClient → RapidAPI |
| 3 | Detect viral outlier (50x+ views vs median) | Pure computation |
| 4 | AI analysis via Claude (name, symbol, confidence) | HTTPClient → Anthropic API |
| 5 | Deploy ERC20 token via factory contract | EVMClient → Base |
| 6 | Log result to Supabase | HTTPClient → Supabase REST |

### Tech Stack

| Component | Technology |
|-----------|------------|
| Workflow Runtime | Chainlink CRE (TypeScript → WASM via QuickJS) |
| Smart Contract | Solidity (ERC20 factory + anti-whale) |
| Blockchain | Base Sepolia / Base Mainnet |
| AI Analysis | Claude Sonnet (via Anthropic API) |
| Tweet Source | RapidAPI Twitter endpoint |
| Database | Supabase (PostgreSQL) |
| Frontend | Next.js 14, TanStack Query, Tailwind |

## Project Structure

```
mina/
├── project.yaml                    # CRE project config
├── secrets.yaml                    # Secret declarations (gitignored)
├── contracts/                      # Hardhat project
│   ├── hardhat.config.ts           # Hardhat config (Base Sepolia + Mainnet)
│   ├── package.json
│   ├── tsconfig.json
│   ├── contracts/
│   │   └── MemecoinFactory.sol     # ERC20 factory with anti-whale
│   ├── scripts/
│   │   └── deploy.ts              # Deployment script
│   └── test/
│       └── MemecoinFactory.test.ts # Contract tests
├── workflows/
│   └── memecoin-launcher/
│       ├── main.ts                 # Core CRE workflow (6-step pipeline)
│       ├── workflow.yaml            # Workflow metadata
│       ├── config.json              # Runtime config
│       ├── package.json
│       └── tsconfig.json
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx                # Landing page with pipeline viz
    │   └── api/launches/route.ts
    ├── components/launcher/        # Dashboard components
    ├── lib/                        # Supabase client, utils
    ├── package.json
    └── tailwind.config.ts
```

## Setup

### Prerequisites

- [Bun](https://bun.sh/) runtime
- [CRE CLI](https://docs.chain.link/cre) installed
- Supabase project
- RapidAPI key (Twitter endpoint)
- Anthropic API key
- Base Sepolia RPC URL + funded deployer wallet

### 1. Install dependencies

```bash
# Workflow
cd workflows/memecoin-launcher && bun install

# Contracts
cd contracts && bun install

# Frontend
cd frontend && bun install
```

### 2. Configure secrets

```bash
cp .env.example .env
# Fill in all keys in .env
```

### 3. Compile and test the contracts

```bash
cd contracts
bun run compile
bun run test
```

### 4. Deploy the factory contract

```bash
cd contracts
bun run deploy:sepolia
# Copy the factory address to .env as FACTORY_ADDRESS
```

### 5. Create Supabase table

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE cre_launches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('launched', 'rejected', 'no_outlier')),
  tweet_text TEXT,
  tweet_views BIGINT,
  view_multiplier NUMERIC,
  ai_confidence INTEGER,
  token_name TEXT,
  token_symbol TEXT,
  risk_level TEXT,
  tx_hash TEXT,
  token_address TEXT,
  chain TEXT,
  total_supply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Public read access, service role write
ALTER TABLE cre_launches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON cre_launches
  FOR SELECT USING (true);

CREATE POLICY "Service write" ON cre_launches
  FOR INSERT WITH CHECK (true);
```

### 6. Run the CRE workflow

```bash
cd workflows/memecoin-launcher
cre workflow simulate
```

### 7. Start the dashboard

```bash
cd frontend
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Smart Contract

**MemecoinFactory.sol** deploys `ViralMemecoin` ERC20 tokens with:

- Anti-whale protection: 1% max transfer limit
- On-chain metadata: source tweet ID, AI confidence score, view count
- `TokenCreated` event for indexing
- Owner can remove transfer limits post-launch

## Configuration

**config.json** (workflow runtime):

| Key | Default | Description |
|-----|---------|-------------|
| `schedule` | `*/2 * * * *` | Cron schedule (every 2 min) |
| `outlierMultiplier` | `50` | Views must be 50x above median |
| `confidenceThreshold` | `75` | Minimum AI confidence to launch |
| `defaultTotalSupply` | `1e27` | 1 billion tokens (18 decimals) |

## Demo

1. CRE workflow triggers on cron schedule
2. Fetches 100 crypto tweets, finds viral outlier
3. Claude analyzes the meme and generates token metadata
4. If confidence >= 75%, deploys ERC20 on Base via factory
5. Logs all results to Supabase
6. Dashboard shows live feed of launches

## Author

[@fozagtx](https://github.com/fozagtx)

## License

MIT
