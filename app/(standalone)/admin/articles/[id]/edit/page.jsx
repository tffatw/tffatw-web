import { getCloudflareContext } from '@opennextjs/cloudflare'
import { notFound } from 'next/navigation'
import ArticleForm from '../../ArticleForm'

export const metadata = { title: '編輯文章 | TFFATW 後台' }

async function getArticle(id) {
  const { env } = await getCloudflareContext({ async: true })
  return await env.DB.prepare(
    'SELECT * FROM articles WHERE id = ?'
  ).bind(id).first()
}

export default async function EditArticlePage({ params }) {
  const { id } = await params
  const article = await getArticle(id)
  if (!article) notFound()

  return (
    <div>
      <h1 className="text-xl font-medium text-[#333333] mb-6">編輯文章</h1>
      <ArticleForm initialData={article} articleId={id} />
    </div>
  )
}
