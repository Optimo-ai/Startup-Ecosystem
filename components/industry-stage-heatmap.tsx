"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import type { IndustryStageMatrix } from "@/lib/analytics"
import { AlertCircle, Info } from "lucide-react"
import { useMemo } from "react"
import { useI18n } from "@/lib/i18n"

interface IndustryStageHeatmapProps {
  matrix: IndustryStageMatrix[]
  coverageIndustry: number
  coverageStage: number
  showChart: boolean
}

export function IndustryStageHeatmap({ matrix, coverageIndustry, coverageStage, showChart }: IndustryStageHeatmapProps) {
  const { t } = useI18n()
  const { heatmap: hm } = t

  const { industries, stages, maxCount, gridData } = useMemo(() => {
    if (!showChart || matrix.length === 0) return { industries: [], stages: [], maxCount: 0, gridData: new Map() }
    const industriesSet = new Set<string>()
    const stagesSet = new Set<string>()
    const dataMap = new Map<string, number>()
    let max = 0
    matrix.forEach(({ industry, stage, count }) => {
      industriesSet.add(industry); stagesSet.add(stage)
      dataMap.set(`${industry}-${stage}`, count)
      max = Math.max(max, count)
    })
    return { industries: Array.from(industriesSet).sort(), stages: Array.from(stagesSet).sort(), maxCount: max, gridData: dataMap }
  }, [matrix, showChart])

  if (!showChart) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{hm.title}</h3>
          <p className="text-sm text-gray-600">{hm.subtitle}</p>
        </div>
        <Card className="p-8 hover-lift border border-amber-200 bg-gradient-to-br from-amber-50 to-transparent">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">{hm.matrixUnavailable}</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {hm.matrixUnavailableText(parseFloat((coverageIndustry * 100).toFixed(0)), parseFloat((coverageStage * 100).toFixed(0)))}
              </p>
            </div>
          </div>
        </Card>
      </section>
    )
  }

  const totalWithBoth = matrix.reduce((sum, item) => sum + item.count, 0)

  function getHeatColor(count: number): string {
    if (count === 0) return "#e5e7eb"
    const intensity = count / maxCount
    const hue = 200
    const saturation = 40 + intensity * 60
    const lightness = 80 - intensity * 50
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-2xl font-bold text-gray-900">{hm.title}</h3>
          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#2596be]/10 to-[#84be64]/10 border border-[#2596be]/20 rounded-full text-xs font-semibold text-[#2596be]">
            {totalWithBoth.toLocaleString()} {hm.startups}
          </span>
        </div>
        <p className="text-sm text-gray-600">{hm.concentration(totalWithBoth)}</p>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid gap-1" style={{ gridTemplateColumns: `180px repeat(${stages.length}, 110px)` }}>
              <div />
              {stages.map((stage) => (
                <div key={stage} className="text-center text-xs font-bold py-4 text-gray-900 bg-gradient-to-b from-gray-50 to-transparent rounded-t-lg">{stage}</div>
              ))}
              {industries.map((industry) => (
                <React.Fragment key={industry}>
                  <div className="text-xs font-semibold py-4 pr-4 text-right text-gray-900 bg-gradient-to-r from-gray-50 to-transparent rounded-r-lg">{industry}</div>
                  {stages.map((stage) => {
                    const count = gridData.get(`${industry}-${stage}`) || 0
                    return (
                      <div
                        key={`${industry}-${stage}`}
                        className="flex items-center justify-center py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default group relative border-2 border-gray-200 hover:border-[#2596be]"
                        style={{ backgroundColor: getHeatColor(count) }}
                      >
                        <span className="text-sm font-bold transition-colors duration-200" style={{ color: count > 0 ? (count > maxCount * 0.6 ? "white" : "#1f2937") : "#9ca3af" }}>
                          {count || "—"}
                        </span>
                        {count > 0 && (
                          <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 animate-in fade-in-0 zoom-in-95 duration-200">
                            <div className="bg-white border-2 border-[#2596be] rounded-lg px-4 py-2 text-xs whitespace-nowrap shadow-xl">
                              <div className="font-bold text-gray-900">{count} {count === 1 ? hm.startup : hm.startups}</div>
                              <div className="text-gray-600 text-xs mt-1">{industry} · {stage}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-700">{hm.heatIntensity}</span>
            <div className="flex gap-1">
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity) => (
                <div key={intensity} className="w-10 h-5 rounded-md border border-gray-300 transition-transform hover:scale-110" style={{ backgroundColor: getHeatColor(Math.floor(maxCount * intensity)) }} title={`${Math.floor(maxCount * intensity)} startups`} />
              ))}
            </div>
          </div>
          <span className="text-xs text-gray-600">{hm.lowHigh}</span>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">{hm.note}</p>
        </div>
      </Card>
    </section>
  )
}
