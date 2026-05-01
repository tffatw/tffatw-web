'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { name: '首頁', href: '#home' },
  { name: '品牌故事', href: '#about' },
  { name: '最新消息', href: '#news' },
  { name: '服務項目', href: '#services' },
  { name: '聯絡我們', href: '#contact' },
]

const HERO_IMG      = 'https://images.unsplash.com/photo-1595072246101-609814a3e902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80'
const OLD_STORE_IMG = 'https://images.unsplash.com/photo-1759330337849-c3df71294f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80'
const CAFE_IMG      = 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80'

const NEWS = [
  { tag: '活動', tagClass: 'bg-[#819C73] text-white', title: '晨曦週末市集限定餐盒', date: '2026.04.15', desc: '本週末我們將參與城市綠林市集，推出市集限定的野餐餐盒，數量有限，歡迎來找我們玩！' },
  { tag: '公告', tagClass: 'bg-[#B8860B] text-white', title: '春季新菜單全面上線', date: '2026.04.09', desc: '嚴選春季盛產的小農鮮蔬，搭配清爽的油醋沙拉，全新十款早午餐拼盤等您來品嚐。' },
  { tag: '活動', tagClass: 'bg-[#819C73] text-white', title: '職人手沖咖啡分享會', date: '2026.04.22', desc: '邀請知名烘豆師親臨現場，帶領大家認識不同產區的咖啡風味，並體驗手沖樂趣。' },
]

const MENU_ITEMS = [
  { name: '晨曦經典早午餐盤',    sub: '農場直送生菜、德式香腸、太陽蛋、天然酵母酸種麵包',  hot: true,  price: '$320' },
  { name: '酪梨烤吐司與手作果醬', sub: '新鮮酪梨泥、水波蛋、初榨橄欖油、自製季節野莓果醬',  hot: false, price: '$280' },
  { name: '森林野菇松露濃湯',     sub: '四種慢熬野菇、頂級黑松露油、附法式切片長棍',        hot: true,  price: '$180' },
  { name: '焦糖海鹽拿鐵',        sub: '自家烘焙中深焙豆、法國海鹽、手熬焦糖醬',            hot: true,  price: '$160' },
  { name: '手作西西里檸檬塔',    sub: '屏東新鮮綠檸檬、法式發酵奶油塔皮',                  hot: false, price: '$150' },
]

