import { getCloudflareContext } from '@opennextjs/cloudflare'

function articleToEvent(article) {
  const now = Date.now()
  const status = article.event_status
    ?? (article.published_at && article.published_at > now ? '籌備中' : '已結束')

  const description = article.description
    ?? (article.content ?? '')
      .split('\n')
      .find(line => line.trim() && !line.startsWith('#'))
      ?.replace(/\*\*/g, '')
      ?.replace(/[_*`]/g, '')
      ?.slice(0, 150)
    ?? ''

  return {
    id: article.id,
    title: article.title,
    description,
    image: article.cover_image_url,
    images: article.images ? JSON.parse(article.images) : [],
    type: article.event_type,
    date: article.event_date,
    time: article.event_time,
    location: article.location,
    address: article.address,
    status,
    content: article.content,
  }
}

export async function getAllEvents() {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    "SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC"
  ).all()
  return results.map(articleToEvent)
}

export async function getEventById(id) {
  const { env } = await getCloudflareContext({ async: true })
  const article = await env.DB.prepare(
    'SELECT * FROM articles WHERE id = ?'
  ).bind(id).first()
  if (!article) return null
  return articleToEvent(article)
}

export async function getFeaturedEvents(limit = 3) {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    "SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC LIMIT ?"
  ).bind(limit).all()
  return results.map(articleToEvent)
}

export async function getRelatedEvents(currentId, limit = 3) {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    "SELECT * FROM articles WHERE status = 'published' AND id != ? ORDER BY published_at DESC LIMIT ?"
  ).bind(currentId, limit).all()
  return results.map(articleToEvent)
}
