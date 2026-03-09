import { promises as fs } from "fs"
import path from "path"
import { parseAllCSVs, type ParseResult } from "./csv-parser"

export async function loadStartupData(): Promise<ParseResult> {
  const dataDir = path.join(process.cwd(), "data")

  try {
    const files = await fs.readdir(dataDir)
    const csvFiles = files.filter((f) => f.endsWith(".csv"))

    const fileContents = await Promise.all(
      csvFiles.map(async (filename) => {
        const content = await fs.readFile(path.join(dataDir, filename), "utf-8")
        return { content, filename }
      }),
    )

    return await parseAllCSVs(fileContents)
  } catch (error) {
    // If data directory doesn't exist or no files, return empty result
    console.error("Error loading CSV files:", error)
    return {
      startups: [],
      logs: [],
      totalStartups: 0,
    }
  }
}
