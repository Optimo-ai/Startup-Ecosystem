"use client"

import { useI18n } from "@/lib/i18n"

export function LanguageToggle() {
  const { lang, setLang } = useI18n()

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 text-xs font-semibold">
      <button
        onClick={() => setLang("es")}
        className={`px-2.5 py-1.5 rounded-md transition-all duration-200 ${
          lang === "es"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1.5 rounded-md transition-all duration-200 ${
          lang === "en"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </button>
    </div>
  )
}
