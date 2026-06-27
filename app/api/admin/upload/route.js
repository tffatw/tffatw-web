import { getCloudflareContext } from '@opennextjs/cloudflare'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request) {
  try {
    const { env } = await getCloudflareContext({ async: true })

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return Response.json({ error: '請選擇檔案' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ error: '只支援 JPG、PNG、WebP、GIF 格式' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: '檔案大小不能超過 5MB' }, { status: 400 })
    }

    const ext = file.name.split('.').pop().toLowerCase()
    const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`
    const buffer = await file.arrayBuffer()

    await env.R2.put(key, buffer, {
      httpMetadata: { contentType: file.type },
    })

    return Response.json({ url: `/api/images/${key}` })
  } catch (err) {
    console.error('[upload error]', err)
    return Response.json({ error: err?.message ?? '上傳失敗' }, { status: 500 })
  }
}
