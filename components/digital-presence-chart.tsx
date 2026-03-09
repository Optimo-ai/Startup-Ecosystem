"use client"

import { Card } from "@/components/ui/card"
import type { DigitalPresence } from "@/lib/analytics"
import { Globe, Linkedin, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface DigitalPresenceChartProps {
  presence: DigitalPresence
  total: number
}

export function DigitalPresenceChart({ presence, total }: DigitalPresenceChartProps) {
  const { t } = useI18n()
  const { digitalPresence: dp } = t

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{dp.title}</h3>
        <p className="text-sm text-gray-600">{dp.subtitle(total)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-7 hover-lift border border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2596be] to-[#1a7fa0] flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{dp.websitePresence}</p>
              <p className="text-xs text-gray-500">{dp.websiteAvailable}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold bg-gradient-to-r from-[#2596be] to-[#1a7fa0] bg-clip-text text-transparent">
              {presence.percentageWebsite.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500">{dp.coverage}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-3">
            <div className="h-full bg-gradient-to-r from-[#2596be] to-[#3ba8ce] rounded-full transition-all duration-1000 ease-out" style={{ width: `${presence.percentageWebsite}%` }} />
          </div>
          <p className="text-xs text-gray-600">{dp.websiteCount(presence.withWebsite, total)}</p>
        </Card>

        <Card className="p-7 hover-lift border border-green-200 bg-gradient-to-br from-green-50 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#84be64] to-[#5a9845] flex items-center justify-center shadow-lg">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{dp.linkedinPresence}</p>
              <p className="text-xs text-gray-500">{dp.linkedinProfile}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold bg-gradient-to-r from-[#84be64] to-[#5a9845] bg-clip-text text-transparent">
              {presence.percentageLinkedin.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500">{dp.coverage}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-3">
            <div className="h-full bg-gradient-to-r from-[#84be64] to-[#6bc65f] rounded-full transition-all duration-1000 ease-out" style={{ width: `${presence.percentageLinkedin}%` }} />
          </div>
          <p className="text-xs text-gray-600">{dp.linkedinCount(presence.withLinkedin, total)}</p>
        </Card>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-6">{dp.summaryTitle}</h4>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#2596be]/10 to-[#2596be]/5 border border-[#2596be]/20 shadow-sm">
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#2596be] to-[#1a7fa0] bg-clip-text text-transparent">{presence.withBoth.toLocaleString()}</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">{dp.fullPresence}</div>
            <div className="text-xs text-gray-600">{dp.fullPresenceDesc}</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#84be64]/10 to-[#84be64]/5 border border-[#84be64]/20 shadow-sm">
            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#84be64] to-[#5a9845] bg-clip-text text-transparent">
              {(presence.withWebsite + presence.withLinkedin - presence.withBoth).toLocaleString()}
            </div>
            <div className="text-sm font-semibold text-gray-900 mb-1">{dp.partialPresence}</div>
            <div className="text-xs text-gray-600">{dp.partialPresenceDesc}</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-200/50 to-gray-100/50 border border-gray-300/50 shadow-sm">
            <div className="text-5xl font-bold mb-2 text-gray-600">{presence.withNeither.toLocaleString()}</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">{dp.noPresence}</div>
            <div className="text-xs text-gray-600">{dp.noPresenceDesc}</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">{dp.note}</p>
        </div>
      </Card>
    </section>
  )
}
