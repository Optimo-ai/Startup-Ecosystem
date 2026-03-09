"use client"

import React from "react"
import { GlossaryTerm } from "@/components/glossary-term"
import { useI18n } from "@/lib/i18n"

export function MethodologyScope() {
  const { t } = useI18n()
  const { methodology } = t

  return (
    <div className="mb-16 space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#2596be] to-[#84be64] bg-clip-text text-transparent">
          {methodology.mainTitle}
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-[#2596be] to-[#84be64] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-gradient-to-br from-slate-50 to-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-[#2596be] to-[#1a7fa0]">
                <svg className="h-6 w-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 4.354a4 4 0 110 5.292M15 19H9a6 6 0 016-6v0a6 6 0 016 6v1M6.75 7.756a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#2596be] to-[#1a7fa0] bg-clip-text text-transparent">
                {methodology.card1Title}
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {methodology.card1Text}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-[#84be64] to-[#5a9845]">
                <svg className="h-6 w-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 012-2h1.055M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#84be64] to-[#5a9845] bg-clip-text text-transparent">
                {methodology.card2Title}
              </h2>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className="font-semibold text-[#84be64]"><GlossaryTerm term={methodology.rdLabel} definition={methodology.rdDef} />:</span> {methodology.rdText}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className="font-semibold text-[#84be64]"><GlossaryTerm term={methodology.diasporaLabel} definition={methodology.diasporaDef} />:</span> {methodology.diasporaText}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-[#2596be]/20 rounded-lg px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-[#2596be] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 9a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <p className="text-sm sm:text-base text-gray-700">
            <span className="font-semibold">{methodology.noteLabel}</span> {methodology.noteText}
          </p>
        </div>
      </div>
    </div>
  )
}
