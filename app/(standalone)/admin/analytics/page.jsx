import { getWeeklyAnalytics } from '@/lib/cloudflareAnalytics'
import AnalyticsDashboard from './AnalyticsDashboard'

export const metadata = { title: '分析報表 | TFFATW 後台' }

export default async function AnalyticsPage() {
  const analytics = await getWeeklyAnalytics()
  return <AnalyticsDashboard analytics={analytics} />
}
