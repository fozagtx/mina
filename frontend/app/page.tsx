"use client"

import Link from "next/link"
import { useState } from "react"

/* ────────────────────────────────────────────
   SVG Icon Components (line-art style)
   ──────────────────────────────────────────── */

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function BarChartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a5 5 0 0 1 5 5c0 1.5-.7 2.9-1.8 3.8A5 5 0 0 1 17 15a5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 1.8-4.2A5 5 0 0 1 7 7a5 5 0 0 1 5-5z" />
      <path d="M12 2v20" />
      <path d="M8 8h8" />
      <path d="M9 14h6" />
    </svg>
  )
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

/* ────────────────────────────────────────────
   FAQ Item Component
   ──────────────────────────────────────────── */

function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-neutral-700">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-display text-sm font-medium text-neutral-100 sm:text-base">
          {question}
        </span>
        <ChevronIcon
          className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm leading-relaxed text-neutral-300">
          {answer}
        </div>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────
   Navigation
   ──────────────────────────────────────────── */

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-700/50 bg-primary-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5 text-primary-electric" />
          <span className="font-display text-lg font-bold text-gradient-mint">
            MINA
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#pipeline"
            className="font-display text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-primary-electric"
          >
            Pipeline
          </a>
          <a
            href="#tech"
            className="font-display text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-primary-electric"
          >
            Tech Stack
          </a>
          <a
            href="#features"
            className="font-display text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-primary-electric"
          >
            Features
          </a>
          <a
            href="#faq"
            className="font-display text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-primary-electric"
          >
            FAQ
          </a>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-cta px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-primary-dark transition-shadow hover:shadow-glow"
        >
          Dashboard
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </nav>
  )
}

/* ────────────────────────────────────────────
   Hero Section
   ──────────────────────────────────────────── */

