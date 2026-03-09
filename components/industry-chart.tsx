"use client"

import { Card } from "@/components/ui/card"
import type { IndustryDistribution } from "@/lib/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { AlertCircle, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface IndustryChartProps {
  distribution: IndustryDistribution[]
  coverage: number
  showChart: boolean
}

const INDUSTRY_COLORS: Record<string, string> = {
  Fintech: "#2596be", Proptech: "#84be64", Edtech: "#3ba8ce", Healthtech: "#5a9845",
  Ecommerce: "#1a7fa0", Saas: "#6bc65f", Logtech: "#2db8d9", Agtech: "#3d8a38",
  AI: "#20b2aa", Marketplace: "#228b22", Productividad: "#1e90ff",
}

function getIndustryColor(industry: string, index: number): string {
  return INDUSTRY_COLORS[industry] || [`#2596be`, `#84be64`, `#3ba8ce`, `#5a9845`, `#1a7fa0`, `#6bc65f`][index % 6]
}

export function IndustryChart({ distribution, coverage, showChart }: IndustryChartProps) {
  const { t } = useI18n()
  const { industryChart } = t

  if (!showChart) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{industryChart.title}</h3>
          <p className="text-sm text-gray-600">{industryChart.subtitle}</p>
        </div>
        <Card className="p-8 hover-lift border border-amber-200 bg-amber-50/50">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-900 mb-1">{industryChart.limitedCoverage}</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                {industryChart.limitedCoverageText((coverage * 100).toFixed(0) as unknown as number)}
              </p>
            </div>
          </div>
        </Card>
      </section>
    )
  }

  const topIndustries = distribution.slice(0, 10)
  const totalWithData = distribution.reduce((sum, d) => sum + d.count, 0)

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-2xl font-bold text-gray-900">{industryChart.title}</h3>
          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#2596be]/10 to-[#84be64]/10 border border-[#2596be]/20 rounded-full text-xs font-semibold text-[#2596be]">
            {topIndustries.length} {industryChart.sectors}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {industryChart.basedOn(totalWithData, parseFloat((coverage * 100).toFixed(0)))}
        </p>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <ResponsiveContainer width="100%" height={480}>
          <BarChart data={topIndustries} layout="vertical" margin={{ left: 140, right: 40, top: 20, bottom: 20 }} className="font-sans">
            <defs>
              {topIndustries.map((entry, index) => {
                const color = getIndustryColor(entry.industry, index)
                return (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.5} />
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} horizontal={false} />
            <XAxis type="number" className="text-xs font-medium" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={{ stroke: "#e5e7eb" }} />
            <YAxis type="category" dataKey="industry" width={130} className="text-xs font-semibold" tick={{ fill: "#1f2937" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "2px solid #2596be", borderRadius: "12px", boxShadow: "0 10px 40px rgba(37, 150, 190, 0.15)", padding: "12px" }}
              labelStyle={{ color: "#1f2937", fontWeight: 600 }}
              formatter={(value: number, name: string, props: any) => [`${value} startups (${props.payload.percentage.toFixed(1)}%)`, "Count"]}
              cursor={{ fill: "#2596be", opacity: 0.08, radius: 8 }}
            />
            <Bar dataKey="count" radius={[0, 10, 10, 0]} animationDuration={1000} animationEasing="ease-out">
              {topIndustries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke={getIndustryColor(entry.industry, index)} strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#2596be]" />
          <p className="text-xs text-gray-600">{industryChart.topSectors(topIndustries.length)}</p>
        </div>
      </Card>
    </section>
  )
}
