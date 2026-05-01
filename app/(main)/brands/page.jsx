'use client'

import { useState } from 'react'
import Link from 'next/link'

const brandCategories = [
  { label: '早餐', value: '早餐' },
  { label: '健康餐盒', value: '健康餐盒' },
  { label: '服務業', value: '服務業' },
  { label: '金融機構', value: '金融機構' },
  { label: '媒體機構', value: '媒體機構' },
]

const brands = [
  { id: 1, name: '紅橘子', logo: '/images/redorange.png', category: '早餐', description: '紅橘子，開啟你幸福的每一天。我們為了幸福而開店，當然也要每天都很幸福。', website: 'https://www.redorange.com.tw/' },
  { id: 2, name: '少點鹽', logo: '/images/saltless.png', category: '健康餐盒', description: '少點鹽健康餐盒專賣，顛覆傳統水煮餐盒印象，當天新鮮食材現烹調，少油少鹽呈現食物的原味，每口都新鮮，簡單卻又不失美味。', website: 'https://www.healthittaipei.com.tw' },
]

const processSteps = [
  { step: 1, title: '提交申請', desc: '填寫合作夥伴申請表，提交企業基本資訊和合作意向' },
  { step: 2, title: '資質審核', desc: '協會秘書處審核企業資質和合作條件' },
  { step: 3, title: '簽署協議', desc: '確定合作內容，簽署合作協議' },
  { step: 4, title: '正式合作', desc: '開始享受合作夥伴權益，參與協會活動' },
]

export default function BrandsPage() {
  const [currentCategory, setCurrentCategory] = useState('all')
  const filteredBrands = currentCategory === 'all' ? brands : brands.filter(b => b.category === currentCategory)

  return (
    <div>
      <section className="bg-blue-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">合作品牌</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">攜手行業領先企業，共同促進行業發展</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">我們的合作夥伴</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">我們與行業內眾多知名企業建立了緊密的合作關係，共同推動行業創新與發展</p>
          </div>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>全部</button>
            {brandCategories.map(cat => (
              <button key={cat.value} onClick={() => setCurrentCategory(cat.value)} className={`px-4 py-2 rounded-full text-sm font-medium ${currentCategory === cat.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{cat.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map(brand => (
              <div key={brand.id} className="card p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <img src={brand.logo} alt={brand.name} className="h-20 object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{brand.category}</p>
                <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                <div className="text-center">
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm font-medium">訪問官網 →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">合作優勢</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">加入我們，共享資源，共創價值</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '廣泛的行業網絡', desc: '與行業內500多家會員單位建立聯繫，拓展商業合作機會，共享優質資源。', path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { title: '專業影響力', desc: '提升品牌在行業內的專業形象和影響力，參與行業標準制定，引領行業發展。', path: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
              { title: '品牌推廣', desc: '通過協會平台和活動，獲得品牌曝光和推廣機會，接觸潛在客戶和合作夥伴。', path: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
            ].map((item, i) => (
              <div key={i} className="card p-8">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.path} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">如何成為合作夥伴</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {processSteps.map((s, i) => (
              <>
                <div key={s.step} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{s.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{s.title}</h3>
                  <p className="text-gray-600 max-w-xs mx-auto">{s.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div key={`arrow-${i}`} className="hidden md:block self-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn btn-primary">聯絡我們，成為合作夥伴</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
