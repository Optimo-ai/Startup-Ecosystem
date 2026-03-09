import { loadStartupData } from "@/lib/data-loader"
import { calculateAnalytics } from "@/lib/analytics"
import { PageContent } from "@/components/page-content"

// Server Component — can use fs/Node.js freely
export default async function Page() {
  const parseResult = await loadStartupData()
  const analytics = calculateAnalytics(parseResult.startups)

  return <PageContent parseResult={parseResult} analytics={analytics} />
}
