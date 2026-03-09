"use client"

import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle2 } from "lucide-react"
import { LAST_COMMIT_DATE } from "@/lib/last-commit-date"

export function LastUpdated() {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-[#2596be]/5 to-[#84be64]/5 border border-[#2596be]/20">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2596be] to-[#84be64] flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#2596be] uppercase tracking-wide">
              Last Updated
            </p>
            <p className="text-sm text-gray-700 font-medium">
              {formatDate(LAST_COMMIT_DATE)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#84be64]" />
          <span className="text-xs text-gray-600 font-medium">Data Verified</span>
        </div>
      </div>
    </Card>
  )
}
