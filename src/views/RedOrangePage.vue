<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ── Color palette ──────────────────────────────────────────────
// primary : #819C73  (sage green)
// accent  : #B8860B  (dark goldenrod)
// bg      : #F5F5F0  (warm off-white)

// ── Nav links ──────────────────────────────────────────────────
const NAV_LINKS = [
  { name: '首頁',   href: '#home' },
  { name: '品牌故事', href: '#about' },
  { name: '最新消息', href: '#news' },
  { name: '服務項目', href: '#services' },
  { name: '聯絡我們', href: '#contact' },
]

// ── Mobile menu ────────────────────────────────────────────────
const isMobileMenuOpen = ref(false)

function scrollToSection(href) {
  isMobileMenuOpen.value = false
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ── Images (Unsplash) ──────────────────────────────────────────
const HERO_IMG      = 'https://images.unsplash.com/photo-1595072246101-609814a3e902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80'
const OLD_STORE_IMG = 'https://images.unsplash.com/photo-1759330337849-c3df71294f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80'
const CAFE_IMG      = 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80'

// ── News ───────────────────────────────────────────────────────
const NEWS = [
  {
    tag: '活動',
    tagClass: 'bg-[#819C73] text-white',
    title: '晨曦週末市集限定餐盒',
    date: '2026.04.15',
    desc: '本週末我們將參與城市綠林市集，推出市集限定的野餐餐盒，數量有限，歡迎來找我們玩！',
  },
  {
    tag: '公告',
    tagClass: 'bg-[#B8860B] text-white',
    title: '春季新菜單全面上線',
    date: '2026.04.09',
    desc: '嚴選春季盛產的小農鮮蔬，搭配清爽的油醋沙拉，全新十款早午餐拼盤等您來品嚐。',
  },
  {
    tag: '活動',
    tagClass: 'bg-[#819C73] text-white',
    title: '職人手沖咖啡分享會',
    date: '2026.04.22',
    desc: '邀請知名烘豆師親臨現場，帶領大家認識不同產區的咖啡風味，並體驗手沖樂趣。',
  },
]

// ── Menu ───────────────────────────────────────────────────────
const MENU_ITEMS = [
  { name: '晨曦經典早午餐盤',    sub: '農場直送生菜、德式香腸、太陽蛋、天然酵母酸種麵包',  hot: true,  price: '$320' },
  { name: '酪梨烤吐司與手作果醬', sub: '新鮮酪梨泥、水波蛋、初榨橄欖油、自製季節野莓果醬',  hot: false, price: '$280' },
  { name: '森林野菇松露濃湯',     sub: '四種慢熬野菇、頂級黑松露油、附法式切片長棍',        hot: true,  price: '$180' },
  { name: '焦糖海鹽拿鐵',        sub: '自家烘焙中深焙豆、法國海鹽、手熬焦糖醬',            hot: true,  price: '$160' },
  { name: '手作西西里檸檬塔',    sub: '屏東新鮮綠檸檬、法式發酵奶油塔皮',                  hot: false, price: '$150' },
]

// ── Intersection Observer for scroll-in animations ─────────────
const animatedEls = ref([])

function useScrollReveal() {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target) // once: true
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}

useScrollReveal()
</script>

