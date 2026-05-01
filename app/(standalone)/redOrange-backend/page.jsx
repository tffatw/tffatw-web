'use client'

import { useState } from 'react'

const THEME_PRESETS = [
  { name: '晨曦森林',   subtitle: 'Forest Dawn',        primary: '#7D8F69', background: '#F9FBF7', surface: '#E5E0D5', heading: '#2D3327', body: '#5C5C5C' },
  { name: '金色曙光',   subtitle: 'Golden Hour Glow',   primary: '#D4A373', background: '#FEFAF3', surface: '#F2E9E4', heading: '#3E362E', body: '#7A7169' },
  { name: '清晨露珠',   subtitle: 'Morning Dewdrop',    primary: '#98AFA1', background: '#F5F7F8', surface: '#E1E5E9', heading: '#2F363F', body: '#6B7280' },
  { name: '薰衣草晨光', subtitle: 'Hazy Lavender',      primary: '#A5A5BA', background: '#F8F9FD', surface: '#EDEAF0', heading: '#312E3B', body: '#6D6D6D' },
  { name: '曠野之晨',   subtitle: 'Wilderness Morning', primary: '#B58463', background: '#FDFCF8', surface: '#F1EDE2', heading: '#3D342F', body: '#766F6A' },
  { name: '晨霧海岸',   subtitle: 'Misty Shore',        primary: '#7B9CAC', background: '#F7F9FB', surface: '#E8EEF2', heading: '#2C3E50', body: '#5D6D7E' },
]

const initialBrand = {
  logo: '',
  slogan: '',
  story: '',
  theme: { ...THEME_PRESETS[0] },
  address: '',
  businessHours: '',
  socialLinks: { instagram: '', facebook: '', line: '' },
}

function InputField({ id, label, type = 'text', placeholder, value, onChange, note }) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block" style={{ color: '#111111' }}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-2.5 outline-none border text-sm"
        style={{ background: '#f3f3f5', borderColor: 'rgba(0,0,0,0.1)', color: '#111111' }}
        onFocus={e => (e.target.style.borderColor = '#7D8F69')}
        onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
      />
      {note && <p className="text-xs mt-1.5" style={{ color: '#717182' }}>{note}</p>}
    </div>
  )
}

