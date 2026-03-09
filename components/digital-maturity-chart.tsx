"use client"

import { Card } from "@/components/ui/card"
import type { DigitalMaturityIndex } from "@/lib/analytics"
import { Globe, Linkedin, CheckCircle2, XCircle, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface DigitalMaturityChartProps {
  maturity: DigitalMaturityIndex
  total: number
}

export function DigitalMaturityChart({ maturity, total }: DigitalMaturityChartProps) {
  const { t } = useI18n()
  const { digitalMaturity: dm } = t

  const segments = [
    { name: dm.bothPresent, count: maturity.bothPresent, percentage: maturity.percentageBoth, icon: CheckCircle2, color: "#2596be", description: dm.bothDescription },
    { name: dm.websiteOnly, count: maturity.onlyWebsite, percentage: maturity.percentageOnlyWebsite, icon: Globe, color: "#84be64", description: dm.websiteDescription },
    { name: dm.linkedinOnly, count: maturity.onlyLinkedin, percentage: maturity.percentageOnlyLinkedin, icon: Linkedin, color: "#3ba8ce", description: dm.linkedinDescription },
    { name: dm.noPresence, count: maturity.neither, percentage: maturity.percentageNeither, icon: XCircle, color: "#d1d5db", description: dm.noPresenceDescription },
  ]

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{dm.title}</h3>
        <p className="text-sm text-gray-600">{dm.subtitle(total)}</p>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <div className="mb-8">
          <div className="h-20 flex rounded-xl overflow-hidden shadow-lg">
            {segments.map((segment) => (
              <div
                key={segment.name}
                className="flex items-center justify-center transition-smooth hover:opacity-90 cursor-default group relative"
                style={{ width: `${segment.percentage}%`, backgroundColor: segment.color }}
              >
                {segment.percentage > 5 && (
                  <span className="text-sm font-bold text-white drop-shadow-lg">{segment.percentage.toFixed(0)}%</span>
                )}
                <div className="absolute bottom-full mb-3 hidden group-hover:block z-10 w-64">
                  <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-xs shadow-xl">
                    <div className="font-bold text-gray-900 mb-1">{segment.name}</div>
                    <div className="text-gray-700">{segment.count.toLocaleString()} startups ({segment.percentage.toFixed(1)}%)</div>
                    <div className="text-gray-500 text-xs mt-1">{segment.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-900">{dm.detailedBreakdown}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {segments.map((segment) => {
              const Icon = segment.icon
              return (
                <div
                  key={segment.name}
                  className="flex flex-col items-start p-5 rounded-xl border transition-all duration-200 hover:shadow-md"
                  style={{ borderColor: segment.color + "40", backgroundColor: segment.color + "08" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 shadow-md" style={{ backgroundColor: segment.color }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1" style={{ color: segment.color }}>{segment.count.toLocaleString()}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{segment.name}</div>
                  <div className="text-xs text-gray-600">{dm.coveragePct(segment.percentage)}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">{dm.note}</p>
        </div>
      </Card>
    </section>
  )
}
