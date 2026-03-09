"use client"

import { Card } from "@/components/ui/card"
import type { ParseLog } from "@/lib/csv-parser"
import { FileText, CheckCircle2, AlertTriangle, ChevronDown, Info } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n"

interface DataLogsProps {
  logs: ParseLog[]
}

export function DataLogs({ logs }: DataLogsProps) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useI18n()
  const { dataLogs: dl } = t

  if (logs.length === 0) return null

  const totalRows = logs.reduce((sum, log) => sum + log.totalRows, 0)
  const totalValid = logs.reduce((sum, log) => sum + log.validStartups, 0)
  const totalDiscarded = logs.reduce((sum, log) => sum + log.discarded, 0)
  const validPercentage = totalRows > 0 ? ((totalValid / totalRows) * 100).toFixed(1) : 0

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{dl.title}</h2>
        <p className="text-sm text-gray-600">{dl.subtitle}</p>
      </div>

      <Card className="p-8 border border-gray-200">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-transparent border border-blue-200/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#2596be] flex items-center justify-center shadow-md"><FileText className="h-5 w-5 text-white" /></div>
              <span className="text-xs font-bold text-[#2596be] uppercase">{dl.csvRows}</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalRows.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{dl.totalRowsProcessed}</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-transparent border border-green-200/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#84be64] flex items-center justify-center shadow-md"><CheckCircle2 className="h-5 w-5 text-white" /></div>
              <span className="text-xs font-bold text-[#84be64] uppercase">{dl.valid}</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalValid.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{validPercentage}% {dl.accepted}</div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-transparent border border-amber-200/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center shadow-md"><AlertTriangle className="h-5 w-5 text-white" /></div>
              <span className="text-xs font-bold text-amber-600 uppercase">{dl.discarded}</span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalDiscarded.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{((totalDiscarded / totalRows) * 100).toFixed(1)}% {dl.rejected}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-sm font-semibold text-[#2596be] hover:text-[#1a7fa0] transition-colors">
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            {expanded ? dl.hideLogs : dl.showLogs}
          </button>

          {expanded && (
            <div className="mt-6 space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="font-mono text-sm font-bold text-gray-900 mb-3">{log.filename}</div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{dl.totalRows}</span>
                      <span className="font-semibold text-gray-900">{log.totalRows.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{dl.validStartups}</span>
                      <span className="font-semibold text-[#84be64]">{log.validStartups.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{dl.discarded}</span>
                      <span className="font-semibold text-amber-600">{log.discarded.toLocaleString()}</span>
                    </div>
                    {log.discardReasons.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          {dl.discardReasons}
                        </div>
                        <ul className="space-y-2">
                          {log.discardReasons.slice(0, 5).map((reason, i) => (
                            <li key={i} className="text-xs text-gray-700 pl-6 relative">
                              <span className="absolute left-0">•</span>{reason}
                            </li>
                          ))}
                          {log.discardReasons.length > 5 && (
                            <li className="text-xs text-gray-600 italic pl-6">{dl.andMore(log.discardReasons.length - 5)}</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 bg-blue-50/50 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700">{dl.note}</p>
        </div>
      </Card>
    </section>
  )
}