function HeroSection() {
  const stats = [
    { value: "48", label: "Tokens Launched" },
    { value: "127K", label: "Tweets Analyzed" },
    { value: "2.3M", label: "Combined Supply" },
    { value: "<1 min", label: "Avg Deploy Time" },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background grid effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 157, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Live indicator */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-electric/20 bg-primary-electric/5 px-4 py-1.5">
            <span className="inline-block h-2 w-2 animate-blink-dot rounded-full bg-primary-electric" />
            <span className="font-mono text-xs text-primary-electric">
              PIPELINE ACTIVE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl md:text-7xl">
            <span className="text-gradient">Autonomous Memecoin</span>
            <br />
            <span className="text-neutral-100">Deployment on Base</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl">
            AI agent that detects viral crypto memes on X and launches tokens in
            2 minutes. No human intervention. Just pure algorithmic alpha.
          </p>

          {/* Supporting copy */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400">
            Every 2 minutes, Mina scans 100 crypto tweets, identifies 50x viral
            outliers, analyzes with OpenAI, and deploys ERC20 tokens on Base.
            Powered by Chainlink CRE. Built for degens who move at the speed of
            memes.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-cta px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-dark transition-all hover:shadow-glow"
            >
              View Live Launches
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#pipeline"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-cyber/30 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-cyber transition-all hover:border-primary-cyber/60 hover:bg-primary-cyber/5"
            >
              Watch the Pipeline
            </a>
          </div>
        </div>

        {/* Live stats row */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-neutral-600/30 bg-neutral-800/50 p-4 text-center backdrop-blur-sm"
            >
              <div className="font-mono text-2xl font-bold text-primary-electric sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Pipeline Section
   ──────────────────────────────────────────── */

function PipelineSection() {
  const steps = [
    {
      icon: ClockIcon,
      title: "Cron Trigger",
      body: "Every 2 minutes, Chainlink's Decentralized Oracle Network activates the pipeline. Consistent. Relentless. Automated.",
      color: "text-primary-cyber",
      borderColor: "border-primary-cyber/30",
      bgColor: "bg-primary-cyber/5",
    },
    {
      icon: TwitterIcon,
      title: "Tweet Ingestion",
      body: "RapidAPI pulls 100 fresh crypto tweets. Real-time data from the source where memes become money.",
      color: "text-primary-cyber",
      borderColor: "border-primary-cyber/30",
      bgColor: "bg-primary-cyber/5",
    },
    {
      icon: BarChartIcon,
      title: "Outlier Detection",
      body: "Pure math identifies viral outliers\u2014tweets with 50x+ views vs. median. If it's trending, we catch it.",
      color: "text-accent-warning",
      borderColor: "border-accent-warning/30",
      bgColor: "bg-accent-warning/5",
    },
    {
      icon: BrainIcon,
      title: "OpenAI Analysis",
      body: "GPT-4o analyzes meme potential, generates token name/symbol, and assigns confidence score (0\u2013100).",
      color: "text-accent-openai",
      borderColor: "border-accent-openai/30",
      bgColor: "bg-accent-openai/5",
    },
    {
      icon: RocketIcon,
      title: "Smart Contract Deploy",
      body: "If confidence \u226575%, ERC20 token deploys instantly via MemecoinFactory on Base. Anti-whale protection included.",
      color: "text-primary-electric",
      borderColor: "border-primary-electric/30",
      bgColor: "bg-primary-electric/5",
    },
    {
      icon: DatabaseIcon,
      title: "Logging & Tracking",
      body: "All launches, rejections, and metrics logged to Supabase. Full transparency. Full audit trail.",
      color: "text-accent-green",
      borderColor: "border-accent-green/30",
      bgColor: "bg-accent-green/5",
    },
  ]

  return (
    <section id="pipeline" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-primary-electric">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Six-Step Autonomous Pipeline
          </h2>
          <p className="mt-4 text-neutral-400">
            From viral tweet to deployed token in under 120 seconds. Zero human
            interference.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="card-base p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${step.bgColor} ${step.borderColor} border`}
                  >
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <div>
                    <div className="mb-1 font-mono text-xs text-neutral-500">
                      STEP {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display text-base font-semibold text-neutral-100">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                  {step.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Tech Stack Section
   ──────────────────────────────────────────── */

function TechStackSection() {
  const techs = [
    {
      icon: LinkIcon,
      title: "Chainlink CRE",
      body: "Decentralized oracle network running the entire workflow. TypeScript compiled to WASM via QuickJS. No centralized servers. No single point of failure.",
    },
    {
      icon: CubeIcon,
      title: "Base Blockchain",
      body: "Lightning-fast L2 with near-zero gas fees. Your memes deserve speed. Mainnet ready, Sepolia tested.",
    },
    {
      icon: BrainIcon,
      title: "OpenAI GPT-4o",
      body: "State-of-the-art GPT-4o analyzes tweet sentiment, virality signals, and meme quality. The brain behind the tokens.",
    },
    {
      icon: CodeIcon,
      title: "Solidity Smart Contracts",
      body: "MemecoinFactory with built-in anti-whale mechanics (1% max transfer). Ownership control. Battle-tested code.",
    },
    {
      icon: DatabaseIcon,
      title: "Supabase PostgreSQL",
      body: "Enterprise-grade database tracking every launch, rejection, and metric. Public read access. Real-time queries.",
    },
    {
      icon: MonitorIcon,
      title: "Next.js Dashboard",
      body: "Modern frontend with TanStack Query for reactive data. See launches the moment they hit the blockchain.",
    },
  ]

  return (
    <section
      id="tech"
      className="border-y border-neutral-700/30 bg-neutral-900/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-primary-cyber">
            Infrastructure
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Built on Bulletproof Infrastructure
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techs.map((tech) => {
            const Icon = tech.icon
            return (
              <div key={tech.title} className="card-base p-6">
                <Icon className="mb-4 h-6 w-6 text-primary-cyber" />
                <h3 className="font-display text-base font-semibold text-neutral-100">
                  {tech.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {tech.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Features Section
   ──────────────────────────────────────────── */

function FeaturesSection() {
  const features = [
    {
      icon: ShieldIcon,
      title: "Anti-Whale Protection",
      body: "Every token launches with 1% max transfer limit. Prevents early whales from dumping. Owner can remove limits post-stabilization.",
    },
    {
      icon: LinkIcon,
      title: "On-Chain Metadata",
      body: "Source tweet ID, AI confidence score, and view count permanently stored on-chain. Full transparency.",
    },
    {
      icon: ZapIcon,
      title: "Real-Time Indexing",
      body: "TokenCreated events emit instantly. Track your launches across block explorers. No delays.",
    },
    {
      icon: FilterIcon,
      title: "Confidence Filtering",
      body: "Only tokens with \u226575% AI confidence deploy. Quality over quantity. We don't launch garbage.",
    },
    {
      icon: MonitorIcon,
      title: "Live Dashboard",
      body: "Watch the pipeline in real-time. See tweets analyzed, outliers detected, and tokens launched. No refresh needed.",
    },
    {
      icon: FileTextIcon,
      title: "Full Audit Trail",
      body: "Every decision logged: launched, rejected, no_outlier. View multipliers, AI scores, and transaction hashes for complete transparency.",
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-primary-electric">
            Capabilities
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Designed for Speed, Built for Trust
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="card-base p-6">
                <Icon className="mb-4 h-6 w-6 text-primary-electric" />
                <h3 className="font-display text-base font-semibold text-neutral-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {feature.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Stats Section
   ──────────────────────────────────────────── */

function StatsSection() {
  const stats = [
    { value: "2 MIN", label: "Pipeline Cycle Time" },
    { value: "50X", label: "Minimum Outlier Multiplier" },
    { value: "75%", label: "AI Confidence Threshold" },
    { value: "1B", label: "Default Token Supply" },
    { value: "1%", label: "Max Transfer (Anti-Whale)" },
    { value: "100%", label: "Uptime (Chainlink DON)" },
  ]

  return (
    <section className="border-y border-neutral-700/30 bg-neutral-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-accent-warning">
            Metrics
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            By the Numbers
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-neutral-600/30 bg-neutral-800/40 p-6 text-center"
            >
              <div className="font-mono text-3xl font-bold text-primary-electric sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Use Cases Section
   ──────────────────────────────────────────── */

function UseCasesSection() {
  const cases = [
    {
      icon: ZapIcon,
      headline: "First to Market = Alpha",
      body: "Catch viral memes before they explode. Automated deployment means you're in before the hype peaks. Speed is everything in crypto.",
      tag: "Degen Traders",
    },
    {
      icon: SearchIcon,
      headline: "Study What Works",
      body: "Analyze which memes translate to successful tokens. Full historical data. Perfect for backtesting strategies.",
      tag: "Memecoin Researchers",
    },
    {
      icon: CodeIcon,
      headline: "Learn from Autonomous Systems",
      body: "Reference architecture for AI + blockchain integration. Open-source. Fork it. Build on it.",
      tag: "DeFi Builders",
    },
    {
      icon: TerminalIcon,
      headline: "See CRE in Production",
      body: "Real-world example of Chainlink Compute Runtime Environment powering complex workflows. Not just theory\u2014actual working code.",
      tag: "Chainlink Developers",
    },
  ]

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-accent-openai">
            Audience
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Who Uses Mina?
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {cases.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.headline} className="card-base p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent-openai" />
                  <span className="rounded-full border border-accent-openai/20 bg-accent-openai/5 px-3 py-0.5 font-mono text-xs text-accent-openai">
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-neutral-100">
                  {c.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {c.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Architecture Section
   ──────────────────────────────────────────── */

function ArchitectureSection() {
  const steps = [
    { num: "01", text: "Cron trigger activates every 2 minutes" },
    { num: "02", text: "HTTP client fetches tweets via RapidAPI" },
    { num: "03", text: "Pure computation detects 50x+ outlier" },
    { num: "04", text: "HTTP client calls OpenAI API for analysis" },
    { num: "05", text: "EVM client deploys token to Base blockchain" },
    { num: "06", text: "HTTP client logs results to Supabase" },
  ]

  return (
    <section className="border-y border-neutral-700/30 bg-neutral-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-primary-electric">
            Architecture
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Decentralized from the Ground Up
          </h2>
          <p className="mt-4 text-neutral-400">
            The entire pipeline runs inside Chainlink&apos;s Decentralized
            Oracle Network.
          </p>
        </div>

        {/* Terminal-style architecture diagram */}
        <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-neutral-600/30 bg-neutral-900 p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-accent-warning/60" />
            <span className="h-3 w-3 rounded-full bg-primary-electric/60" />
            <span className="ml-3 font-mono text-xs text-neutral-500">
              chainlink-don://mina-pipeline
            </span>
          </div>

          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <span className="font-mono text-xs text-primary-electric">
                  {step.num}
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {" > "}
                </span>
                <span className="font-mono text-sm text-neutral-200">
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-neutral-700 pt-4">
            <p className="font-mono text-xs text-neutral-500">
              Zero centralized servers. Zero human intervention. Pure
              automation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   FAQ Section
   ──────────────────────────────────────────── */

function FAQSection() {
  const faqs = [
    {
      q: "How do you prevent spam or malicious tokens?",
      a: "Two-layer filter: (1) 50x outlier detection ensures only genuinely viral tweets qualify, and (2) AI confidence threshold of 75%+ filters low-quality memes. Plus all metadata is on-chain for transparency.",
    },
    {
      q: "What happens if a tweet isn't viral enough?",
      a: 'Pipeline logs it as "no_outlier" and moves on. No token deployed. All decisions tracked in Supabase.',
    },
    {
      q: "Can I customize the confidence threshold?",
      a: "Yes. Config.json lets you adjust outlierMultiplier, confidenceThreshold, and defaultTotalSupply.",
    },
    {
      q: "Is this audited?",
      a: "Smart contracts are testnet-proven with comprehensive test suite. Full code available on GitHub. Mainnet deployment in progress.",
    },
    {
      q: "How much does it cost to run?",
      a: "Gas fees on Base are <$0.01 per deploy. Chainlink CRE handles compute. RapidAPI + OpenAI API costs ~$0.05 per cycle. Extremely efficient.",
    },
    {
      q: "Can I fork this for my own use?",
      a: "Absolutely. Open-source project. Fork, customize, deploy. Built for the Chainlink CRE & AI Hackathon but designed for community expansion.",
    },
  ]

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-widest text-primary-cyber">
            Support
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   CTA Section
   ──────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-28">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-electric/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-cyber/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
          <span className="text-gradient">Watch Memes Become Money</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-300">
          The pipeline is live. New tokens deploy every few minutes. See viral
          tweets transform into tradeable assets in real-time.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-cta px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-primary-dark transition-all hover:shadow-glow"
          >
            Launch Dashboard
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-600/30 px-8 py-4 font-display text-sm font-semibold uppercase tracking-wider text-neutral-200 transition-all hover:border-neutral-500 hover:bg-neutral-800/50"
          >
            View GitHub Repo
          </a>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-neutral-700/30 bg-neutral-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-5 w-5 text-primary-electric" />
            <span className="font-display text-lg font-bold text-gradient-mint">
              MINA
            </span>
          </div>

          {/* Tagline */}
          <p className="font-display text-xs uppercase tracking-widest text-neutral-500">
            Autonomous. Algorithmic. Unstoppable.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <a
            href="#pipeline"
            className="text-neutral-400 transition-colors hover:text-primary-electric"
          >
            Documentation
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-primary-electric"
          >
            GitHub Repository
          </a>
          <a
            href="https://docs.chain.link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-primary-electric"
          >
            Chainlink CRE Docs
          </a>
          <a
            href="https://base.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-primary-electric"
          >
            Base Network
          </a>
        </div>

        {/* Legal */}
        <div className="mt-8 border-t border-neutral-700/30 pt-8 text-center">
          <p className="text-xs text-neutral-500">
            Built for Chainlink CRE &amp; AI Hackathon 2025. Experimental
            software. Use at your own risk. Not financial advice.
          </p>
          <p className="mt-2 text-xs text-neutral-600">
            &copy; 2025 Mina Protocol. Open Source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PipelineSection />
        <TechStackSection />
        <FeaturesSection />
        <StatsSection />
        <UseCasesSection />
        <ArchitectureSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
