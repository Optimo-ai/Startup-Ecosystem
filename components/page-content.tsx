"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DatasetOverview } from "@/components/dataset-overview"
import { IndustryChart } from "@/components/industry-chart"
import { StageChart } from "@/components/stage-chart"
import { DigitalPresenceChart } from "@/components/digital-presence-chart"
import { DataLogs } from "@/components/data-logs"
import { IndustryStageHeatmap } from "@/components/industry-stage-heatmap"
import { FounderStructureChart } from "@/components/founder-structure-chart"
import { DigitalMaturityChart } from "@/components/digital-maturity-chart"
import { OriginComparisonPanel } from "@/components/origin-comparison-panel"
import { EcosystemCompletenessChart } from "@/components/ecosystem-completeness-chart"
import { StartupsExplorer } from "@/components/startups-explorer"
import { PlatformIntroduction } from "@/components/platform-introduction"
import { MethodologyScope } from "@/components/methodology-scope"
import { InsightBox } from "@/components/insight-box"
import { Separator } from "@/components/ui/separator"
import { useI18n } from "@/lib/i18n"
import type { AnalyticsResult } from "@/lib/analytics"
import type { ParseResult } from "@/lib/csv-parser"

interface PageContentProps {
  parseResult: ParseResult
  analytics: AnalyticsResult
}

export function PageContent({ parseResult, analytics }: PageContentProps) {
  const { t } = useI18n()
  const { page, insights } = t

  return (
    <>
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PlatformIntroduction />
        <Separator className="my-20" />
        <MethodologyScope />
        <Separator className="my-20" />

        <section className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{page.generalDistribution}</h2>
            <p className="text-gray-600 text-base">{page.generalDistributionDesc}</p>
          </div>
          <DatasetOverview analytics={analytics} />
        </section>
        <Separator className="my-20" />

        <section className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{page.industryStageAnalysis}</h2>
            <p className="text-gray-600 text-base">{page.industryStageAnalysisDesc}</p>
          </div>

          <IndustryChart distribution={analytics.industryDistribution} coverage={analytics.coverage.industry} showChart={analytics.coverageThresholds.industry} />
          <InsightBox color="blue" insights={[insights.industryDiversification(analytics.industryDistribution.length)]} />
          <Separator className="my-20" />
          <StageChart distribution={analytics.stageDistribution} coverage={analytics.coverage.stage} showChart={analytics.coverageThresholds.stage} />
          <InsightBox color="green" insights={[insights.earlyStage]} />

          {analytics.founderDistribution && (
            <>
              <Separator className="my-20" />
              <FounderStructureChart distribution={analytics.founderDistribution} total={analytics.totalStartups} />
              <InsightBox color="amber" insights={[insights.founderModels]} />
            </>
          )}
        </section>
        <Separator className="my-20" />

        <section className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{page.digitalEcosystem}</h2>
            <p className="text-gray-600 text-base">{page.digitalEcosystemDesc}</p>
          </div>

          <DigitalPresenceChart presence={analytics.digitalPresence} total={analytics.totalStartups} />
          <InsightBox color="blue" insights={[insights.digitalPresence]} />
          <Separator className="my-20" />
          <DigitalMaturityChart maturity={analytics.digitalMaturityIndex} total={analytics.totalStartups} />
        </section>
        <Separator className="my-20" />

        <section className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{page.rdDiaspora}</h2>
            <p className="text-gray-600 text-base">{page.rdDiasporaDesc}</p>
          </div>

          <OriginComparisonPanel comparison={analytics.originComparison} />
          <InsightBox color="green" insights={[insights.rdDiaspora]} />
        </section>
        <Separator className="my-20" />

        <section className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{page.industryMatrix}</h2>
            <p className="text-gray-600 text-base">{page.industryMatrixDesc}</p>
          </div>

          <IndustryStageHeatmap matrix={analytics.industryStageMatrix} coverageIndustry={analytics.coverage.industry} coverageStage={analytics.coverage.stage} showChart={analytics.showIndustryStageMatrix} />
        </section>
        <Separator className="my-20" />

        <section className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{page.dataQuality}</h2>
            <p className="text-gray-600 text-base">{page.dataQualityDesc}</p>
          </div>

          <EcosystemCompletenessChart coverage={analytics.coverage} />
          <Separator className="my-20" />
          <DataLogs logs={parseResult.logs} />
        </section>
        <Separator className="my-20" />

        <StartupsExplorer startups={parseResult.startups} />
        <Separator className="my-20" />

        <section className="mt-24 pt-16 border-t border-gray-200 pb-12">
          <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-[#2596be]/5 to-[#84be64]/5 border border-gray-200 text-center">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">{t.footer.brand}</span> • {t.footer.tagline}
            </p>
            <p className="text-xs text-gray-500 mt-2">{t.footer.description}</p>
            <p className="text-xs text-gray-600 mt-4">{t.footer.copyright}</p>
          </div>
        </section>
      </main>
    </>
  )
}
