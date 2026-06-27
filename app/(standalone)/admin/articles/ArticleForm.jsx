'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default function ArticleForm({ initialData, articleId }) {
  const router = useRouter()
  const isEdit = !!articleId
  const coverInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    content: initialData?.content ?? '',
    cover_image_url: initialData?.cover_image_url ?? '',
    images: initialData?.images
      ? (typeof initialData.images === 'string' ? JSON.parse(initialData.images) : initialData.images)
      : [],
    status: initialData?.status ?? 'draft',
    published_at: initialData?.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    event_type: initialData?.event_type ?? '例會',
    event_status: initialData?.event_status ?? '已結束',
    event_time: initialData?.event_time ?? '',
    location: initialData?.location ?? '',
    address: initialData?.address ?? '',
  })
  const [tab, setTab] = useState('edit')
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function uploadFile(file) {
    const data = new FormData()
    data.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: data })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error ?? '上傳失敗')
    return json.url
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    try {
      const url = await uploadFile(file)
      setForm((prev) => ({ ...prev, cover_image_url: url }))
    } catch (err) {
      alert(err.message)
    }
    setUploadingCover(false)
    e.target.value = ''
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploadingGallery(true)
    try {
      const urls = await Promise.all(files.map(uploadFile))
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }))
    } catch (err) {
      alert(err.message)
    }
    setUploadingGallery(false)
    e.target.value = ''
  }

  function removeGalleryImage(index) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const publishedAt = form.published_at ? new Date(form.published_at) : null
    const payload = {
      ...form,
      images: JSON.stringify(form.images),
      published_at: publishedAt ? publishedAt.getTime() : null,
      event_date: publishedAt
        ? `${publishedAt.getFullYear()}年${publishedAt.getMonth() + 1}月${publishedAt.getDate()}日`
        : null,
    }

    const url = isEdit ? `/api/admin/articles/${articleId}` : '/api/admin/articles'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? '發生錯誤，請再試一次')
      setLoading(false)
      return
    }

    router.push('/admin/articles')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm(`確定要刪除「${form.title}」嗎？此操作無法復原。`)) return
    setLoading(true)
    await fetch(`/api/admin/articles/${articleId}`, { method: 'DELETE' })
    router.push('/admin/articles')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-[#EBE4D8] p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-1">
            標題 <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
            placeholder="請輸入文章標題"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333333] mb-1">活動簡介</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73] resize-none"
            placeholder="顯示在活動列表與詳情頁標題下方的一段摘要說明（留空則自動從內文擷取）"
          />
        </div>

        {/* 封面圖片 */}
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-1">封面圖片</label>
          <div className="flex gap-2">
            <input
              name="cover_image_url"
              value={form.cover_image_url}
              onChange={handleChange}
              className="flex-1 border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
              placeholder="圖片網址，或點右側按鈕上傳"
            />
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              disabled={uploadingCover}
              className="px-3 py-2 text-sm border border-[#EBE4D8] rounded-lg hover:bg-[#EBE4D8]/30 disabled:opacity-50 whitespace-nowrap"
            >
              {uploadingCover ? '上傳中...' : '上傳圖片'}
            </button>
            <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
          </div>
          {form.cover_image_url && (
            <img
              src={form.cover_image_url}
              alt="封面預覽"
              className="mt-2 h-32 w-auto rounded-lg border border-[#EBE4D8] object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
        </div>

        {/* 活動相簿 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#333333]">
              活動相簿（{form.images.length} 張）
            </label>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              disabled={uploadingGallery}
              className="px-3 py-1.5 text-xs border border-[#EBE4D8] rounded-lg hover:bg-[#EBE4D8]/30 disabled:opacity-50"
            >
              {uploadingGallery ? '上傳中...' : '+ 新增圖片'}
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </div>

          {form.images.length === 0 ? (
            <div
              onClick={() => galleryInputRef.current?.click()}
              className="border-2 border-dashed border-[#EBE4D8] rounded-lg p-8 text-center text-[#999] text-sm cursor-pointer hover:border-[#819C73]/40"
            >
              點擊或拖曳上傳活動照片（可多選）
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {form.images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`圖片 ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-[#EBE4D8]"
                    onError={(e) => { e.target.style.opacity = '0.3' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div
                onClick={() => galleryInputRef.current?.click()}
                className="h-24 border-2 border-dashed border-[#EBE4D8] rounded-lg flex items-center justify-center text-[#999] text-xl cursor-pointer hover:border-[#819C73]/40"
              >
                +
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#333333] mb-1">發布日期</label>
            <input
              name="published_at"
              value={form.published_at}
              onChange={handleChange}
              type="date"
              className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#333333] mb-1">文章狀態</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
            >
              <option value="draft">草稿</option>
              <option value="published">發布</option>
            </select>
          </div>
        </div>

        {/* 活動資訊 */}
        <div className="border-t border-[#EBE4D8] pt-5">
          <p className="text-sm font-medium text-[#333333] mb-3">活動資訊</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#666666] mb-1">活動類型</label>
              <select
                name="event_type"
                value={form.event_type}
                onChange={handleChange}
                className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
              >
                <option value="例會">例會</option>
                <option value="參訪活動">參訪活動</option>
                <option value="講座">講座</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#666666] mb-1">活動狀態</label>
              <select
                name="event_status"
                value={form.event_status}
                onChange={handleChange}
                className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
              >
                <option value="已結束">已結束</option>
                <option value="報名中">報名中</option>
                <option value="籌備中">籌備中</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#666666] mb-1">活動時間</label>
              <input
                name="event_time"
                value={form.event_time}
                onChange={handleChange}
                className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
                placeholder="18:00-21:00"
              />
            </div>
            <div>
              <label className="block text-xs text-[#666666] mb-1">活動地點</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
                placeholder="海大王時尚喜宴廣場"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-[#666666] mb-1">活動地址</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73]"
                placeholder="新北產業園區五工路66號2樓"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EBE4D8] overflow-hidden">
        <div className="flex border-b border-[#EBE4D8]">
          <button
            type="button"
            onClick={() => setTab('edit')}
            className={`px-4 py-2 text-sm font-medium ${tab === 'edit' ? 'text-[#819C73] border-b-2 border-[#819C73]' : 'text-[#666666] hover:text-[#333333]'}`}
          >
            編輯
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`px-4 py-2 text-sm font-medium ${tab === 'preview' ? 'text-[#819C73] border-b-2 border-[#819C73]' : 'text-[#666666] hover:text-[#333333]'}`}
          >
            預覽
          </button>
        </div>

        {tab === 'edit' ? (
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={20}
            className="w-full px-4 py-3 text-sm font-mono focus:outline-none resize-none"
            placeholder={`使用 Markdown 語法撰寫文章內容...\n\n# 標題\n## 子標題\n\n**粗體** *斜體*\n\n- 清單項目\n- 清單項目`}
          />
        ) : (
          <div className="px-6 py-4 prose prose-sm max-w-none min-h-96">
            {form.content ? (
              <ReactMarkdown>{form.content}</ReactMarkdown>
            ) : (
              <p className="text-[#999]">尚無內容可預覽</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
          >
            刪除此文章
          </button>
        )}
        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            onClick={() => router.push('/admin/articles')}
            className="px-4 py-2 text-sm text-[#666666] border border-[#EBE4D8] rounded-lg hover:bg-[#EBE4D8]/30"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-[#819C73] text-white rounded-lg hover:bg-[#819C73]/90 disabled:opacity-50"
          >
            {loading ? '儲存中...' : isEdit ? '儲存變更' : '建立文章'}
          </button>
        </div>
      </div>
    </form>
  )
}
