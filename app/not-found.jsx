import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">頁面未找到</h2>
        <p className="mt-2 text-lg text-gray-600">很抱歉，您訪問的頁面不存在或已被移除</p>
        <div className="mt-8">
          <Link href="/" className="btn btn-primary">返回首頁</Link>
        </div>
      </div>
    </div>
  )
}
