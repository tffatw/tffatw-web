'use client'

import { useState } from 'react'

const faqData = [
  { question: '如何成為協會會員？', answer: '企業可以通過我們的官網提交會員申請，或直接聯繫會員服務部門。申請通過審核後，繳納相應的會費即可成為正式會員。' },
  { question: '協會會員有哪些權益？', answer: '會員可以參加協會舉辦的各類活動，獲取行業資訊，享受專業諮詢服務，參與行業標準制定，以及與其他會員建立合作關係等。' },
  { question: '如何參加協會舉辦的活動？', answer: '會員可通過官網、郵件通知了解最新活動資訊，並通過線上報名或聯繫活動負責人的方式參加活動。' },
  { question: '協會提供哪些專業培訓？', answer: '協會定期舉辦各類專業培訓課程，包括技術培訓、管理培訓、法規解讀等，旨在提升會員的專業能力和競爭力。' },
  { question: '如何與協會進行合作？', answer: '如果您希望與協會開展合作，可以通過電子郵件或電話聯繫我們，我們會與您討論具體的合作事宜。' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', privacy: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const submitForm = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/mvzloloy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          姓名: form.name,
          信箱: form.email,
          電話: form.phone,
          主題: form.subject,
          留言: form.message,
        }),
      })
      if (res.ok) {
        setSubmitSuccess(true)
        setForm({ name: '', email: '', phone: '', subject: '', message: '', privacy: false })
        setTimeout(() => setSubmitSuccess(false), 3000)
      } else {
        alert('提交失敗，請稍後再試或直接來信 tffatw.org@gmail.com')
      }
    } catch {
      alert('網路錯誤，請稍後再試或直接來信 tffatw.org@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">聯絡我們</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">隨時與我們取得聯繫，了解更多資訊或提出您的問題</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">聯絡方式</h2>
              <div className="w-20 h-1 bg-[#FFB84D] mb-8"></div>
              <div className="space-y-6">
                {[
                  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: '辦公地址', content: '台北市松山區塔悠路303號' },
                  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: '電話', content: '0916-044-823' },
                  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: '電子信箱', content: '服務諮詢: tffatw.org@gmail.com' },
                  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: '工作時間', content: '週一至週五: 上午9:00 - 下午5:30\n週六、週日及法定節假日休息' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-[#FFF5E6] p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-[#FFB84D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.icon.split(' ').length > 1 ? (
                          item.icon.split('M').filter(Boolean).map((p, j) => (
                            <path key={j} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M${p}`} />
                          ))
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        )}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">關注我們</h3>
                <div className="flex space-x-4">
                  {[
                    { href: 'https://www.facebook.com/groups/152691983155490', d: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z' },
                    { href: '#', d: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                    { href: '#', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                    { href: '#', d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} className="bg-gray-100 p-3 rounded-full hover:bg-[#FFF5E6] hover:text-[#FFB84D] transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">給我們留言</h2>
              <div className="w-20 h-1 bg-[#FFB84D] mb-8"></div>
              <form onSubmit={submitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">您的姓名 *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">電子郵箱 *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">主題 *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFB84D] focus:border-[#FFB84D]">
                    <option value="">請選擇主題...</option>
                    <option value="general">一般諮詢</option>
                    <option value="membership">會員事務</option>
                    <option value="cooperation">合作洽談</option>
                    <option value="media">媒體合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">留言內容 *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                </div>
                <div className="flex items-start">
                  <input type="checkbox" name="privacy" checked={form.privacy} onChange={handleChange} required className="mt-1 h-4 w-4 text-[#FFB84D] border-gray-300 rounded focus:ring-[#FFB84D]" />
                  <label className="ml-2 block text-sm text-gray-600">我同意協會根據<a href="#" className="text-[#FFB84D] hover:underline">隱私政策</a>處理我的個人資訊 *</label>
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-[#2C3E50] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-60">
                  {submitting ? '提交中...' : '提交留言'}
                </button>
                {submitSuccess && (
                  <div className="bg-green-100 p-4 rounded-md flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700">您的留言已成功提交，我們將盡快與您聯繫。</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">我們的位置</h2>
          </div>
          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://maps.google.com/maps?q=台北市松山區塔悠路303號&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center text-gray-600">
            <p>地址：台北市松山區塔悠路303號</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">常見問題</h2>
            <div className="w-20 h-1 bg-[#FFB84D] mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqData.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-4 bg-gray-50 text-left">
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <svg className={`w-5 h-5 transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
