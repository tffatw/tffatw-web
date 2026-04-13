<script setup>
import { reactive } from 'vue'

// ── Theme presets (task 2.3) ───────────────────────────────────
const THEME_PRESETS = [
  { name: '晨曦森林',  subtitle: 'Forest Dawn',        primary: '#7D8F69', background: '#F9FBF7', surface: '#E5E0D5', heading: '#2D3327', body: '#5C5C5C' },
  { name: '金色曙光',  subtitle: 'Golden Hour Glow',   primary: '#D4A373', background: '#FEFAF3', surface: '#F2E9E4', heading: '#3E362E', body: '#7A7169' },
  { name: '清晨露珠',  subtitle: 'Morning Dewdrop',    primary: '#98AFA1', background: '#F5F7F8', surface: '#E1E5E9', heading: '#2F363F', body: '#6B7280' },
  { name: '薰衣草晨光', subtitle: 'Hazy Lavender',     primary: '#A5A5BA', background: '#F8F9FD', surface: '#EDEAF0', heading: '#312E3B', body: '#6D6D6D' },
  { name: '曠野之晨',  subtitle: 'Wilderness Morning', primary: '#B58463', background: '#FDFCF8', surface: '#F1EDE2', heading: '#3D342F', body: '#766F6A' },
  { name: '晨霧海岸',  subtitle: 'Misty Shore',        primary: '#7B9CAC', background: '#F7F9FB', surface: '#E8EEF2', heading: '#2C3E50', body: '#5D6D7E' },
]

// ── Reactive brand state (task 2.2) ───────────────────────────
const brandData = reactive({
  logo: '',
  favicon: '',
  heroImages: [],
  slogan: '',
  story: '',
  theme: { ...THEME_PRESETS[0] },
  address: '',
  businessHours: '',
  socialLinks: {
    instagram: '',
    facebook: '',
    line: '',
  },
})

// ── Actions ───────────────────────────────────────────────────
function handleSave() {
  console.log('Saving brand data:', JSON.parse(JSON.stringify(brandData)))
}

function handleAIOptimize() {
  console.log('AI optimize slogan (Demo mode)')
}

function selectTheme(preset) {
  Object.assign(brandData.theme, preset)
}
</script>

