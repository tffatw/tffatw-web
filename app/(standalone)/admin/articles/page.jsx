import { getCloudflareContext } from '@opennextjs/cloudflare'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const metadata = { title: '文章管理 | TFFATW 後台' }

async function getArticles() {
  const { env } = await getCloudflareContext({ async: true })
  const { results } = await env.DB.prepare(
    'SELECT id, title, status, published_at, created_at FROM articles ORDER BY created_at DESC'
  ).all()
  return results
}

function formatDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-[#333333]">文章管理</h1>
        <Link
          href="/admin/articles/new"
          className="bg-[#819C73] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#819C73]/90 transition-colors"
        >
          + 新增文章
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-[#666666]">
          <p className="text-base">尚無文章</p>
          <Link href="/admin/articles/new" className="text-[#819C73] text-sm mt-2 inline-block hover:underline">
            新增第一篇文章
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#EBE4D8] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#EBE4D8]/40 border-b border-[#EBE4D8]">
              <tr>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">標題</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">狀態</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">發布日期</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">建立日期</th>
                <th className="text-left px-6 py-3 text-[#666666] font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE4D8]">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-[#FCFAFA]">
                  <td className="px-6 py-4 font-medium text-[#333333]">{article.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.status === 'published'
                        ? 'bg-[#819C73]/20 text-[#819C73]'
                        : 'bg-[#EBE4D8] text-[#666666]'
                    }`}>
                      {article.status === 'published' ? '已發布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#666666]">{formatDate(article.published_at)}</td>
                  <td className="px-6 py-4 text-[#666666]">{formatDate(article.created_at)}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-[#819C73] hover:underline"
                    >
                      編輯
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
