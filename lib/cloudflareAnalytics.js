import { getCloudflareContext } from '@opennextjs/cloudflare'

const GRAPHQL_ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql'
const WEEKDAY_LABELS = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

async function queryGraphQL(apiToken, query, variables) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Cloudflare GraphQL API error: HTTP ${res.status}`)
  }

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data
}

/**
 * Real visit stats from Cloudflare's Zone Analytics (GraphQL API), not Web
 * Analytics (RUM) — the latter has no API and is dashboard-only. Requires
 * the zone's DNS to be proxied through Cloudflare.
 */
export async function getWeeklyAnalytics() {
  const { env } = await getCloudflareContext({ async: true })
  const zoneTag = env.CLOUDFLARE_ZONE_ID
  const apiToken = env.CLOUDFLARE_API_TOKEN

  if (!zoneTag || !apiToken) {
    return { available: false }
  }

  const today = new Date()
  const since = new Date(today)
  since.setUTCDate(since.getUTCDate() - 6)

  const query = `
    query WeeklyVisits($zoneTag: String!, $since: Date!, $until: Date!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            filter: { date_geq: $since, date_leq: $until }
            limit: 7
            orderBy: [date_ASC]
          ) {
            dimensions { date }
            sum { pageViews }
            uniq { uniques }
          }
        }
      }
    }
  `

  try {
    const data = await queryGraphQL(apiToken, query, {
      zoneTag,
      since: toDateKey(since),
      until: toDateKey(today),
    })

    const rows = data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? []
    const todayKey = toDateKey(today)
    const yesterdayKey = toDateKey(new Date(today.getTime() - 86400000))

    const weeklyData = rows.map((row) => ({
      date: WEEKDAY_LABELS[new Date(row.dimensions.date).getUTCDay()],
      visits: row.sum.pageViews,
    }))

    const todayRow = rows.find((row) => row.dimensions.date === todayKey)
    const yesterdayRow = rows.find((row) => row.dimensions.date === yesterdayKey)
    const weekTotal = rows.reduce((total, row) => total + row.sum.pageViews, 0)

    const todayVisits = todayRow?.sum.pageViews ?? 0
    const trend = yesterdayRow?.sum.pageViews
      ? Math.round(((todayVisits - yesterdayRow.sum.pageViews) / yesterdayRow.sum.pageViews) * 1000) / 10
      : undefined

    return {
      available: true,
      todayVisits,
      todayUniques: todayRow?.uniq?.uniques ?? null,
      trend,
      weeklyData,
      weekTotal,
      dailyAverage: rows.length ? Math.round(weekTotal / rows.length) : 0,
    }
  } catch (error) {
    console.error('[cloudflareAnalytics] Zone Analytics fetch failed:', error.message)
    return { available: false, error: error.message }
  }
}