<template>
  <div class="min-h-screen" style="background: #ffffff; color: #111111; font-family: system-ui, sans-serif">

    <!-- ══════════════════════════════
         STICKY HEADER (tasks 3.1–3.2)
    ══════════════════════════════ -->
    <header
      class="sticky top-0 z-10 border-b"
      style="background: #ffffff; border-color: rgba(0,0,0,0.1)"
    >
      <div class="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-medium" style="color: #111111">品牌設定</h1>
          <p class="text-sm mt-0.5" style="color: #717182">打造您的品牌形象，即時預覽每個變更</p>
        </div>
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
          style="background: #111111"
          @click="handleSave"
        >
          <!-- Save icon -->
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          儲存變更
        </button>
      </div>
    </header>

    <!-- ══════════════════════════════
         MAIN: LEFT + RIGHT SPLIT
    ══════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-2" style="min-height: calc(100vh - 73px)">

      <!-- ────────────────────────────
           LEFT: EDITOR PANEL
      ──────────────────────────── -->
      <div class="border-r overflow-y-auto" style="border-color: rgba(0,0,0,0.1)">
        <div class="p-6 space-y-8">

          <!-- ■ Section 1: 品牌標誌設定 (tasks 4.1–4.3) -->
          <section>
            <div class="mb-6">
              <h2 class="text-base font-medium" style="color: #111111">品牌標誌設定</h2>
              <p class="text-sm mt-1" style="color: #717182">建議使用透明背景的 PNG 檔，尺寸至少 500×500px</p>
            </div>

            <div class="space-y-5">
              <!-- Logo upload -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">品牌 Logo</label>
                <button
                  class="w-full border-2 border-dashed rounded-lg p-6 transition-colors text-center"
                  style="border-color: rgba(0,0,0,0.15)"
                  @mouseenter="(e) => (e.currentTarget.style.borderColor = '#7D8F69')"
                  @mouseleave="(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')"
                >
                  <!-- Upload icon -->
                  <svg class="w-6 h-6 mx-auto mb-2" style="color: #717182" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  <p class="text-sm" style="color: #717182">點擊上傳或拖曳檔案</p>
                  <p class="text-xs mt-1" style="color: #717182">支援彩色版與單色版</p>
                </button>
              </div>

              <!-- Favicon upload -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">網站圖標 (Favicon)</label>
                <button
                  class="w-full border-2 border-dashed rounded-lg p-4 transition-colors text-center"
                  style="border-color: rgba(0,0,0,0.15)"
                  @mouseenter="(e) => (e.currentTarget.style.borderColor = '#7D8F69')"
                  @mouseleave="(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')"
                >
                  <svg class="w-5 h-5 mx-auto mb-1.5" style="color: #717182" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p class="text-sm" style="color: #717182">顯示在瀏覽器分頁上的小圖示</p>
                </button>
              </div>

              <!-- Hero images upload -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">首頁封面圖片</label>
                <button
                  class="w-full border-2 border-dashed rounded-lg p-6 transition-colors text-center"
                  style="border-color: rgba(0,0,0,0.15)"
                  @mouseenter="(e) => (e.currentTarget.style.borderColor = '#7D8F69')"
                  @mouseleave="(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')"
                >
                  <svg class="w-6 h-6 mx-auto mb-2" style="color: #717182" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <p class="text-sm" style="color: #717182">最多上傳 5 張圖片進行輪播</p>
                  <p class="text-xs mt-1" style="color: #717182">建議選取具備晨曦自然光風格的照片</p>
                </button>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t" style="border-color: rgba(0,0,0,0.1)"></div>

          <!-- ■ Section 2: 品牌文案編輯 (tasks 5.1–5.3) -->
          <section>
            <div class="mb-6">
              <h2 class="text-base font-medium" style="color: #111111">品牌文案編輯</h2>
              <p class="text-sm mt-1" style="color: #717182">用一句話抓住客人的心，描述您的品牌故事</p>
            </div>

            <div class="space-y-5">
              <!-- Slogan -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">品牌 Slogan</label>
                <div class="relative">
                  <input
                    v-model="brandData.slogan"
                    type="text"
                    placeholder="晨曦中的第一口溫暖"
                    maxlength="30"
                    class="w-full rounded-lg px-4 py-2.5 pr-12 outline-none border text-sm"
                    style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                    @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                    @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                  />
                  <!-- Wand2 / AI button -->
                  <button
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-colors"
                    title="AI 優化文案"
                    @click="handleAIOptimize"
                    @mouseenter="(e) => (e.currentTarget.style.background = '#e9ebef')"
                    @mouseleave="(e) => (e.currentTarget.style.background = 'transparent')"
                  >
                    <svg class="w-4 h-4" style="color: #7D8F69" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/>
                    </svg>
                  </button>
                </div>
                <p class="text-xs mt-1.5" style="color: #717182">{{ brandData.slogan.length }}/30 字 · 建議 15 字以內</p>
              </div>

              <!-- Story -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">品牌故事</label>
                <textarea
                  v-model="brandData.story"
                  placeholder="描述您的店鋪歷史與堅持..."
                  :rows="6"
                  maxlength="300"
                  class="w-full rounded-lg px-4 py-3 outline-none border text-sm resize-none"
                  style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                  @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                  @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                ></textarea>
                <p class="text-xs mt-1.5" style="color: #717182">{{ brandData.story.length }}/300 字 · 建議分段敘述</p>
              </div>

              <!-- Theme presets (tasks 6.1–6.3) -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">主題色系</label>
                <p class="text-xs mb-4" style="color: #717182">點擊套用完整配色方案，包含主色、背景、文字階層</p>
                <div class="space-y-3">
                  <button
                    v-for="preset in THEME_PRESETS"
                    :key="preset.name"
                    class="w-full text-left"
                    @click="selectTheme(preset)"
                  >
                    <div
                      class="relative rounded-lg p-4 transition-all border-2"
                      :style="{
                        backgroundColor: preset.background,
                        borderColor: brandData.theme.name === preset.name ? preset.primary : 'transparent',
                      }"
                    >
                      <!-- Color swatches -->
                      <div class="flex gap-2 mb-3">
                        <div class="h-8 w-8 rounded-md" :style="{ background: preset.primary }" :title="`主色 ${preset.primary}`"></div>
                        <div class="h-8 w-8 rounded-md border" :style="{ background: preset.background, borderColor: 'rgba(0,0,0,0.08)' }" title="背景色"></div>
                        <div class="h-8 w-8 rounded-md" :style="{ background: preset.surface }" title="次背景色"></div>
                        <div class="h-8 w-8 rounded-md" :style="{ background: preset.heading }" title="標題文字"></div>
                        <div class="h-8 w-8 rounded-md" :style="{ background: preset.body }" title="內文文字"></div>
                      </div>
                      <!-- Theme name -->
                      <div>
                        <p class="text-sm font-medium" :style="{ color: preset.heading }">{{ preset.name }}</p>
                        <p class="text-xs" :style="{ color: preset.body }">{{ preset.subtitle }}</p>
                      </div>
                      <!-- Selected indicator -->
                      <div
                        v-if="brandData.theme.name === preset.name"
                        class="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                        :style="{ background: preset.primary }"
                      >
                        <div class="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <div class="border-t" style="border-color: rgba(0,0,0,0.1)"></div>

          <!-- ■ Section 3: 聯絡資訊與營業設定 (tasks 7.1–7.3) -->
          <section>
            <div class="mb-6">
              <h2 class="text-base font-medium" style="color: #111111">聯絡資訊與營業設定</h2>
              <p class="text-sm mt-1" style="color: #717182">讓客人輕鬆找到您，建立信任與互動</p>
            </div>

            <div class="space-y-5">
              <!-- Address -->
              <div>
                <label class="text-sm font-medium mb-2 flex items-center gap-2" style="color: #111111">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  店鋪地址
                </label>
                <input
                  v-model="brandData.address"
                  type="text"
                  placeholder="台北市信義區信義路五段 7 號"
                  class="w-full rounded-lg px-4 py-2.5 outline-none border text-sm"
                  style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                  @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                  @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                />
                <p class="text-xs mt-1.5" style="color: #717182">我們將自動為您在地圖上標註位置</p>
              </div>

              <!-- Business hours -->
              <div>
                <label class="text-sm font-medium mb-2 flex items-center gap-2" style="color: #111111">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  營業時間
                </label>
                <input
                  v-model="brandData.businessHours"
                  type="text"
                  placeholder="週一至週五 07:00 - 14:00"
                  class="w-full rounded-lg px-4 py-2.5 outline-none border text-sm"
                  style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                  @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                  @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                />
                <p class="text-xs mt-1.5" style="color: #717182">支援彈性設定</p>
              </div>

              <!-- Social links -->
              <div>
                <label class="text-sm font-medium mb-2 block" style="color: #111111">社群連結</label>
                <p class="text-xs mb-3" style="color: #717182">填入您的粉絲專頁網址，增強品牌互動</p>
                <div class="space-y-3">
                  <!-- Instagram -->
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: #e9ebef">
                      <!-- Instagram icon -->
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.8">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </div>
                    <input
                      v-model="brandData.socialLinks.instagram"
                      type="url"
                      placeholder="https://instagram.com/your_shop"
                      class="flex-1 rounded-lg px-4 py-2.5 outline-none border text-sm"
                      style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                      @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                      @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                    />
                  </div>
                  <!-- Facebook -->
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: #e9ebef">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.8">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </div>
                    <input
                      v-model="brandData.socialLinks.facebook"
                      type="url"
                      placeholder="https://facebook.com/your_shop"
                      class="flex-1 rounded-lg px-4 py-2.5 outline-none border text-sm"
                      style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                      @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                      @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                    />
                  </div>
                  <!-- Line -->
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: #e9ebef">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                    <input
                      v-model="brandData.socialLinks.line"
                      type="url"
                      placeholder="https://line.me/ti/p/your_line_id"
                      class="flex-1 rounded-lg px-4 py-2.5 outline-none border text-sm"
                      style="background: #f3f3f5; border-color: rgba(0,0,0,0.1); color: #111111"
                      @focus="(e) => (e.target.style.borderColor = '#7D8F69')"
                      @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <!-- ────────────────────────────
           RIGHT: PREVIEW PANEL (tasks 8.1–8.7)
      ──────────────────────────── -->
      <div
        class="overflow-y-auto sticky"
        style="top: 73px; height: calc(100vh - 73px); background: rgba(236,236,240,0.3)"
      >
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-sm" style="color: #717182">即時預覽</h3>
          </div>

          <!-- Preview card -->
          <div
            class="rounded-xl border overflow-hidden shadow-sm"
            :style="{
              backgroundColor: brandData.theme.background,
              borderColor: brandData.theme.primary + '30',
            }"
          >
            <!-- Hero Section -->
            <div
              class="relative h-64 flex items-center justify-center"
              :style="{
                background: `linear-gradient(135deg, ${brandData.theme.surface} 0%, ${brandData.theme.background} 100%)`,
              }"
            >
              <!-- Logo or placeholder -->
              <img
                v-if="brandData.logo"
                :src="brandData.logo"
                alt="Brand Logo"
                class="max-h-24 max-w-[200px] object-contain"
              />
              <div
                v-else
                class="w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed"
                :style="{
                  backgroundColor: brandData.theme.surface + '80',
                  borderColor: brandData.theme.primary + '40',
                }"
              >
                <p class="text-sm" :style="{ color: brandData.theme.body }">Logo</p>
              </div>

              <!-- Slogan overlay -->
              <div v-if="brandData.slogan" class="absolute bottom-6 left-0 right-0 px-6">
                <p
                  class="text-center text-lg tracking-wide"
                  :style="{ color: brandData.theme.heading }"
                >
                  {{ brandData.slogan }}
                </p>
              </div>
            </div>

            <!-- Content section -->
            <div class="p-6 space-y-6">
              <!-- Brand story -->
              <div v-if="brandData.story">
                <h4 class="text-sm mb-2" :style="{ color: brandData.theme.heading }">品牌故事</h4>
                <p
                  class="text-sm leading-relaxed whitespace-pre-line"
                  :style="{ color: brandData.theme.body }"
                >{{ brandData.story }}</p>
              </div>

              <!-- Contact info -->
              <div
                v-if="brandData.address || brandData.businessHours"
                class="pt-4 border-t space-y-3"
                :style="{ borderColor: brandData.theme.primary + '20' }"
              >
                <div v-if="brandData.address" class="flex gap-3">
                  <svg class="w-5 h-5 shrink-0 mt-0.5" :style="{ color: brandData.theme.primary }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <p class="text-sm" :style="{ color: brandData.theme.heading }">{{ brandData.address }}</p>
                </div>
                <div v-if="brandData.businessHours" class="flex gap-3">
                  <svg class="w-5 h-5 shrink-0 mt-0.5" :style="{ color: brandData.theme.primary }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <p class="text-sm" :style="{ color: brandData.theme.heading }">{{ brandData.businessHours }}</p>
                </div>
              </div>

              <!-- Social links -->
              <div
                v-if="brandData.socialLinks.instagram || brandData.socialLinks.facebook || brandData.socialLinks.line"
                class="pt-4 border-t"
                :style="{ borderColor: brandData.theme.primary + '20' }"
              >
                <p class="text-sm mb-3" :style="{ color: brandData.theme.heading }">追蹤我們</p>
                <div class="flex gap-3">
                  <a
                    v-if="brandData.socialLinks.instagram"
                    :href="brandData.socialLinks.instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                    :style="{ backgroundColor: brandData.theme.primary + '20', color: brandData.theme.primary }"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  <a
                    v-if="brandData.socialLinks.facebook"
                    :href="brandData.socialLinks.facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                    :style="{ backgroundColor: brandData.theme.primary + '20', color: brandData.theme.primary }"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    v-if="brandData.socialLinks.line"
                    :href="brandData.socialLinks.line"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                    :style="{ backgroundColor: brandData.theme.primary + '20', color: brandData.theme.primary }"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <!-- CTA button -->
              <button
                class="w-full py-3 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
                :style="{ backgroundColor: brandData.theme.primary }"
              >
                立即預約
              </button>
            </div>
          </div>

          <!-- Preview note -->
          <div
            class="mt-4 p-4 rounded-lg border text-xs"
            style="background: rgba(233,235,239,0.5); border-color: rgba(0,0,0,0.1); color: #717182"
          >
            ✨ 這是您品牌在網站上的呈現樣貌。每個變更都會即時反映在這裡。
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
