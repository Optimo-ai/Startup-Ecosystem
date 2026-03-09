"use client"

import { Card } from "@/components/ui/card"
import type { AnalyticsResult } from "@/lib/analytics"
import { Database, MapPin, Globe, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface DatasetOverviewProps {
  analytics: AnalyticsResult
}

export function DatasetOverview({ analytics }: DatasetOverviewProps) {
  const { t } = useI18n()
  const { dataset } = t
  const { totalStartups, originStats, coverage } = analytics

  return (
    <section className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{dataset.title}</h2>
        <p className="text-gray-600 text-balance">{dataset.subtitle(totalStartups)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-7 space-y-4 hover-lift border border-gray-200 bg-gradient-to-br from-blue-50/50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2596be] flex items-center justify-center shadow-lg">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{dataset.totalStartups}</div>
          </div>
          <div className="text-4xl font-bold text-gray-900">{totalStartups.toLocaleString()}</div>
          <p className="text-xs text-gray-600">{dataset.totalStartupsSource}</p>
        </Card>

        <Card className="p-7 space-y-4 hover-lift border-l-4 border-l-[#2596be] bg-gradient-to-br from-blue-50/50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2596be] flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{dataset.startupsInDR}</div>
          </div>
          <div className="text-4xl font-bold text-gray-900">{originStats.rd.toLocaleString()}</div>
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-[#2596be]">{((originStats.rd / totalStartups) * 100).toFixed(1)}%</span> {dataset.ofTotal}
          </p>
        </Card>

        <Card className="p-7 space-y-4 hover-lift border-l-4 border-l-[#84be64] bg-gradient-to-br from-green-50/50 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#84be64] flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{dataset.diaspora}</div>
          </div>
          <div className="text-4xl font-bold text-gray-900">{originStats.diaspora.toLocaleString()}</div>
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-[#84be64]">{((originStats.diaspora / totalStartups) * 100).toFixed(1)}%</span> {dataset.ofTotal}
          </p>
        </Card>

        <Card className="p-7 space-y-4 hover-lift border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-xs font-bold text-gray-900 uppercase tracking-wide">{dataset.dataCoverage}</div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-700 font-medium">{dataset.industry}</span>
                <span className="font-bold text-gray-900">{(coverage.industry * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-[#2596be] to-[#1a7fa0] rounded-full transition-all duration-1000" style={{ width: `${coverage.industry * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-700 font-medium">{dataset.stage}</span>
                <span className="font-bold text-gray-900">{(coverage.stage * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-[#84be64] to-[#5a9845] rounded-full transition-all duration-1000" style={{ width: `${coverage.stage * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-700 font-medium">{dataset.website}</span>
                <span className="font-bold text-gray-900">{(coverage.website * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-[#3ba8ce] to-[#2db8d9] rounded-full transition-all duration-1000" style={{ width: `${coverage.website * 100}%` }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border border-gray-200 bg-gradient-to-br from-gray-50 to-transparent">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#2596be] flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">{dataset.ecosystemComposition}</p>
            <p className="text-sm text-gray-700">{dataset.ecosystemCompositionText(totalStartups)}</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
