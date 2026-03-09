"use client"

import { Card } from "@/components/ui/card"
import type { StageDistribution } from "@/lib/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { AlertCircle, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface StageChartProps {
  distribution: StageDistribution[]
  coverage: number
  showChart: boolean
}

const STAGE_COLORS: Record<string, string> = {
  Presemilla: "#2596be", Semilla: "#84be64", "Serie A": "#3ba8ce", "Pre Serie A": "#5a9845",
  "Serie B": "#1a7fa0", "Idea": "#2596be", "Mvp": "#3ba8ce", "Early stage": "#84be64",
  "Growth": "#5a9845", "Mature": "#228b22",
}

function getStageColor(stage: string, index: number): string {
  return STAGE_COLORS[stage] || [`#2596be`, `#84be64`, `#3ba8ce`, `#5a9845`, `#1a7fa0`][index % 5]
}

export function StageChart({ distribution, coverage, showChart }: StageChartProps) {
  const { t } = useI18n()
  const { stageChart } = t

  if (!showChart) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{stageChart.title}</h3>
          <p className="text-sm text-gray-600">{stageChart.subtitle}</p>
        </div>
        <Card className="p-8 hover-lift border border-amber-200 bg-amber-50/50">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-900 mb-1">{stageChart.limitedCoverage}</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                {stageChart.limitedCoverageText(parseFloat((coverage * 100).toFixed(0)))}
              </p>
            </div>
          </div>
        </Card>
      </section>
    )
  }

  const totalWithData = distribution.reduce((sum, d) => sum + d.count, 0)
  const sortedDistribution = [...distribution].sort((a, b) => b.count - a.count)

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-2xl font-bold text-gray-900">{stageChart.title}</h3>
          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#2596be]/10 to-[#84be64]/10 border border-[#2596be]/20 rounded-full text-xs font-semibold text-[#2596be]">
            {sortedDistribution.length} {stageChart.stages}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {stageChart.basedOn(totalWithData, parseFloat((coverage * 100).toFixed(0)))}
        </p>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sortedDistribution} margin={{ top: 20, right: 30, left: 60, bottom: 80 }} className="font-sans">
            <defs>
              {sortedDistribution.map((entry, index) => {
                const color = getStageColor(entry.stage, index)
                return (
                  <linearGradient key={`stage-gradient-${index}`} id={`stage-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} vertical={false} />
            <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} className="text-xs font-medium" tick={{ fill: "#1f2937" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={{ stroke: "#e5e7eb" }} />
            <YAxis className="text-xs font-medium" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={{ stroke: "#e5e7eb" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "2px solid #84be64", borderRadius: "12px", boxShadow: "0 10px 40px rgba(132, 190, 100, 0.15)", padding: "12px" }}
              labelStyle={{ color: "#1f2937", fontWeight: 600 }}
              formatter={(value: number, name: string, props: any) => [`${value} startups (${props.payload.percentage.toFixed(1)}%)`, "Count"]}
              cursor={{ fill: "#84be64", opacity: 0.08, radius: 6 }}
            />
            <Bar dataKey="count" radius={[10, 10, 0, 0]} animationDuration={1200} animationEasing="ease-out">
              {sortedDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#stage-gradient-${index})`} stroke={getStageColor(entry.stage, index)} strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#84be64]" />
          <p className="text-xs text-gray-600">{stageChart.groupedByStage}</p>
        </div>
      </Card>
    </section>
  )
}
