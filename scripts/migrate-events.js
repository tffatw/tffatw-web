import { readFileSync, writeFileSync } from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const events = require('../lib/events.json')

function contentBlocksToMarkdown(blocks) {
  return blocks.map(block => {
    if (block.type === 'heading') {
      const level = block.level ?? 2
      return `${'#'.repeat(level)} ${block.content}`
    }
    if (block.type === 'paragraph') {
      return block.content ?? ''
    }
    if (block.type === 'list') {
      return (block.items ?? []).map(item => `- ${item}`).join('\n')
    }
    return ''
  }).filter(Boolean).join('\n\n')
}

function parseTaiwanDate(dateStr) {
  // "2025年2月13日" or "2026年02月26日"
  const match = dateStr.match(/(\d+)年(\d+)月(\d+)日/)
  if (!match) return null
  return new Date(`${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}T00:00:00+08:00`).getTime()
}

function escSql(str) {
  if (str === null || str === undefined) return 'NULL'
  return `'${String(str).replace(/'/g, "''")}'`
}

const rows = events.map(event => {
  const id = crypto.randomUUID()
  const title = event.title
  const content = contentBlocksToMarkdown(event.contentBlocks ?? [])
  const coverImageUrl = event.image ?? null
  const status = 'published'
  const publishedAt = parseTaiwanDate(event.date)
  const now = Date.now()
  const eventType = event.type ?? null
  const eventDate = event.date ?? null
  const eventTime = event.time ?? null
  const location = event.location ?? null
  const address = event.address ?? null
  const images = event.images?.length ? JSON.stringify(event.images) : null

  return `INSERT INTO articles (id, title, content, cover_image_url, status, published_at, created_at, updated_at, event_type, event_date, event_time, location, address, images) VALUES (${[
    escSql(id), escSql(title), escSql(content), escSql(coverImageUrl),
    escSql(status), publishedAt ?? 'NULL', now, now,
    escSql(eventType), escSql(eventDate), escSql(eventTime),
    escSql(location), escSql(address), escSql(images)
  ].join(', ')});`
})

const sql = rows.join('\n')
writeFileSync('./scripts/migrate-events.sql', sql, 'utf8')
console.log(`✅ 產生 ${rows.length} 筆 SQL，儲存至 scripts/migrate-events.sql`)
