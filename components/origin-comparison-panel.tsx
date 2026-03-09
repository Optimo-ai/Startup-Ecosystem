"use client"

import { Card } from "@/components/ui/card"
import type { OriginComparison } from "@/lib/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Info, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface OriginComparisonPanelProps {
  comparison: OriginComparison
}

export function OriginComparisonPanel({ comparison }: OriginComparisonPanelProps) {
  const { t } = useI18n()
  const { originComparison: oc } = t

  const industryData = (() => {
    const rdMap = new Map(comparison.rd.industryDistribution.map((i) => [i.industry, i.count]))
    const diasporaMap = new Map(comparison.diaspora.industryDistribution.map((i) => [i.industry, i.count]))
    const allIndustries = new Set([...rdMap.keys(), ...diasporaMap.keys()])
    return Array.from(allIndustries)
      .map((industry) => ({ industry, rd: rdMap.get(industry) || 0, diaspora: diasporaMap.get(industry) || 0 }))
      .sort((a, b) => b.rd + b.diaspora - (a.rd + a.diaspora))
      .slice(0, 8)
  })()

  const stageData = (() => {
    const rdMap = new Map(comparison.rd.stageDistribution.map((s) => [s.stage, s.count]))
    const diasporaMap = new Map(comparison.diaspora.stageDistribution.map((s) => [s.stage, s.count]))
    const allStages = new Set([...rdMap.keys(), ...diasporaMap.keys()])
    return Array.from(allStages)
      .map((stage) => ({ stage, rd: rdMap.get(stage) || 0, diaspora: diasporaMap.get(stage) || 0 }))
      .sort((a, b) => b.rd + b.diaspora - (a.rd + a.diaspora))
  })()

  const digitalData = [
    { metric: "Website", rd: comparison.rd.digitalPresence.percentageWebsite, diaspora: comparison.diaspora.digitalPresence.percentageWebsite },
    { metric: "LinkedIn", rd: comparison.rd.digitalPresence.percentageLinkedin, diaspora: comparison.diaspora.digitalPresence.percentageLinkedin },
  ]

  const tooltipStyle = { backgroundColor: "#ffffff", border: "2px solid #2596be", borderRadius: "12px", boxShadow: "0 10px 40px rgba(37, 150, 190, 0.15)", padding: "12px" }

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold text-gray-900">{oc.title}</h3>
          <TrendingUp className="w-5 h-5 text-[#2596be]" />
        </div>
        <p className="text-sm text-gray-600">{oc.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-7 hover-lift border-l-4 border-l-[#2596be] bg-gradient-to-br from-blue-50/50 to-transparent">
          <div className="flex items-baseline justify-between mb-6">
            <h4 className="text-lg font-bold text-gray-900">{oc.dominicanRepublic}</h4>
            <span className="text-4xl font-bold bg-gradient-to-r from-[#2596be] to-[#1a7fa0] bg-clip-text text-transparent">{comparison.rd.total.toLocaleString()}</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{oc.topIndustry}</span>
              <span className="font-semibold text-gray-900">{comparison.rd.industryDistribution[0]?.industry || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{oc.mostCommonStage}</span>
              <span className="font-semibold text-gray-900">{comparison.rd.stageDistribution[0]?.stage || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{oc.webPresence}</span>
              <span className="font-semibold text-gray-900">{comparison.rd.digitalPresence.percentageWebsite.toFixed(0)}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-7 hover-lift border-l-4 border-l-[#84be64] bg-gradient-to-br from-green-50/50 to-transparent">
          <div className="flex items-baseline justify-between mb-6">
            <h4 className="text-lg font-bold text-gray-900">{oc.diaspora}</h4>
            <span className="text-4xl font-bold bg-gradient-to-r from-[#84be64] to-[#5a9845] bg-clip-text text-transparent">{comparison.diaspora.total.toLocaleString()}</span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{oc.topIndustry}</span>
              <span className="font-semibold text-gray-900">{comparison.diaspora.industryDistribution[0]?.industry || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{oc.mostCommonStage}</span>
              <span className="font-semibold text-gray-900">{comparison.diaspora.stageDistribution[0]?.stage || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{oc.webPresence}</span>
              <span className="font-semibold text-gray-900">{comparison.diaspora.digitalPresence.percentageWebsite.toFixed(0)}%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{oc.industryDistribution}</h4>
        <p className="text-sm text-gray-600 mb-6">{oc.industryDistributionDesc}</p>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={industryData} margin={{ left: 20, right: 20, top: 20, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="industry" angle={-45} textAnchor="end" height={120} className="text-xs" tick={{ fill: "#6b7280", fontWeight: 500 }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis className="text-xs" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#e5e7eb" }} label={{ value: oc.numberOfStartups, angle: -90, position: 'insideLeft' }} />
            <Tooltip contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => [`${value} ${oc.startups}`, name === "rd" ? oc.dominicanRepublic : oc.diaspora]}
              labelFormatter={(label) => `${oc.industry}: ${label}`}
              cursor={{ fill: "rgba(37, 150, 190, 0.1)", radius: 8 }}
            />
            <Bar dataKey="rd" fill="#2596be" radius={[8, 8, 0, 0]} animationDuration={1200} animationEasing="ease-out" />
            <Bar dataKey="diaspora" fill="#84be64" radius={[8, 8, 0, 0]} animationDuration={1200} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-8 hover-lift border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{oc.stageDistribution}</h4>
        <p className="text-sm text-gray-600 mb-6">{oc.stageDistributionDesc}</p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stageData} margin={{ left: 20, right: 20, top: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} className="text-xs" tick={{ fill: "#6b7280", fontWeight: 500 }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis className="text-xs" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#e5e7eb" }} label={{ value: oc.numberOfStartups, angle: -90, position: 'insideLeft' }} />
            <Tooltip contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => [`${value} ${oc.startups}`, name === "rd" ? oc.dominicanRepublic : oc.diaspora]}
              labelFormatter={(label) => `${oc.stage}: ${label}`}
              cursor={{ fill: "rgba(37, 150, 190, 0.1)", radius: 8 }}
            />
            <Bar dataKey="rd" fill="#2596be" radius={[8, 8, 0, 0]} animationDuration={1200} animationEasing="ease-out" />
            <Bar dataKey="diaspora" fill="#84be64" radius={[8, 8, 0, 0]} animationDuration={1200} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-8 hover-lift border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{oc.digitalPresenceComparison}</h4>
        <p className="text-sm text-gray-600 mb-6">{oc.digitalPresenceComparisonDesc}</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={digitalData} layout="vertical" margin={{ top: 20, right: 30, left: 140, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} className="text-xs" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis dataKey="metric" type="category" className="text-xs" tick={{ fill: "#6b7280", fontWeight: 500 }} axisLine={{ stroke: "#e5e7eb" }} />
            <Tooltip contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => [`${(value as number).toFixed(1)}%`, name === "rd" ? oc.dominicanRepublic : oc.diaspora]}
              cursor={{ fill: "rgba(37, 150, 190, 0.1)", radius: 8 }}
            />
            <Bar dataKey="rd" fill="#2596be" radius={[0, 8, 8, 0]} animationDuration={1200} animationEasing="ease-out" />
            <Bar dataKey="diaspora" fill="#84be64" radius={[0, 8, 8, 0]} animationDuration={1200} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">{oc.note}</p>
        </div>
      </Card>
    </section>
  )
}
