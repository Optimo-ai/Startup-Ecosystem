"use client"

import React from "react"
import { useI18n } from "@/lib/i18n"

export function PlatformIntroduction() {
  const { t } = useI18n()
  const { intro } = t

  return (
    <div className="mb-16 space-y-8">
      <div className="space-y-3">
        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#2596be] to-[#84be64] bg-clip-text text-transparent">
          {intro.mainTitle}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-[#2596be] to-[#84be64] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-100 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#2596be] to-[#1a7fa0] bg-clip-text text-transparent">
            {intro.card1Title}
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            {intro.card1Items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#2596be] font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-50 border border-teal-100 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#84be64] to-[#5a9845] bg-clip-text text-transparent">
            {intro.card2Title}
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            {intro.card2Items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#84be64] font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-50 border border-amber-100 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4 text-[#d97706]">
            {intro.card3Title}
          </h2>
          <ul className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            {intro.card3Items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#d97706] font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#2596be]/10 to-[#84be64]/10 border border-[#2596be]/20 rounded-lg px-6 py-4 sm:px-8 sm:py-5">
        <p className="text-sm sm:text-base text-gray-700 flex items-start gap-3">
          <span className="text-lg mt-0.5">💡</span>
          <span>
            <strong>{intro.noteLabel}</strong> {intro.noteText}
          </span>
        </p>
      </div>
    </div>
  )
}
