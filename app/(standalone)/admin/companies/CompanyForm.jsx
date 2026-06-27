'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyForm({ initialData, companyId }) {
  const router = useRouter()
  const isEdit = !!companyId

  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    website_url: initialData?.website_url ?? '',
    contact_email: initialData?.contact_email ?? '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const url = isEdit ? `/api/admin/companies/${companyId}` : '/api/admin/companies'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? '發生錯誤，請再試一次')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm(`確定要刪除「${form.name}」嗎？此操作無法復原。`)) return
    setLoading(true)
    await fetch(`/api/admin/companies/${companyId}`, { method: 'DELETE' })
    router.push('/admin')
    router.refresh()
  }

  const inputClass = 'w-full border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73] placeholder:text-[#999]'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#EBE4D8] p-6 space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#333333] mb-1">
          公司名稱 <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="例：巨森食品企業有限公司"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#333333] mb-1">
          網址代碼（slug）<span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#999]">/members/</span>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            pattern="[a-z0-9\-]+"
            className={`flex-1 border border-[#EBE4D8] rounded-lg px-3 py-2 text-sm text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#819C73]/40 focus:border-[#819C73] placeholder:text-[#999]`}
            placeholder="ju-sen-food"
          />
        </div>
        <p className="text-xs text-[#999] mt-1">只能使用小寫英文、數字、連字號</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#333333] mb-1">公司介紹</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className={inputClass}
          placeholder="請填寫公司介紹..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#333333] mb-1">官方網站</label>
        <input
          name="website_url"
          value={form.website_url}
          onChange={handleChange}
          type="url"
          className={inputClass}
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#333333] mb-1">聯絡 Email</label>
        <input
          name="contact_email"
          value={form.contact_email}
          onChange={handleChange}
          type="email"
          className={inputClass}
          placeholder="contact@example.com"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-500 hover:underline disabled:opacity-50"
          >
            刪除此公司
          </button>
        )}
        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-4 py-2 text-sm text-[#666666] border border-[#EBE4D8] rounded-lg hover:bg-[#EBE4D8]/50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-[#819C73] text-white rounded-lg hover:bg-[#819C73]/90 disabled:opacity-50 transition-colors"
          >
            {loading ? '儲存中...' : isEdit ? '儲存變更' : '新增公司'}
          </button>
        </div>
      </div>
    </form>
  )
}
