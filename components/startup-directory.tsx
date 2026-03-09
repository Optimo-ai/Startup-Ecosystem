"use client"

import { useState, useMemo } from "react"
import { NormalizedStartup } from "@/lib/csv-parser"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StartupDirectoryProps {
  startups: NormalizedStartup[]
}

export function StartupDirectory({ startups }: StartupDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStartups = useMemo(() => {
    if (!searchQuery.trim()) return startups

    const query = searchQuery.toLowerCase()
    return startups.filter((startup) =>
      startup.startup.toLowerCase().includes(query) ||
      startup.descripcion.toLowerCase().includes(query) ||
      (startup.industria && startup.industria.toLowerCase().includes(query))
    )
  }, [startups, searchQuery])

  return (
    <section className="space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Startup Directory</h2>
        <p className="text-muted-foreground text-balance">
          Explore all startups in the Dominican ecosystem and diaspora
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Search by name, description, or industry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStartups.map((startup, index) => (
          <Card key={`${startup.startup}-${index}`} className="h-full flex flex-col">
            <CardHeader className="flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <CardTitle className="text-lg leading-tight flex-1">
                  {startup.startup}
                </CardTitle>
                <Badge variant={startup.origin === "RD" ? "default" : "secondary"} className="shrink-0">
                  {startup.origin}
                </Badge>
              </div>

              {startup.industria && (
                <Badge variant="outline" className="w-fit mb-2">
                  {startup.industria}
                </Badge>
              )}

              <CardDescription className="text-sm leading-relaxed flex-1 mb-3">
                {startup.descripcion || "No description available"}
              </CardDescription>

              <div className="flex flex-wrap gap-2 mt-auto">
                {startup.etapa && (
                  <Badge variant="secondary" className="text-xs">
                    {startup.etapa}
                  </Badge>
                )}
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                )}
                {startup.linkedinStartup && (
                  <a
                    href={startup.linkedinStartup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredStartups.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No startups found matching "{searchQuery}"
          </p>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredStartups.length} of {startups.length} startups
      </div>
    </section>
  )
}