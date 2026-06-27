import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET() {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    'SELECT * FROM company_profiles ORDER BY name ASC'
  ).all()
  return Response.json(results)
}

export async function POST(request) {
  const { env } = await getCloudflareContext({ async: true })
  const body = await request.json()
  const { slug, name, description, logo_url, website_url, contact_email, member_id } = body

  if (!slug || !name) {
    return Response.json({ error: '公司名稱和網址代碼為必填' }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const now = Date.now()

  // Ensure member exists (create a placeholder member if no member_id)
  let resolvedMemberId = member_id
  if (!resolvedMemberId) {
    resolvedMemberId = crypto.randomUUID()
    await env.DB.prepare(
      'INSERT INTO members (id, email, created_at) VALUES (?, ?, ?)'
    ).bind(resolvedMemberId, `${slug}@placeholder.tffatw.org`, now).run()
  }

  await env.DB.prepare(
    `INSERT INTO company_profiles (id, member_id, slug, name, description, logo_url, website_url, contact_email, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, resolvedMemberId, slug, name, description ?? null, logo_url ?? null, website_url ?? null, contact_email ?? null, now).run()

  return Response.json({ id }, { status: 201 })
}
