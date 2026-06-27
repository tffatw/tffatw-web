import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request, { params }) {
  try {
    const { env } = await getCloudflareContext({ async: true })
    const { path } = await params
    const key = Array.isArray(path) ? path.join('/') : path

    const object = await env.R2.get(key)

    if (!object) {
      return new Response('Not found', { status: 404 })
    }

    const contentType = object.httpMetadata?.contentType ?? 'application/octet-stream'
    const arrayBuffer = await object.arrayBuffer()

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('[images error]', err)
    return new Response(err?.message ?? 'Error', { status: 500 })
  }
}
