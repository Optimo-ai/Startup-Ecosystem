import type { NormalizedStartup } from "./csv-parser"

export interface DataCoverage {
  industry: number
  stage: number
  website: number
  linkedin: number
}

export interface OriginStats {
  total: number
  rd: number
  diaspora: number
}

export interface IndustryDistribution {
  industry: string
  count: number
  percentage: number
}

export interface StageDistribution {
  stage: string
  count: number
  percentage: number
}

export interface DigitalPresence {
  withWebsite: number
  withLinkedin: number
  withBoth: number
  withNeither: number
  percentageWebsite: number
  percentageLinkedin: number
}

export interface AnalyticsResult {
  totalStartups: number
  originStats: OriginStats
  coverage: DataCoverage
  industryDistribution: IndustryDistribution[]
  stageDistribution: StageDistribution[]
  digitalPresence: DigitalPresence
  coverageThresholds: {
    industry: boolean
    stage: boolean
  }
  industryStageMatrix: IndustryStageMatrix[]
  founderDistribution: FounderDistribution
  digitalMaturityIndex: DigitalMaturityIndex
  originComparison: OriginComparison
}

export interface IndustryStageMatrix {
  industry: string
  stage: string
  count: number
}

export interface FounderDistribution {
  solo: number
  two: number
  noData: number
  percentageSolo: number
  percentageTwo: number
  percentageNoData: number
}

export interface DigitalMaturityIndex {
  bothPresent: number
  onlyWebsite: number
  onlyLinkedin: number
  neither: number
  percentageBoth: number
  percentageOnlyWebsite: number
  percentageOnlyLinkedin: number
  percentageNeither: number
}

export interface OriginComparison {
  rd: {
    total: number
    industryDistribution: IndustryDistribution[]
    stageDistribution: StageDistribution[]
    digitalPresence: DigitalPresence
  }
  diaspora: {
    total: number
    industryDistribution: IndustryDistribution[]
    stageDistribution: StageDistribution[]
    digitalPresence: DigitalPresence
  }
}

const COVERAGE_THRESHOLD = 0.3 // 30%

