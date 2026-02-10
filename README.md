# Mina - AI Memecoin Launcher

Autonomous AI agent that detects viral crypto memes on Twitter and deploys memecoin tokens on Base blockchain, powered by Chainlink CRE.

Built for the **Chainlink CRE & AI Hackathon**.

## Architecture

```mermaid
flowchart LR
    subgraph DON["Chainlink DON"]
        direction LR
        A["Cron Trigger\n(2 min)"] --> B["Fetch Tweets\nvia RapidAPI"]
        B --> C["Detect Outlier\n(50x+ views)"]
        C --> D["Claude Analysis\n(confidence)"]
        D --> E["Deploy Token\nFactory on Base"]
        E --> F["Log to Supabase\n(cre_launches)"]
    end

    F --> G["Next.js Dashboard\n(reads Supabase)"]
```

### Pipeline Steps

```mermaid
flowchart TD
    S1["1. Cron trigger fires every 2 min\n(CRE CronCapability)"]
    S2["2. Fetch 100 crypto tweets\n(HTTPClient -> RapidAPI)"]
    S3["3. Detect viral outlier\n(50x+ views vs median)"]
    S4["4. AI analysis via Claude\n(HTTPClient -> Anthropic API)"]
    S5["5. Deploy ERC20 token\n(EVMClient -> Base)"]
    S6["6. Log result to Supabase\n(HTTPClient -> Supabase REST)"]

    S1 --> S2 --> S3 --> S4 --> S5 --> S6
```

### Tech Stack

```mermaid
graph TD
    subgraph Runtime["Workflow Runtime"]
        CRE["Chainlink CRE\n(TypeScript -> WASM via QuickJS)"]
    end

    subgraph Blockchain["Blockchain Layer"]
        SC["Solidity\nERC20 factory + anti-whale"]
        BASE["Base Sepolia / Mainnet"]
    end

    subgraph AI["AI Layer"]
        CLAUDE["Claude Sonnet\n(Anthropic API)"]
    end

    subgraph Data["Data Sources"]
        TWITTER["RapidAPI\nTwitter endpoint"]
        SUPA["Supabase\n(PostgreSQL)"]
    end

    subgraph Frontend["Frontend"]
        NEXT["Next.js 14\nTanStack Query, Tailwind"]
    end

    CRE --> TWITTER
    CRE --> CLAUDE
    CRE --> SC
    SC --> BASE
    CRE --> SUPA
    NEXT --> SUPA
```

## Project Structure

```mermaid
graph TD
    ROOT["mina/"] --> PY["project.yaml"]
    ROOT --> SY["secrets.yaml (gitignored)"]
    ROOT --> VJ["vercel.json"]
    ROOT --> CONTRACTS["contracts/"]
    ROOT --> WORKFLOWS["workflows/"]
    ROOT --> FE["frontend/"]

    CONTRACTS --> HC["hardhat.config.ts"]
    CONTRACTS --> SOL["contracts/MemecoinFactory.sol"]
    CONTRACTS --> SCRIPTS["scripts/deploy.ts"]
    CONTRACTS --> TESTS["test/MemecoinFactory.test.ts"]

    WORKFLOWS --> ML["memecoin-launcher/"]
    ML --> MAIN["main.ts (6-step pipeline)"]
    ML --> WY["workflow.yaml"]
    ML --> CFG["config.json"]

    FE --> APP["app/"]
    APP --> LAYOUT["layout.tsx"]
    APP --> PAGE["page.tsx (landing)"]
    APP --> API["api/launches/route.ts"]
    FE --> COMP["components/launcher/"]
    FE --> LIB["lib/ (Supabase, utils)"]
    FE --> TW["tailwind.config.ts"]
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

### 8. Deploy to Vercel

The project includes a `vercel.json` that points to the `frontend/` directory. To deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from the project root
vercel
```

Set the following environment variables in the Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

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

```mermaid
sequenceDiagram
    participant CRE as CRE Workflow
    participant TW as Twitter (RapidAPI)
    participant AI as Claude AI
    participant BC as Base Blockchain
    participant DB as Supabase
    participant UI as Next.js Dashboard

    CRE->>TW: Fetch 100 crypto tweets
    TW-->>CRE: Tweet data
    CRE->>CRE: Detect viral outlier (50x+ views)
    CRE->>AI: Analyze meme, generate token metadata
    AI-->>CRE: Name, symbol, confidence score
    alt confidence >= 75%
        CRE->>BC: Deploy ERC20 via factory
        BC-->>CRE: Token address, tx hash
    end
    CRE->>DB: Log result (launched / rejected / no_outlier)
    UI->>DB: Poll for new launches
    DB-->>UI: Live feed data
```

## Author

[@fozagtx](https://github.com/fozagtx)

## License

MIT
