"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Search } from "lucide-react"
import { NormalizedStartup } from "@/lib/csv-parser"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

interface StartupsExplorerProps {
  startups: NormalizedStartup[]
}

export function StartupsExplorer({ startups }: StartupsExplorerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useI18n()
  const { explorer: ex } = t

  const filteredStartups = useMemo(() => {
    if (!searchQuery.trim()) return startups
    const query = searchQuery.toLowerCase()
    return startups.filter(
      (startup) =>
        startup.startup.toLowerCase().includes(query) ||
        startup.descripcion.toLowerCase().includes(query) ||
        (startup.industria && startup.industria.toLowerCase().includes(query))
    )
  }, [startups, searchQuery])

  return (
    <section className="mt-24 pt-16 border-t border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full mb-8">
        <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-[#2596be]/10 to-[#84be64]/10 border border-gray-200 hover:border-[#2596be]/50 transition-all hover-lift">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2596be] to-[#84be64] flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900">{ex.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{ex.subtitle(startups.length, filteredStartups.length)}</p>
            </div>
          </div>
          <ChevronDown className={`w-6 h-6 text-[#2596be] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="space-y-6 pb-12 animate-fade-in-up">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={ex.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-base border-2 border-gray-200 focus:border-[#2596be] rounded-lg"
            />
          </div>

          {filteredStartups.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{ex.noResults}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredStartups.map((startup, index) => (
                <Card key={`${startup.startup}-${index}`} className="overflow-hidden hover:shadow-lg transition-all hover-lift border border-gray-200">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="text-base font-bold text-gray-900 flex-1 leading-tight">{startup.startup}</h4>
                      <Badge variant={startup.origin === "RD" ? "default" : "secondary"} className="shrink-0 text-xs">{startup.origin}</Badge>
                    </div>
                    {startup.industria && (
                      <div className="mb-3">
                        <Badge variant="outline" className="text-xs bg-[#2596be]/5 text-[#2596be] border-[#2596be]/20">{startup.industria}</Badge>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{startup.descripcion || ex.noDescription}</p>
                    {startup.etapa && (
                      <div className="mb-4">
                        <Badge variant="secondary" className="text-xs bg-[#84be64]/10 text-[#5a9845]">{startup.etapa}</Badge>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                      {startup.website && (
                        <a href={startup.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-[#2596be] to-[#1a7fa0] rounded-md hover:shadow-md transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          Website
                        </a>
                      )}
                      {startup.linkedinStartup && (
                        <a href={startup.linkedinStartup} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-[#84be64] to-[#5a9845] rounded-md hover:shadow-md transition-all">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.745-2.004 1.466-.103.252-.129.604-.129.957v5.383h-3.562s.048-8.733 0-9.635h3.562v1.365c.427-.659 1.189-1.599 2.898-1.599 2.117 0 3.704 1.385 3.704 4.362v5.507zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.957.768-1.71 1.959-1.71 1.189 0 1.917.753 1.917 1.71 0 .951-.728 1.71-1.961 1.71zm1.582 11.597H3.749V9.817h3.17v10.635zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0" /></svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center text-sm text-gray-500 pt-4">{ex.showing(filteredStartups.length, startups.length)}</div>
        </div>
      )}
    </section>
  )
}
