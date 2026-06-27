import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request, { params }) {
  const { env } = await getCloudflareContext({ async: true })
  const { id } = await params
  const article = await env.DB.prepare(
    'SELECT * FROM articles WHERE id = ?'
  ).bind(id).first()

  if (!article) {
    return Response.json({ error: '找不到此文章' }, { status: 404 })
  }
  return Response.json(article)
}

export async function PUT(request, { params }) {
  const { env } = await getCloudflareContext({ async: true })
  const { id } = await params
  const body = await request.json()
  const { title, description, content, cover_image_url, images, status, published_at,
          event_type, event_status, event_date, event_time, location, address } = body

  if (!title) {
    return Response.json({ error: '標題為必填' }, { status: 400 })
  }

  const result = await env.DB.prepare(
    `UPDATE articles
     SET title = ?, description = ?, content = ?, cover_image_url = ?, images = ?, status = ?, published_at = ?, updated_at = ?,
         event_type = ?, event_status = ?, event_date = ?, event_time = ?, location = ?, address = ?
     WHERE id = ?`
  ).bind(
    title, description ?? null, content ?? '', cover_image_url ?? null,
    images ?? null, status ?? 'draft', published_at ?? null, Date.now(),
    event_type ?? null, event_status ?? null, event_date ?? null,
    event_time ?? null, location ?? null, address ?? null,
    id
  ).run()

  if (result.meta.changes === 0) {
    return Response.json({ error: '找不到此文章' }, { status: 404 })
  }
  return Response.json({ success: true })
}

export async function DELETE(request, { params }) {
  const { env } = await getCloudflareContext({ async: true })
  const { id } = await params
  await env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(id).run()
  return Response.json({ success: true })
}
