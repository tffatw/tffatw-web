import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET() {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    'SELECT id, title, status, published_at, created_at FROM articles ORDER BY created_at DESC'
  ).all()
  return Response.json(results)
}

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true })
  const body = await request.json()
  const { title, description, content, cover_image_url, images, status, published_at,
          event_type, event_status, event_date, event_time, location, address } = body

  if (!title) {
    return Response.json({ error: '標題為必填' }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const now = Date.now()

  await env.DB.prepare(
    `INSERT INTO articles (id, title, description, content, cover_image_url, images, status, published_at, created_at, updated_at,
      event_type, event_status, event_date, event_time, location, address)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, title, description ?? null, content ?? '', cover_image_url ?? null,
    images ?? null, status ?? 'draft', published_at ?? null, now, now,
    event_type ?? null, event_status ?? null, event_date ?? null,
    event_time ?? null, location ?? null, address ?? null
  ).run()

  return Response.json({ id }, { status: 201 })
}
