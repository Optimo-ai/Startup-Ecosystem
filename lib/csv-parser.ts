import Papa from "papaparse"

export interface RawStartupRow {
  Startup: string
  Industria: string
  Descripción: string
  "Founder 1": string
  "Role F1": string
  "LinkedIn CEO": string
  "Founder 2": string
  "Role F2": string
  Etapa: string
  "LinkedIn startup": string
  Website: string
  Notes: string
  [key: string]: string
}

export interface NormalizedStartup {
  startup: string
  industria: string | null
  descripcion: string
  founder1: string
  roleF1: string
  linkedinCEO: string
  founder2: string
  roleF2: string
  etapa: string | null
  linkedinStartup: string | null
  website: string | null
  notes: string
  origin: "RD" | "Diaspora"
  hasIndustry: boolean
  hasStage: boolean
  hasWebsite: boolean
  hasLinkedinStartup: boolean
  founderCount: number
}

export interface ParseLog {
  filename: string
  totalRows: number
  validStartups: number
  discarded: number
  discardReasons: string[]
}

export interface ParseResult {
  startups: NormalizedStartup[]
  logs: ParseLog[]
  totalStartups: number
}

function isEmptyOrSinInfo(value: string | undefined | null): boolean {
  if (!value) return true
  const trimmed = value.trim()
  return trimmed === "" || trimmed.toLowerCase() === "sin información"
}

function normalizeValue(value: string | undefined | null): string | null {
  if (isEmptyOrSinInfo(value)) return null
  return value!.trim()
}

/**
 * Finds the description field regardless of encoding issues.
 * "Descripción" often becomes "Descripci?n" in broken encodings.
 */
function findDescripcion(row: RawStartupRow): string {
  if (row["Descripción"]) return row["Descripción"]
  const key = Object.keys(row).find((k) => k.startsWith("Descripci"))
  return key ? (row[key] || "") : ""
}

function normalizeRow(row: RawStartupRow, origin: "RD" | "Diaspora"): NormalizedStartup {
  const industria = normalizeValue(row.Industria)
  const etapa = normalizeValue(row.Etapa)
  const website = normalizeValue(row.Website)
  const linkedinStartup = normalizeValue(row["LinkedIn startup"])
  const founder1 = normalizeValue(row["Founder 1"])
  const founder2 = normalizeValue(row["Founder 2"])

  let founderCount = 0
  if (founder1) founderCount++
  if (founder2) founderCount++

  return {
    startup: row.Startup.trim(),
    industria: industria?.toLowerCase() || null,
    descripcion: findDescripcion(row),
    founder1: founder1 || "",
    roleF1: row["Role F1"] || "",
    linkedinCEO: row["LinkedIn CEO"] || "",
    founder2: founder2 || "",
    roleF2: row["Role F2"] || "",
    etapa: etapa?.toLowerCase() || null,
    linkedinStartup,
    website,
    notes: row.Notes || "",
    origin,
    hasIndustry: industria !== null,
    hasStage: etapa !== null,
    hasWebsite: website !== null,
    hasLinkedinStartup: linkedinStartup !== null,
    founderCount,
  }
}

export async function parseCSVFile(
  content: string,
  filename: string,
  origin: "RD" | "Diaspora",
): Promise<{ startups: NormalizedStartup[]; log: ParseLog }> {
  return new Promise((resolve, reject) => {
    const startups: NormalizedStartup[] = []
    const discardReasons: string[] = []
    let totalRows = 0
    let validStartups = 0

    Papa.parse<RawStartupRow>(content, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        totalRows = results.data.length

        results.data.forEach((row, index) => {
          if (!row.Startup || row.Startup.trim() === "") {
            discardReasons.push(`Row ${index + 1}: Empty Startup field`)
            return
          }

          const normalized = normalizeRow(row, origin)
          startups.push(normalized)
          validStartups++
        })

        const log: ParseLog = {
          filename,
          totalRows,
          validStartups,
          discarded: totalRows - validStartups,
          discardReasons,
        }

        resolve({ startups, log })
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

export async function parseAllCSVs(files: { content: string; filename: string }[]): Promise<ParseResult> {
  const allStartups: NormalizedStartup[] = []
  const logs: ParseLog[] = []

  for (const file of files) {
    const origin = file.filename.includes("diaspora") ? "Diaspora" : "RD"
    const { startups, log } = await parseCSVFile(file.content, file.filename, origin)
    allStartups.push(...startups)
    logs.push(log)
  }

  return {
    startups: allStartups,
    logs,
    totalStartups: allStartups.length,
  }
}