export function calculateAnalytics(startups: NormalizedStartup[]): AnalyticsResult {
  const total = startups.length

  // Origin stats
  const rd = startups.filter((s) => s.origin === "RD").length
  const diaspora = startups.filter((s) => s.origin === "Diaspora").length

  // Coverage
  const withIndustry = startups.filter((s) => s.hasIndustry).length
  const withStage = startups.filter((s) => s.hasStage).length
  const withWebsite = startups.filter((s) => s.hasWebsite).length
  const withLinkedin = startups.filter((s) => s.hasLinkedinStartup).length

  const coverage: DataCoverage = {
    industry: total > 0 ? withIndustry / total : 0,
    stage: total > 0 ? withStage / total : 0,
    website: total > 0 ? withWebsite / total : 0,
    linkedin: total > 0 ? withLinkedin / total : 0,
  }

  // Industry distribution (only from startups with industry data)
  const startupsWithIndustry = startups.filter((s) => s.hasIndustry)
  const industryMap = new Map<string, number>()
  startupsWithIndustry.forEach((s) => {
    const key = s.industria!
    industryMap.set(key, (industryMap.get(key) || 0) + 1)
  })
  const industryDistribution: IndustryDistribution[] = Array.from(industryMap.entries())
    .map(([industry, count]) => ({
      industry: industry.charAt(0).toUpperCase() + industry.slice(1),
      count,
      percentage: (count / startupsWithIndustry.length) * 100,
    }))
    .sort((a, b) => b.count - a.count)

  // Stage distribution (only from startups with stage data)
  const startupsWithStage = startups.filter((s) => s.hasStage)
  const stageMap = new Map<string, number>()
  startupsWithStage.forEach((s) => {
    const key = s.etapa!
    stageMap.set(key, (stageMap.get(key) || 0) + 1)
  })
  const stageDistribution: StageDistribution[] = Array.from(stageMap.entries())
    .map(([stage, count]) => ({
      stage: stage.charAt(0).toUpperCase() + stage.slice(1),
      count,
      percentage: (count / startupsWithStage.length) * 100,
    }))
    .sort((a, b) => b.count - a.count)

  // Digital presence
  const withBoth = startups.filter((s) => s.hasWebsite && s.hasLinkedinStartup).length
  const withNeither = startups.filter((s) => !s.hasWebsite && !s.hasLinkedinStartup).length

  const digitalPresence: DigitalPresence = {
    withWebsite,
    withLinkedin,
    withBoth,
    withNeither,
    percentageWebsite: (withWebsite / total) * 100,
    percentageLinkedin: (withLinkedin / total) * 100,
  }

  const startupsWithBoth = startups.filter((s) => s.hasIndustry && s.hasStage)
  const matrixMap = new Map<string, number>()
  startupsWithBoth.forEach((s) => {
    const key = `${s.industria}|${s.etapa}`
    matrixMap.set(key, (matrixMap.get(key) || 0) + 1)
  })
  const industryStageMatrix: IndustryStageMatrix[] = Array.from(matrixMap.entries()).map(([key, count]) => {
    const [industry, stage] = key.split("|")
    return {
      industry: industry.charAt(0).toUpperCase() + industry.slice(1),
      stage: stage.charAt(0).toUpperCase() + stage.slice(1),
      count,
    }
  })

  const soloFounders = startups.filter((s) => s.founderCount === 1).length
  const twoFounders = startups.filter((s) => s.founderCount === 2).length
  const noFounderData = startups.filter((s) => s.founderCount === 0).length

  const founderDistribution: FounderDistribution = {
    solo: soloFounders,
    two: twoFounders,
    noData: noFounderData,
    percentageSolo: (soloFounders / total) * 100,
    percentageTwo: (twoFounders / total) * 100,
    percentageNoData: (noFounderData / total) * 100,
  }

  const onlyWebsite = startups.filter((s) => s.hasWebsite && !s.hasLinkedinStartup).length
  const onlyLinkedin = startups.filter((s) => !s.hasWebsite && s.hasLinkedinStartup).length

  const digitalMaturityIndex: DigitalMaturityIndex = {
    bothPresent: withBoth,
    onlyWebsite,
    onlyLinkedin,
    neither: withNeither,
    percentageBoth: (withBoth / total) * 100,
    percentageOnlyWebsite: (onlyWebsite / total) * 100,
    percentageOnlyLinkedin: (onlyLinkedin / total) * 100,
    percentageNeither: (withNeither / total) * 100,
  }

  const rdStartups = startups.filter((s) => s.origin === "RD")
  const diasporaStartups = startups.filter((s) => s.origin === "Diaspora")

  function calculateForOrigin(originStartups: NormalizedStartup[]) {
    const originTotal = originStartups.length
    const withIndustryOrigin = originStartups.filter((s) => s.hasIndustry)
    const withStageOrigin = originStartups.filter((s) => s.hasStage)
    const withWebsiteOrigin = originStartups.filter((s) => s.hasWebsite).length
    const withLinkedinOrigin = originStartups.filter((s) => s.hasLinkedinStartup).length
    const withBothOrigin = originStartups.filter((s) => s.hasWebsite && s.hasLinkedinStartup).length
    const withNeitherOrigin = originStartups.filter((s) => !s.hasWebsite && !s.hasLinkedinStartup).length

    const industryMapOrigin = new Map<string, number>()
    withIndustryOrigin.forEach((s) => {
      const key = s.industria!
      industryMapOrigin.set(key, (industryMapOrigin.get(key) || 0) + 1)
    })
    const industryDistOrigin: IndustryDistribution[] = Array.from(industryMapOrigin.entries())
      .map(([industry, count]) => ({
        industry: industry.charAt(0).toUpperCase() + industry.slice(1),
        count,
        percentage: (count / withIndustryOrigin.length) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    const stageMapOrigin = new Map<string, number>()
    withStageOrigin.forEach((s) => {
      const key = s.etapa!
      stageMapOrigin.set(key, (stageMapOrigin.get(key) || 0) + 1)
    })
    const stageDistOrigin: StageDistribution[] = Array.from(stageMapOrigin.entries())
      .map(([stage, count]) => ({
        stage: stage.charAt(0).toUpperCase() + stage.slice(1),
        count,
        percentage: (count / withStageOrigin.length) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    return {
      total: originTotal,
      industryDistribution: industryDistOrigin,
      stageDistribution: stageDistOrigin,
      digitalPresence: {
        withWebsite: withWebsiteOrigin,
        withLinkedin: withLinkedinOrigin,
        withBoth: withBothOrigin,
        withNeither: withNeitherOrigin,
        percentageWebsite: (withWebsiteOrigin / originTotal) * 100,
        percentageLinkedin: (withLinkedinOrigin / originTotal) * 100,
      },
    }
  }

  const originComparison: OriginComparison = {
    rd: calculateForOrigin(rdStartups),
    diaspora: calculateForOrigin(diasporaStartups),
  }

  return {
    totalStartups: total,
    originStats: { total, rd, diaspora },
    coverage,
    industryDistribution,
    stageDistribution,
    digitalPresence,
    coverageThresholds: {
      industry: coverage.industry >= COVERAGE_THRESHOLD,
      stage: coverage.stage >= COVERAGE_THRESHOLD,
    },
    industryStageMatrix,
    founderDistribution,
    digitalMaturityIndex,
    originComparison,
  }
}
