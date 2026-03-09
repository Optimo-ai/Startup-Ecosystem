"use client"

import { Card } from "@/components/ui/card"
import type { FounderDistribution } from "@/lib/analytics"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface FounderStructureChartProps {
  distribution: FounderDistribution
  total: number
}

const FOUNDER_COLORS = { solo: "#2596be", two: "#84be64", noData: "#d1d5db" }

export function FounderStructureChart({ distribution, total }: FounderStructureChartProps) {
  const { t } = useI18n()
  const { founderStructure: fs } = t

  const data = [
    { name: fs.soloFounder, value: distribution.solo, percentage: distribution.percentageSolo, color: FOUNDER_COLORS.solo },
    { name: fs.twoFounders, value: distribution.two, percentage: distribution.percentageTwo, color: FOUNDER_COLORS.two },
    { name: fs.noData, value: distribution.noData, percentage: distribution.percentageNoData, color: FOUNDER_COLORS.noData },
  ]

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{fs.title}</h3>
        <p className="text-sm text-gray-600">{fs.subtitle(total)}</p>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <defs>
                  {data.map((entry, index) => (
                    <radialGradient key={`pie-gradient-${index}`} id={`pie-gradient-${index}`}>
                      <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                      <stop offset="70%" stopColor={entry.color} stopOpacity={0.7} />
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.5} />
                    </radialGradient>
                  ))}
                </defs>
                <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={4} dataKey="value" animationDuration={1200} animationEasing="ease-out">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#pie-gradient-${index})`} stroke="#ffffff" strokeWidth={3} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", border: "2px solid #2596be", borderRadius: "12px", boxShadow: "0 10px 40px rgba(37, 150, 190, 0.15)", padding: "12px" }}
                  labelStyle={{ color: "#1f2937", fontWeight: 600 }}
                  formatter={(value: number, name: string, props: any) => [`${value} startups`, props.payload.name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            {data.filter(item => item.name !== fs.noData).map((item) => (
              <div key={item.name} className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-lg flex-shrink-0 shadow-md transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-base font-semibold text-gray-900">{item.name}</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-[#2596be] to-[#84be64] bg-clip-text text-transparent">{item.value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${item.percentage}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }} />
                </div>
                <p className="text-sm font-semibold text-gray-700 mt-2">{item.percentage.toFixed(1)}{fs.ofTotal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">{fs.note}</p>
        </div>
      </Card>
    </section>
  )
}
