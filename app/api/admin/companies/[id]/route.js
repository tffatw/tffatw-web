import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request, { params }) {
  const { env } = await getCloudflareContext({ async: true })
  const { id } = await params
  const company = await env.DB.prepare(
    'SELECT * FROM company_profiles WHERE id = ?'
  ).bind(id).first()

  if (!company) {
    return Response.json({ error: '找不到此公司' }, { status: 404 })
  }
  return Response.json(company)
}

export async function PUT(request, { params }) {
  const { env } = await getCloudflareContext({ async: true })
  const { id } = await params
  const body = await request.json()
  const { slug, name, description, logo_url, website_url, contact_email } = body

  if (!slug || !name) {
    return Response.json({ error: '公司名稱和網址代碼為必填' }, { status: 400 })
  }

  const result = await env.DB.prepare(
    `UPDATE company_profiles
     SET slug = ?, name = ?, description = ?, logo_url = ?, website_url = ?, contact_email = ?, updated_at = ?
     WHERE id = ?`
  ).bind(slug, name, description ?? null, logo_url ?? null, website_url ?? null, contact_email ?? null, Date.now(), id).run()

  if (result.meta.changes === 0) {
    return Response.json({ error: '找不到此公司' }, { status: 404 })
  }
  return Response.json({ success: true })
}

export async function DELETE(request, { params }) {
  const { env } = await getCloudflareContext({ async: true })
  const { id } = await params

  await env.DB.prepare('DELETE FROM company_profiles WHERE id = ?').bind(id).run()
  return Response.json({ success: true })
}
