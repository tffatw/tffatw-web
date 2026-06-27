import ArticleForm from '../ArticleForm'

export const metadata = { title: '新增文章 | TFFATW 後台' }

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-xl font-medium text-[#333333] mb-6">新增文章</h1>
      <ArticleForm />
    </div>
  )
}
