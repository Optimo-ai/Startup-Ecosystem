import React from "react"

interface InsightBoxProps {
  insights: string[]
  color?: "blue" | "green" | "amber"
}

export function InsightBox({ insights, color = "blue" }: InsightBoxProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: "bg-gradient-to-br from-[#2596be] to-[#1a7fa0]",
      text: "text-[#2596be]",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-100",
      icon: "bg-gradient-to-br from-[#84be64] to-[#5a9845]",
      text: "text-[#84be64]",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "bg-gradient-to-br from-[#f59e0b] to-[#d97706]",
      text: "text-[#f59e0b]",
    },
  }

  const colors = colorClasses[color]

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-5 sm:p-6`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${colors.icon} rounded-lg p-2.5`}>
          <svg
            className="h-5 w-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          {insights.map((insight, idx) => (
            <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className={`font-semibold ${colors.text}`}>•</span> {insight}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