function scrollToSection(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function RedOrangePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#F5F5F0', color: '#333333', fontFamily: "'Noto Sans TC', sans-serif" }}>

      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 border-b" style={{ background: 'rgba(245,245,240,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#819C73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            <span style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em', color: '#333333' }}>
              晨曦 Brunch
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#819C73]"
                style={{ color: 'rgba(51,51,51,0.75)' }}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 transition-colors bg-transparent border-0"
            style={{ color: 'rgba(51,51,51,0.75)' }}
            onClick={() => setIsMobileMenuOpen(o => !o)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t" style={{ background: '#F5F5F0', borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="flex flex-col py-4 px-6 gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-3 font-medium text-lg border-b last:border-0 transition-colors"
                  style={{ color: 'rgba(51,51,51,0.8)', borderColor: 'rgba(0,0,0,0.06)' }}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); setIsMobileMenuOpen(false) }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">

        {/* HERO */}
        <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">
            <div className="space-y-8 max-w-lg reveal reveal-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight" style={{ fontFamily: "'Noto Serif TC', serif", fontWeight: 700, color: '#333333' }}>
                晨曦佐餐，<br />
                <span style={{ color: '#819C73' }}>喚醒美好的每一天</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: 'rgba(51,51,51,0.7)' }}>
                嚴選在地食材，結合職人手作的溫潤滋味，在城市一隅為您準備了一席溫暖。享受自然採光下的慵懶早晨。
              </p>
              <div className="pt-4">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 group hover:-translate-y-1"
                  style={{ background: '#819C73', color: '#ffffff', boxShadow: '0 8px 24px rgba(129,156,115,0.35)' }}
                  onClick={() => scrollToSection('#services')}
                >
                  查看今日菜單
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl reveal reveal-right">
              <div className="absolute inset-0 z-10" style={{ background: 'rgba(129,156,115,0.1)', mixBlendMode: 'multiply' }}></div>
              <img src={HERO_IMG} alt="自然採光的早午餐食物" className="w-full h-full object-cover object-center" />
            </div>
          </div>
          <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full blur-3xl -z-10 pointer-events-none" style={{ background: 'rgba(129,156,115,0.07)' }}></div>
          <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] rounded-full blur-3xl -z-10 pointer-events-none" style={{ background: 'rgba(184,134,11,0.05)' }}></div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4 reveal reveal-up">
              <span className="font-bold tracking-widest text-sm uppercase" style={{ color: '#B8860B' }}>Our Story</span>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '2rem', fontWeight: 700, color: '#333333' }}>傳承與創新</h2>
              <div className="w-16 h-1 rounded-full mx-auto mt-6" style={{ background: '#819C73', opacity: 0.8 }}></div>
            </div>

            <div className="space-y-32">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="order-2 md:order-1 relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3] reveal reveal-left">
                  <img src={OLD_STORE_IMG} alt="三十年前的老店面" className="w-full h-full object-cover" style={{ filter: 'sepia(0.3)' }} />
                </div>
                <div className="order-1 md:order-2 space-y-6 reveal reveal-right">
                  <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '1.5rem', fontWeight: 700, color: '#333333' }}>歲月沈澱的溫暖味道</h3>
                  <p className="leading-relaxed text-lg font-light" style={{ color: 'rgba(51,51,51,0.7)' }}>
                    源自三十年前街角的那間老麵包舖。我們保留了手作的初衷，堅持最純粹的食材原味。那些在清晨揉捏麵團的日子，為今日的晨曦打下了堅實的基礎。
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="space-y-6 reveal reveal-left">
                  <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '1.5rem', fontWeight: 700, color: '#333333' }}>當代質感的全新演繹</h3>
                  <p className="leading-relaxed text-lg font-light" style={{ color: 'rgba(51,51,51,0.7)' }}>
                    隨著時光流轉，我們將經典滋味重新設計。以明亮自然採光的質感空間，搭配講究器皿與充滿呼吸感的座位編排，期待與您共享更美好的晨間時光。
                  </p>
                </div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3] reveal reveal-right">
                  <img src={CAFE_IMG} alt="當代質感的咖啡廳空間" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section id="news" className="py-24 relative" style={{ background: '#F5F5F0' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal reveal-up">
              <div className="space-y-4">
                <span className="font-bold tracking-widest text-sm uppercase" style={{ color: '#B8860B' }}>Latest Updates</span>
                <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '2rem', fontWeight: 700, color: '#333333' }}>最新消息</h2>
                <div className="w-16 h-1 rounded-full mt-4" style={{ background: '#819C73', opacity: 0.8 }}></div>
              </div>
              <button className="inline-flex items-center gap-1 font-medium transition-colors bg-transparent border-0 p-0" style={{ color: '#819C73' }}>
                查看全部
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {NEWS.map((news, i) => (
                <div
                  key={i}
                  className="rounded-[1.5rem] p-8 flex flex-col h-full transition-all duration-300 border reveal reveal-up"
                  style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', transitionDelay: `${i * 80}ms` }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)')}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`${news.tagClass} px-3 py-1 rounded-full text-xs font-bold tracking-wide`}>{news.tag}</span>
                    <span className="text-sm font-medium" style={{ color: 'rgba(51,51,51,0.5)' }}>{news.date}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#333333' }}>{news.title}</h4>
                  <p className="text-sm leading-relaxed mb-6 flex-grow font-light" style={{ color: 'rgba(51,51,51,0.7)' }}>{news.desc}</p>
                  <div className="mt-auto">
                    <span className="text-sm font-medium cursor-pointer inline-flex items-center gap-1" style={{ color: '#B8860B' }}>
                      閱讀詳情
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENU / SERVICES */}
        <section id="services" className="py-24 bg-white relative">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4 reveal reveal-up">
              <span className="font-bold tracking-widest text-sm uppercase" style={{ color: '#B8860B' }}>Menu Highlights</span>
              <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '2rem', fontWeight: 700, color: '#333333' }}>經典餐點與服務</h2>
              <p className="max-w-lg mx-auto mt-4 font-light" style={{ color: 'rgba(51,51,51,0.6)' }}>
                我們提供全天候的早午餐服務、手作烘焙與精品咖啡。以下是我們最受歡迎的精選品項。
              </p>
            </div>

            <div className="rounded-[2rem] p-8 md:p-12 border reveal reveal-up" style={{ background: '#F5F5F0', borderColor: 'rgba(0,0,0,0.06)' }}>
              <ul className="space-y-6">
                {MENU_ITEMS.map((item, i) => (
                  <li key={i}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 rounded-xl transition-colors duration-300 hover:bg-white">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold" style={{ color: '#333333' }}>{item.name}</h4>
                          {item.hot && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: '#819C73', background: 'rgba(129,156,115,0.12)' }}>
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                              </svg>
                              推薦
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-light" style={{ color: 'rgba(51,51,51,0.6)' }}>{item.sub}</p>
                      </div>
                      <div className="font-bold text-lg sm:text-right" style={{ fontFamily: "'Noto Serif TC', serif", color: '#B8860B' }}>{item.price}</div>
                    </div>
                    {i < MENU_ITEMS.length - 1 && <div className="h-px mx-4 mt-2" style={{ background: 'rgba(0,0,0,0.07)' }}></div>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 relative overflow-hidden" style={{ background: '#F5F5F0' }}>
          <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none" style={{ background: 'rgba(129,156,115,0.05)', transform: 'skewX(-12deg) translateX(50%)', transformOrigin: 'top right' }}></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
              <div className="space-y-10 reveal reveal-left">
                <div className="space-y-4">
                  <h2 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '2rem', fontWeight: 700, color: '#333333' }}>與我們聯繫</h2>
                  <p className="font-light leading-relaxed" style={{ color: 'rgba(51,51,51,0.7)' }}>
                    有任何場地租借、包場活動或餐點相關的疑問嗎？<br />
                    歡迎留下您的訊息，我們將盡快回覆您。
                  </p>
                </div>

                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  {[
                    { id: 'ro-name', label: '您的姓名', type: 'text', placeholder: '王小明' },
                    { id: 'ro-email', label: '電子信箱', type: 'email', placeholder: 'example@email.com' },
                  ].map(field => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="text-sm font-medium" style={{ color: 'rgba(51,51,51,0.8)' }}>{field.label}</label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                        style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.12)', color: '#333333' }}
                        onFocus={e => { e.target.style.borderColor = '#819C73'; e.target.style.boxShadow = '0 0 0 3px rgba(129,156,115,0.15)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <label htmlFor="ro-msg" className="text-sm font-medium" style={{ color: 'rgba(51,51,51,0.8)' }}>留言內容</label>
                    <textarea
                      id="ro-msg"
                      rows={4}
                      placeholder="請輸入您的訊息..."
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none"
                      style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.12)', color: '#333333' }}
                      onFocus={e => { e.target.style.borderColor = '#819C73'; e.target.style.boxShadow = '0 0 0 3px rgba(129,156,115,0.15)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors"
                    style={{ background: '#819C73', color: '#ffffff', boxShadow: '0 8px 24px rgba(129,156,115,0.3)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                    發送訊息
                  </button>
                </form>
              </div>

              <div className="h-full flex flex-col reveal reveal-right">
                <div className="rounded-[2rem] p-8 border flex-1 flex flex-col" style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '1.4rem', fontWeight: 700, color: '#333333' }} className="mb-6">實體店面</h3>
                  <div className="space-y-6 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full shrink-0" style={{ background: 'rgba(129,156,115,0.12)', color: '#819C73' }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#333333' }}>地址</h4>
                        <p className="font-light" style={{ color: 'rgba(51,51,51,0.7)' }}>台北市大安區光復南路 100 號 1 樓</p>
                      </div>
                    </div>
                    <div
                      className="w-full h-64 rounded-xl flex items-center justify-center mt-4 border cursor-pointer transition-colors"
                      style={{ background: '#ececf0', borderColor: 'rgba(0,0,0,0.08)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#819C73')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)')}
                    >
                      <div className="px-6 py-3 rounded-full font-medium flex items-center gap-2 border transition-colors" style={{ background: 'rgba(255,255,255,0.9)', color: '#819C73', borderColor: 'rgba(129,156,115,0.3)' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        點擊開啟 Google Maps
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t py-12" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#819C73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            <span style={{ fontFamily: "'Noto Serif TC', serif", fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', color: '#333333' }}>晨曦 Brunch</span>
          </div>
          <p className="text-sm font-light text-center md:text-left" style={{ color: 'rgba(51,51,51,0.5)' }}>
            &copy; 2026 晨曦 Brunch. All rights reserved.
          </p>
          <div className="flex items-center gap-4" style={{ color: 'rgba(51,51,51,0.5)' }}>
            <a href="#" className="text-sm transition-colors hover:text-[#819C73]">隱私權政策</a>
            <span>|</span>
            <a href="#" className="text-sm transition-colors hover:text-[#819C73]">服務條款</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