<template>
  <div
    class="min-h-screen overflow-x-hidden"
    style="background: #F5F5F0; color: #333333; font-family: 'Noto Sans TC', sans-serif"
  >

    <!-- ═══════════════════════════════════════
         NAVBAR
    ═══════════════════════════════════════ -->
    <header
      class="fixed top-0 inset-x-0 z-50 border-b"
      style="background: rgba(245,245,240,0.85); backdrop-filter: blur(12px); border-color: rgba(0,0,0,0.08)"
    >
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo -->
        <button
          class="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
          @click="() => window.scrollTo({ top: 0, behavior: 'smooth' })"
        >
          <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#819C73" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
          <span style="font-family: 'Noto Serif TC', serif; font-size: 1.25rem; font-weight: 700; letter-spacing: 0.05em; color: #333333">
            晨曦 Brunch
          </span>
        </button>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          <a
            v-for="link in NAV_LINKS"
            :key="link.name"
            :href="link.href"
            class="text-sm font-medium transition-colors duration-200"
            style="color: rgba(51,51,51,0.75)"
            @click.prevent="scrollToSection(link.href)"
            @mouseenter="(e) => (e.target.style.color = '#819C73')"
            @mouseleave="(e) => (e.target.style.color = 'rgba(51,51,51,0.75)')"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden p-2 transition-colors bg-transparent border-0"
          style="color: rgba(51,51,51,0.75)"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <!-- X icon when open -->
          <svg v-if="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <!-- Hamburger icon when closed -->
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile nav drawer -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden border-t"
        style="background: #F5F5F0; border-color: rgba(0,0,0,0.08)"
      >
        <div class="flex flex-col py-4 px-6 gap-1">
          <a
            v-for="link in NAV_LINKS"
            :key="link.name"
            :href="link.href"
            class="py-3 font-medium text-lg border-b last:border-0 transition-colors"
            style="color: rgba(51,51,51,0.8); border-color: rgba(0,0,0,0.06)"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </header>

    <main class="pt-20">

      <!-- ═══════════════════════════════════════
           HERO
      ═══════════════════════════════════════ -->
      <section
        id="home"
        class="relative min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-20 overflow-hidden"
      >
        <div class="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">
          <!-- Text -->
          <div class="space-y-8 max-w-lg reveal reveal-left">
            <h1
              class="text-5xl md:text-6xl lg:text-7xl leading-tight"
              style="font-family: 'Noto Serif TC', serif; font-weight: 700; color: #333333"
            >
              晨曦佐餐，<br />
              <span style="color: #819C73">喚醒美好的每一天</span>
            </h1>
            <p class="text-lg md:text-xl leading-relaxed font-light" style="color: rgba(51,51,51,0.7)">
              嚴選在地食材，結合職人手作的溫潤滋味，在城市一隅為您準備了一席溫暖。享受自然採光下的慵懶早晨。
            </p>
            <div class="pt-4">
              <button
                class="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 group"
                style="background: #819C73; color: #ffffff; box-shadow: 0 8px 24px rgba(129,156,115,0.35)"
                @click="scrollToSection('#services')"
                @mouseenter="(e) => (e.currentTarget.style.transform = 'translateY(-3px)')"
                @mouseleave="(e) => (e.currentTarget.style.transform = 'translateY(0)')"
              >
                查看今日菜單
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Image -->
          <div class="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl reveal reveal-right">
            <div class="absolute inset-0 z-10" style="background: rgba(129,156,115,0.1); mix-blend-mode: multiply"></div>
            <img :src="HERO_IMG" alt="自然採光的早午餐食物" class="w-full h-full object-cover object-center" />
          </div>
        </div>

        <!-- Decorative blobs -->
        <div
          class="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full blur-3xl -z-10 pointer-events-none"
          style="background: rgba(129,156,115,0.07)"
        ></div>
        <div
          class="absolute bottom-1/4 -right-64 w-[600px] h-[600px] rounded-full blur-3xl -z-10 pointer-events-none"
          style="background: rgba(184,134,11,0.05)"
        ></div>
      </section>

      <!-- ═══════════════════════════════════════
           ABOUT
      ═══════════════════════════════════════ -->
      <section id="about" class="py-24 bg-white relative">
        <div class="max-w-7xl mx-auto px-6">
          <!-- Heading -->
          <div class="text-center mb-20 space-y-4 reveal reveal-up">
            <span class="font-bold tracking-widest text-sm uppercase" style="color: #B8860B">Our Story</span>
            <h2 style="font-family: 'Noto Serif TC', serif; font-size: 2rem; font-weight: 700; color: #333333">傳承與創新</h2>
            <div class="w-16 h-1 rounded-full mx-auto mt-6" style="background: #819C73; opacity: 0.8"></div>
          </div>

          <div class="space-y-32">
            <!-- Row 1: Image left, text right -->
            <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div class="order-2 md:order-1 relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3] reveal reveal-left">
                <img :src="OLD_STORE_IMG" alt="三十年前的老店面" class="w-full h-full object-cover" style="filter: sepia(0.3)" />
              </div>
              <div class="order-1 md:order-2 space-y-6 reveal reveal-right">
                <h3 style="font-family: 'Noto Serif TC', serif; font-size: 1.5rem; font-weight: 700; color: #333333">歲月沈澱的溫暖味道</h3>
                <p class="leading-relaxed text-lg font-light" style="color: rgba(51,51,51,0.7)">
                  源自三十年前街角的那間老麵包舖。我們保留了手作的初衷，堅持最純粹的食材原味。那些在清晨揉捏麵團的日子，為今日的晨曦打下了堅實的基礎。
                </p>
              </div>
            </div>

            <!-- Row 2: Text left, image right -->
            <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div class="space-y-6 reveal reveal-left">
                <h3 style="font-family: 'Noto Serif TC', serif; font-size: 1.5rem; font-weight: 700; color: #333333">當代質感的全新演繹</h3>
                <p class="leading-relaxed text-lg font-light" style="color: rgba(51,51,51,0.7)">
                  隨著時光流轉，我們將經典滋味重新設計。以明亮自然採光的質感空間，搭配講究器皿與充滿呼吸感的座位編排，期待與您共享更美好的晨間時光。
                </p>
              </div>
              <div class="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3] reveal reveal-right">
                <img :src="CAFE_IMG" alt="當代質感的咖啡廳空間" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════
           NEWS
      ═══════════════════════════════════════ -->
      <section id="news" class="py-24 relative" style="background: #F5F5F0">
        <div class="max-w-7xl mx-auto px-6">
          <!-- Heading row -->
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal reveal-up">
            <div class="space-y-4">
              <span class="font-bold tracking-widest text-sm uppercase" style="color: #B8860B">Latest Updates</span>
              <h2 style="font-family: 'Noto Serif TC', serif; font-size: 2rem; font-weight: 700; color: #333333">最新消息</h2>
              <div class="w-16 h-1 rounded-full mt-4" style="background: #819C73; opacity: 0.8"></div>
            </div>
            <button
              class="inline-flex items-center gap-1 font-medium transition-colors bg-transparent border-0 p-0"
              style="color: #819C73"
            >
              查看全部
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>

          <!-- Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(news, i) in NEWS"
              :key="i"
              class="rounded-[1.5rem] p-8 flex flex-col h-full transition-all duration-300 border reveal reveal-up"
              style="background: #ffffff; border-color: rgba(0,0,0,0.06); box-shadow: 0 8px 30px rgba(0,0,0,0.04)"
              :style="{ transitionDelay: `${i * 80}ms` }"
              @mouseenter="(e) => (e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)')"
              @mouseleave="(e) => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)')"
            >
              <div class="flex items-center gap-3 mb-6">
                <span :class="news.tagClass" class="px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                  {{ news.tag }}
                </span>
                <span class="text-sm font-medium" style="color: rgba(51,51,51,0.5)">{{ news.date }}</span>
              </div>
              <h4 class="text-xl font-bold mb-4 transition-colors" style="color: #333333">{{ news.title }}</h4>
              <p class="text-sm leading-relaxed mb-6 flex-grow font-light" style="color: rgba(51,51,51,0.7)">{{ news.desc }}</p>
              <div class="mt-auto">
                <span class="text-sm font-medium cursor-pointer inline-flex items-center gap-1" style="color: #B8860B">
                  閱讀詳情
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════
           MENU / SERVICES
      ═══════════════════════════════════════ -->
      <section id="services" class="py-24 bg-white relative">
        <div class="max-w-4xl mx-auto px-6">
          <!-- Heading -->
          <div class="text-center mb-16 space-y-4 reveal reveal-up">
            <span class="font-bold tracking-widest text-sm uppercase" style="color: #B8860B">Menu Highlights</span>
            <h2 style="font-family: 'Noto Serif TC', serif; font-size: 2rem; font-weight: 700; color: #333333">經典餐點與服務</h2>
            <p class="max-w-lg mx-auto mt-4 font-light" style="color: rgba(51,51,51,0.6)">
              我們提供全天候的早午餐服務、手作烘焙與精品咖啡。以下是我們最受歡迎的精選品項。
            </p>
          </div>

          <!-- Menu list -->
          <div class="rounded-[2rem] p-8 md:p-12 border reveal reveal-up" style="background: #F5F5F0; border-color: rgba(0,0,0,0.06)">
            <ul class="space-y-6">
              <li
                v-for="(item, i) in MENU_ITEMS"
                :key="i"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 rounded-xl transition-colors duration-300 hover:bg-white">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="text-lg font-bold transition-colors" style="color: #333333">{{ item.name }}</h4>
                      <span
                        v-if="item.hot"
                        class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                        style="color: #819C73; background: rgba(129,156,115,0.12)"
                      >
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                        </svg>
                        推薦
                      </span>
                    </div>
                    <p class="text-sm font-light" style="color: rgba(51,51,51,0.6)">{{ item.sub }}</p>
                  </div>
                  <div class="font-bold text-lg sm:text-right" style="font-family: 'Noto Serif TC', serif; color: #B8860B">
                    {{ item.price }}
                  </div>
                </div>
                <!-- Divider except last -->
                <div v-if="i < MENU_ITEMS.length - 1" class="h-px mx-4 mt-2" style="background: rgba(0,0,0,0.07)"></div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════
           CONTACT
      ═══════════════════════════════════════ -->
      <section id="contact" class="py-24 relative overflow-hidden" style="background: #F5F5F0">
        <!-- Decorative skew bg -->
        <div
          class="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
          style="background: rgba(129,156,115,0.05); transform: skewX(-12deg) translateX(50%); transform-origin: top right"
        ></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

            <!-- Contact form -->
            <div class="space-y-10 reveal reveal-left">
              <div class="space-y-4">
                <h2 style="font-family: 'Noto Serif TC', serif; font-size: 2rem; font-weight: 700; color: #333333">與我們聯繫</h2>
                <p class="font-light leading-relaxed" style="color: rgba(51,51,51,0.7)">
                  有任何場地租借、包場活動或餐點相關的疑問嗎？<br />
                  歡迎留下您的訊息，我們將盡快回覆您。
                </p>
              </div>

              <form class="space-y-6" @submit.prevent>
                <div class="space-y-2">
                  <label for="ro-name" class="text-sm font-medium" style="color: rgba(51,51,51,0.8)">您的姓名</label>
                  <input
                    id="ro-name"
                    type="text"
                    placeholder="王小明"
                    class="w-full px-4 py-3 rounded-xl outline-none transition-all"
                    style="background: #ffffff; border: 1px solid rgba(0,0,0,0.12); color: #333333"
                    @focus="(e) => { e.target.style.borderColor = '#819C73'; e.target.style.boxShadow = '0 0 0 3px rgba(129,156,115,0.15)' }"
                    @blur="(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none' }"
                  />
                </div>
                <div class="space-y-2">
                  <label for="ro-email" class="text-sm font-medium" style="color: rgba(51,51,51,0.8)">電子信箱</label>
                  <input
                    id="ro-email"
                    type="email"
                    placeholder="example@email.com"
                    class="w-full px-4 py-3 rounded-xl outline-none transition-all"
                    style="background: #ffffff; border: 1px solid rgba(0,0,0,0.12); color: #333333"
                    @focus="(e) => { e.target.style.borderColor = '#819C73'; e.target.style.boxShadow = '0 0 0 3px rgba(129,156,115,0.15)' }"
                    @blur="(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none' }"
                  />
                </div>
                <div class="space-y-2">
                  <label for="ro-msg" class="text-sm font-medium" style="color: rgba(51,51,51,0.8)">留言內容</label>
                  <textarea
                    id="ro-msg"
                    rows="4"
                    placeholder="請輸入您的訊息..."
                    class="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none"
                    style="background: #ffffff; border: 1px solid rgba(0,0,0,0.12); color: #333333"
                    @focus="(e) => { e.target.style.borderColor = '#819C73'; e.target.style.boxShadow = '0 0 0 3px rgba(129,156,115,0.15)' }"
                    @blur="(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.boxShadow = 'none' }"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors"
                  style="background: #819C73; color: #ffffff; box-shadow: 0 8px 24px rgba(129,156,115,0.3)"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                  發送訊息
                </button>
              </form>
            </div>

            <!-- Store info -->
            <div class="h-full flex flex-col reveal reveal-right">
              <div class="rounded-[2rem] p-8 border flex-1 flex flex-col" style="background: #ffffff; border-color: rgba(0,0,0,0.08); box-shadow: 0 20px 60px rgba(0,0,0,0.08)">
                <h3 style="font-family: 'Noto Serif TC', serif; font-size: 1.4rem; font-weight: 700; color: #333333" class="mb-6">實體店面</h3>

                <div class="space-y-6 flex-1">
                  <div class="flex items-start gap-4">
                    <div class="p-3 rounded-full shrink-0" style="background: rgba(129,156,115,0.12); color: #819C73">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-bold mb-1" style="color: #333333">地址</h4>
                      <p class="font-light" style="color: rgba(51,51,51,0.7)">台北市大安區光復南路 100 號 1 樓</p>
                    </div>
                  </div>

                  <!-- Map placeholder -->
                  <div
                    class="w-full h-64 rounded-xl flex items-center justify-center mt-4 border cursor-pointer transition-colors group"
                    style="background: #ececf0; border-color: rgba(0,0,0,0.08)"
                    @mouseenter="(e) => (e.currentTarget.style.borderColor = '#819C73')"
                    @mouseleave="(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)')"
                  >
                    <div
                      class="px-6 py-3 rounded-full font-medium flex items-center gap-2 border transition-colors"
                      style="background: rgba(255,255,255,0.9); color: #819C73; border-color: rgba(129,156,115,0.3)"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
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

    <!-- ═══════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════ -->
    <footer class="bg-white border-t py-12" style="border-color: rgba(0,0,0,0.08)">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#819C73" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
          <span style="font-family: 'Noto Serif TC', serif; font-size: 1.1rem; font-weight: 700; letter-spacing: 0.05em; color: #333333">
            晨曦 Brunch
          </span>
        </div>
        <p class="text-sm font-light text-center md:text-left" style="color: rgba(51,51,51,0.5)">
          &copy; 2026 晨曦 Brunch. All rights reserved.
        </p>
        <div class="flex items-center gap-4" style="color: rgba(51,51,51,0.5)">
          <a href="#" class="text-sm transition-colors hover:text-[#819C73]">隱私權政策</a>
          <span>|</span>
          <a href="#" class="text-sm transition-colors hover:text-[#819C73]">服務條款</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ── Scroll-reveal animation ── */
.reveal {
  opacity: 0;
  transition: opacity 0.75s ease, transform 0.75s ease;
}
.reveal.reveal-up    { transform: translateY(32px); }
.reveal.reveal-left  { transform: translateX(-32px); }
.reveal.reveal-right { transform: translateX(32px); }

.reveal.revealed {
  opacity: 1;
  transform: none;
}

/* ── Hover text color helper ── */
a:hover { color: #819C73; }
</style>
