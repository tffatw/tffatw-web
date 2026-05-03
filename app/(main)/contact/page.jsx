'use client'

import { useState } from 'react'

const faqData = [
  { question: '如何成為協會會員？', answer: '企業可以通過我們的官網提交會員申請，或直接聯繫會員服務部門。申請通過審核後，繳納相應的會費即可成為正式會員。' },
  { question: '協會會員有哪些權益？', answer: '會員可以參加協會舉辦的各類活動，獲取行業資訊，享受專業諮詢服務，參與行業標準制定，以及與其他會員建立合作關係等。' },
  { question: '如何參加協會舉辦的活動？', answer: '會員可通過官網、郵件通知了解最新活動資訊，並通過線上報名或聯繫活動負責人的方式參加活動。' },
  { question: '協會提供哪些專業培訓？', answer: '協會定期舉辦各類專業培訓課程，包括技術培訓、管理培訓、法規解讀等，旨在提升會員的專業能力和競爭力。' },
  { question: '如何與協會進行合作？', answer: '如果您希望與協會開展合作，可以通過電子郵件或電話聯繫我們，我們會與您討論具體的合作事宜。' },
]

const contactItems = [
  { iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: '辦公地址', content: '台北市內湖區新湖二路156號' },
  { iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: '電話', content: '0916-044-823' },
  { iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: '電子信箱', content: '服務諮詢: tffatw.org@gmail.com' },
  { iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: '工作時間', content: '週一至週五: 上午9:00 - 下午5:30\n週六、週日及法定節假日休息' },
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
      <section className="bg-gradient-to-br from-[#FFB84D] to-[#FFA07A] text-white pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">聯絡我們</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">隨時與我們取得聯繫，了解更多資訊或提出您的問題</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">聯絡方式</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mb-8 rounded-full" />
              <div className="space-y-6">
                {contactItems.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-[#FFF5E6] p-3 rounded-xl mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-[#FFB84D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.iconPath.split(' M').filter(Boolean).map((p, j) => (
                          <path key={j} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={j === 0 ? p : `M${p}`} />
                        ))}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2C3E50] mb-1">{item.title}</h3>
                      <p className="text-[#6B7280] whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">關注我們</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/groups/152691983155490"
                    className="bg-[#FFF5E6] p-3 rounded-full hover:bg-[#FFB84D] hover:text-white text-[#FFB84D] transition-colors"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">給我們留言</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mb-8 rounded-full" />
              <form onSubmit={submitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">您的姓名 *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">電子郵箱 *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">聯絡電話</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">主題 *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB84D] focus:border-[#FFB84D]">
                    <option value="">請選擇主題...</option>
                    <option value="general">一般諮詢</option>
                    <option value="membership">會員事務</option>
                    <option value="cooperation">合作洽談</option>
                    <option value="media">媒體合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C3E50] mb-1">留言內容 *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB84D] focus:border-[#FFB84D]" />
                </div>
                <div className="flex items-start">
                  <input type="checkbox" name="privacy" checked={form.privacy} onChange={handleChange} required className="mt-1 h-4 w-4 accent-[#FFB84D] border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-[#6B7280]">我同意協會根據<a href="#" className="text-[#FFB84D] hover:underline">隱私政策</a>處理我的個人資訊 *</label>
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                  {submitting ? '提交中...' : '提交留言'}
                </button>
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <section className="py-12 bg-gradient-to-br from-[#F9F9F9] to-[#FFF5E6]">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#2C3E50]">我們的位置</h2>
          </div>
          <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=台北市內湖區新湖二路156號&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center text-[#6B7280]">
            <p>地址：台北市內湖區新湖二路156號</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">常見問題</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FFA07A] mx-auto rounded-full" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, i) => (
              <div key={i} className="border border-[#FFB84D]/20 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-[#FFF5E6] text-left transition-colors"
                >
                  <span className="font-medium text-[#2C3E50]">{faq.question}</span>
                  <svg className={`w-5 h-5 text-[#FFB84D] flex-shrink-0 ml-4 transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 bg-white border-t border-[#FFB84D]/10">
                    <p className="text-[#6B7280] pt-4 leading-relaxed">{faq.answer}</p>
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
