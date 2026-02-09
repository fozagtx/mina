"use client"

const steps = [
  {
    num: 1,
    label: "Cron Trigger",
    desc: "Every 2 min",
    icon: "⏰",
    color: "from-blue-500/20 to-blue-600/20",
    border: "border-blue-500/30",
  },
  {
    num: 2,
    label: "Fetch Tweets",
    desc: "RapidAPI → 100 tweets",
    icon: "🐦",
    color: "from-sky-500/20 to-sky-600/20",
    border: "border-sky-500/30",
  },
  {
    num: 3,
    label: "Detect Outlier",
    desc: "50x+ views vs median",
    icon: "📊",
    color: "from-amber-500/20 to-amber-600/20",
    border: "border-amber-500/30",
  },
  {
    num: 4,
    label: "Claude Analysis",
    desc: "AI confidence scoring",
    icon: "🧠",
    color: "from-purple-500/20 to-purple-600/20",
    border: "border-purple-500/30",
  },
  {
    num: 5,
    label: "Deploy Token",
    desc: "Factory → Base chain",
    icon: "🚀",
    color: "from-green-500/20 to-green-600/20",
    border: "border-green-500/30",
  },
  {
    num: 6,
    label: "Log Result",
    desc: "Supabase tracking",
    icon: "💾",
    color: "from-rose-500/20 to-rose-600/20",
    border: "border-rose-500/30",
  },
]

export function PipelineViz() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {steps.map((step, i) => (
        <div key={step.num} className="relative">
          <div
            className={`rounded-xl border bg-gradient-to-br p-4 ${step.color} ${step.border}`}
          >
            <div className="mb-2 text-2xl">{step.icon}</div>
            <div className="text-xs font-medium text-zinc-400">
              Step {step.num}
            </div>
            <div className="text-sm font-semibold text-zinc-200">
              {step.label}
            </div>
            <div className="mt-1 text-xs text-zinc-500">{step.desc}</div>
          </div>
          {i < steps.length - 1 && (
            <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-zinc-600 lg:block">
              →
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
