"use client"

import { LAST_COMMIT_DATE } from "@/lib/last-commit-date"
import { useI18n } from "@/lib/i18n"
import { LanguageToggle } from "@/components/language-toggle"

export function DashboardHeader() {
  const { t, lang } = useI18n()

  const commitDate = new Date(LAST_COMMIT_DATE)
  const formattedDate = commitDate.toLocaleDateString(lang === "es" ? "es-DO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="mb-16 bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and branding */}
          <div className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
            <div className="hidden sm:block">
              <p className="text-lg font-bold bg-gradient-to-r from-[#2596be] to-[#84be64] bg-clip-text text-transparent">
                {t.header.brand}
              </p>
            </div>
          </div>

          {/* Title and description */}
          <div className="flex-1 ml-8 hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.header.title}</h1>
            <p className="text-sm text-gray-600 mt-1">{t.header.subtitle}</p>
          </div>

          {/* Right side: language toggle + status badge */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-[#84be64] uppercase tracking-wide">{t.header.lastUpdated}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#84be64] to-[#5a9845] flex items-center justify-center shadow-md animate-pulse hover:animate-none transition-all">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