const UploadButton = ({ label, note, icon }) => (
  <div>
    <label className="text-sm font-medium mb-2 block" style={{ color: '#111111' }}>{label}</label>
    <button
      className="w-full border-2 border-dashed rounded-lg p-6 transition-colors text-center"
      style={{ borderColor: 'rgba(0,0,0,0.15)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#7D8F69')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')}
    >
      {icon}
      <p className="text-sm" style={{ color: '#717182' }}>{note}</p>
    </button>
  </div>
)

const uploadIcon = (
  <svg className="w-6 h-6 mx-auto mb-2" style={{ color: '#717182' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
)

export default function RedOrangeBackendPage() {
  const [brand, setBrand] = useState(initialBrand)

  const update = (patch) => setBrand(b => ({ ...b, ...patch }))
  const updateSocial = (key, value) => setBrand(b => ({ ...b, socialLinks: { ...b.socialLinks, [key]: value } }))

  return (
    <div className="min-h-screen" style={{ background: '#ffffff', color: '#111111', fontFamily: 'system-ui, sans-serif' }}>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-10 border-b" style={{ background: '#ffffff', borderColor: 'rgba(0,0,0,0.1)' }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium" style={{ color: '#111111' }}>品牌設定</h1>
            <p className="text-sm mt-0.5" style={{ color: '#717182' }}>打造您的品牌形象，即時預覽每個變更</p>
          </div>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#111111' }}
            onClick={() => console.log('Saving brand data:', JSON.parse(JSON.stringify(brand)))}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            儲存變更
          </button>
        </div>
      </header>

      {/* MAIN SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 'calc(100vh - 73px)' }}>

        {/* LEFT: EDITOR */}
        <div className="border-r overflow-y-auto" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          <div className="p-6 space-y-8">

            {/* Section 1: 品牌標誌設定 */}
            <section>
              <div className="mb-6">
                <h2 className="text-base font-medium" style={{ color: '#111111' }}>品牌標誌設定</h2>
                <p className="text-sm mt-1" style={{ color: '#717182' }}>建議使用透明背景的 PNG 檔，尺寸至少 500×500px</p>
              </div>
              <div className="space-y-5">
                <UploadButton label="品牌 Logo" note="點擊上傳或拖曳檔案" icon={uploadIcon} />
                <UploadButton label="網站圖標 (Favicon)" note="顯示在瀏覽器分頁上的小圖示" icon={
                  <svg className="w-5 h-5 mx-auto mb-1.5" style={{ color: '#717182' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                } />
                <UploadButton label="首頁封面圖片" note="最多上傳 5 張圖片進行輪播" icon={uploadIcon} />
              </div>
            </section>

            <div className="border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}></div>

            {/* Section 2: 品牌文案編輯 */}
            <section>
              <div className="mb-6">
                <h2 className="text-base font-medium" style={{ color: '#111111' }}>品牌文案編輯</h2>
                <p className="text-sm mt-1" style={{ color: '#717182' }}>用一句話抓住客人的心，描述您的品牌故事</p>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#111111' }}>品牌 Slogan</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="晨曦中的第一口溫暖"
                      maxLength={30}
                      value={brand.slogan}
                      onChange={e => update({ slogan: e.target.value })}
                      className="w-full rounded-lg px-4 py-2.5 pr-12 outline-none border text-sm"
                      style={{ background: '#f3f3f5', borderColor: 'rgba(0,0,0,0.1)', color: '#111111' }}
                      onFocus={e => (e.target.style.borderColor = '#7D8F69')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors"
                      title="AI 優化文案"
                      onClick={() => console.log('AI optimize slogan (Demo mode)')}
                      onMouseEnter={e => (e.currentTarget.style.background = '#e9ebef')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <svg className="w-4 h-4" style={{ color: '#7D8F69' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: '#717182' }}>{brand.slogan.length}/30 字 · 建議 15 字以內</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#111111' }}>品牌故事</label>
                  <textarea
                    placeholder="描述您的店鋪歷史與堅持..."
                    rows={6}
                    maxLength={300}
                    value={brand.story}
                    onChange={e => update({ story: e.target.value })}
                    className="w-full rounded-lg px-4 py-3 outline-none border text-sm resize-none"
                    style={{ background: '#f3f3f5', borderColor: 'rgba(0,0,0,0.1)', color: '#111111' }}
                    onFocus={e => (e.target.style.borderColor = '#7D8F69')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                  />
                  <p className="text-xs mt-1.5" style={{ color: '#717182' }}>{brand.story.length}/300 字 · 建議分段敘述</p>
                </div>

                {/* Theme presets */}
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#111111' }}>主題色系</label>
                  <p className="text-xs mb-4" style={{ color: '#717182' }}>點擊套用完整配色方案，包含主色、背景、文字階層</p>
                  <div className="space-y-3">
                    {THEME_PRESETS.map(preset => (
                      <button key={preset.name} className="w-full text-left" onClick={() => update({ theme: { ...preset } })}>
                        <div
                          className="relative rounded-lg p-4 transition-all border-2"
                          style={{ backgroundColor: preset.background, borderColor: brand.theme.name === preset.name ? preset.primary : 'transparent' }}
                        >
                          <div className="flex gap-2 mb-3">
                            {[preset.primary, preset.background, preset.surface, preset.heading, preset.body].map((c, j) => (
                              <div key={j} className="h-8 w-8 rounded-md" style={{ background: c, border: j === 1 ? '1px solid rgba(0,0,0,0.08)' : undefined }} />
                            ))}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: preset.heading }}>{preset.name}</p>
                            <p className="text-xs" style={{ color: preset.body }}>{preset.subtitle}</p>
                          </div>
                          {brand.theme.name === preset.name && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: preset.primary }}>
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}></div>

            {/* Section 3: 聯絡資訊與營業設定 */}
            <section>
              <div className="mb-6">
                <h2 className="text-base font-medium" style={{ color: '#111111' }}>聯絡資訊與營業設定</h2>
                <p className="text-sm mt-1" style={{ color: '#717182' }}>讓客人輕鬆找到您，建立信任與互動</p>
              </div>
              <div className="space-y-5">
                <InputField id="address" label="店鋪地址" placeholder="台北市信義區信義路五段 7 號" value={brand.address} onChange={e => update({ address: e.target.value })} note="我們將自動為您在地圖上標註位置" />
                <InputField id="hours" label="營業時間" placeholder="週一至週五 07:00 - 14:00" value={brand.businessHours} onChange={e => update({ businessHours: e.target.value })} note="支援彈性設定" />

                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: '#111111' }}>社群連結</label>
                  <p className="text-xs mb-3" style={{ color: '#717182' }}>填入您的粉絲專頁網址，增強品牌互動</p>
                  <div className="space-y-3">
                    {[
                      { key: 'instagram', placeholder: 'https://instagram.com/your_shop', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                      { key: 'facebook', placeholder: 'https://facebook.com/your_shop', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                      { key: 'line', placeholder: 'https://line.me/ti/p/your_line_id', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
                    ].map(({ key, placeholder, icon }) => (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#e9ebef' }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.8">{icon}</svg>
                        </div>
                        <input
                          type="url"
                          placeholder={placeholder}
                          value={brand.socialLinks[key]}
                          onChange={e => updateSocial(key, e.target.value)}
                          className="flex-1 rounded-lg px-4 py-2.5 outline-none border text-sm"
                          style={{ background: '#f3f3f5', borderColor: 'rgba(0,0,0,0.1)', color: '#111111' }}
                          onFocus={e => (e.target.style.borderColor = '#7D8F69')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="overflow-y-auto sticky" style={{ top: 73, height: 'calc(100vh - 73px)', background: 'rgba(236,236,240,0.3)' }}>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-sm" style={{ color: '#717182' }}>即時預覽</h3>
            </div>

            <div className="rounded-xl border overflow-hidden shadow-sm" style={{ backgroundColor: brand.theme.background, borderColor: brand.theme.primary + '30' }}>
              {/* Hero */}
              <div className="relative h-64 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${brand.theme.surface} 0%, ${brand.theme.background} 100%)` }}>
                {brand.logo ? (
                  <img src={brand.logo} alt="Brand Logo" className="max-h-24 max-w-[200px] object-contain" />
                ) : (
                  <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed" style={{ backgroundColor: brand.theme.surface + '80', borderColor: brand.theme.primary + '40' }}>
                    <p className="text-sm" style={{ color: brand.theme.body }}>Logo</p>
                  </div>
                )}
                {brand.slogan && (
                  <div className="absolute bottom-6 left-0 right-0 px-6">
                    <p className="text-center text-lg tracking-wide" style={{ color: brand.theme.heading }}>{brand.slogan}</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {brand.story && (
                  <div>
                    <h4 className="text-sm mb-2" style={{ color: brand.theme.heading }}>品牌故事</h4>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: brand.theme.body }}>{brand.story}</p>
                  </div>
                )}

                {(brand.address || brand.businessHours) && (
                  <div className="pt-4 border-t space-y-3" style={{ borderColor: brand.theme.primary + '20' }}>
                    {brand.address && (
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: brand.theme.primary }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <p className="text-sm" style={{ color: brand.theme.heading }}>{brand.address}</p>
                      </div>
                    )}
                    {brand.businessHours && (
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: brand.theme.primary }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <p className="text-sm" style={{ color: brand.theme.heading }}>{brand.businessHours}</p>
                      </div>
                    )}
                  </div>
                )}

                {(brand.socialLinks.instagram || brand.socialLinks.facebook || brand.socialLinks.line) && (
                  <div className="pt-4 border-t" style={{ borderColor: brand.theme.primary + '20' }}>
                    <p className="text-sm mb-3" style={{ color: brand.theme.heading }}>追蹤我們</p>
                    <div className="flex gap-3">
                      {brand.socialLinks.instagram && (
                        <a href={brand.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: brand.theme.primary + '20', color: brand.theme.primary }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                      )}
                      {brand.socialLinks.facebook && (
                        <a href={brand.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: brand.theme.primary + '20', color: brand.theme.primary }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                      )}
                      {brand.socialLinks.line && (
                        <a href={brand.socialLinks.line} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80" style={{ backgroundColor: brand.theme.primary + '20', color: brand.theme.primary }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <button
                  className="w-full py-3 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: brand.theme.primary }}
                >
                  立即預約
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg border text-xs" style={{ background: 'rgba(233,235,239,0.5)', borderColor: 'rgba(0,0,0,0.1)', color: '#717182' }}>
              ✨ 這是您品牌在網站上的呈現樣貌。每個變更都會即時反映在這裡。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
