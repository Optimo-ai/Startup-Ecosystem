"use client"

import { Card } from "@/components/ui/card"
import type { DataCoverage } from "@/lib/analytics"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface EcosystemCompletenessChartProps {
  coverage: DataCoverage
}

export function EcosystemCompletenessChart({ coverage }: EcosystemCompletenessChartProps) {
  const { t } = useI18n()
  const { ecosystemCompleteness: ec } = t

  const fields = [
    { label: ec.industryClassification, value: coverage.industry, key: "industry" },
    { label: ec.developmentStage, value: coverage.stage, key: "stage" },
    { label: ec.websiteInformation, value: coverage.website, key: "website" },
    { label: ec.linkedinPresence, value: coverage.linkedin, key: "linkedin" },
  ]

  const sortedFields = [...fields].sort((a, b) => b.value - a.value)

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{ec.title}</h3>
        <p className="text-sm text-gray-600">{ec.subtitle}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-[#2596be]/20 rounded-xl px-4 py-4 sm:px-6 sm:py-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#2596be] flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-900">{ec.whatDoesItMean}</p>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{ec.explanation}</p>
        </div>
      </div>

      <Card className="p-8 hover-lift border border-gray-200">
        <div className="space-y-7">
          {sortedFields.map((field) => {
            const percentage = field.value * 100
            const isComplete = percentage >= 70
            const isPartial = percentage >= 30 && percentage < 70

            return (
              <div key={field.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isComplete ? <CheckCircle2 className="w-5 h-5 text-[#84be64]" /> : <AlertCircle className="w-5 h-5 text-amber-500" />}
                    <span className="text-sm font-semibold text-gray-900">{field.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{percentage.toFixed(1)}</span>
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ width: `${percentage}%`, backgroundColor: isComplete ? "#84be64" : isPartial ? "#eab308" : "#ef4444" }}
                  />
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  {isComplete ? ec.fullCoverage : isPartial ? ec.sufficientCoverage : ec.limitedData}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="p-4 rounded-lg bg-green-50/50 border border-green-200/50">
              <div className="text-xs font-semibold text-gray-900 mb-1">{ec.complete}</div>
              <div className="text-xs text-gray-700">{ec.completeDesc}</div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-200/50">
              <div className="text-xs font-semibold text-gray-900 mb-1">{ec.partial}</div>
              <div className="text-xs text-gray-700">{ec.partialDesc}</div>
            </div>
            <div className="p-4 rounded-lg bg-red-50/50 border border-red-200/50">
              <div className="text-xs font-semibold text-gray-900 mb-1">{ec.limited}</div>
              <div className="text-xs text-gray-700">{ec.limitedDesc}</div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{ec.footerNote}</p>
        </div>
      </Card>
    </section>
  )
}
