<script setup>
import { ref, computed } from 'vue'

// step: 'login' | 'activation' | 'member-type'
const step = ref('login')

// Login
const associationId = ref('')
const password = ref('')

function handleLogin(e) {
  e.preventDefault()
  if (associationId.value && password.value) step.value = 'activation'
}

// Activation
const email = ref('')
const verificationCode = ref('')
const codeSent = ref(false)
const isVerifying = ref(false)

function handleSendCode(e) {
  e.preventDefault()
  if (email.value) codeSent.value = true
}

function handleVerify(e) {
  e.preventDefault()
  if (verificationCode.value.length !== 6) return
  isVerifying.value = true
  setTimeout(() => {
    isVerifying.value = false
    step.value = 'member-type'
  }, 1000)
}

function onCodeInput(e) {
  verificationCode.value = e.target.value.replace(/\D/g, '').slice(0, 6)
}

// Member type
const selectedType = ref(null)
const isConfirming = ref(false)

const memberTypes = [
  {
    id: 'restaurant',
    title: '餐飲店家',
    subtitle: 'Food & Beverage',
    description: '適合早午餐、速食店、連鎖餐飲',
    features: ['數位菜單', '品牌故事', '最新消息'],
    iconBg: 'linear-gradient(135deg, #819C73, #6B8A5E)',
  },
  {
    id: 'supplier',
    title: '供應鏈廠商',
    subtitle: 'Suppliers & Logistics',
    description: '適合包裝材料、冷凍食材、物流運輸、行銷會計顧問',
    features: ['服務量能', '合作案例', '專業證照'],
    iconBg: 'linear-gradient(135deg, #B8860B, #9A7209)',
  },
]

function handleConfirm() {
  if (!selectedType.value) return
  isConfirming.value = true
  setTimeout(() => {
    isConfirming.value = false
    alert(`已確認身分：${selectedType.value === 'restaurant' ? '餐飲店家' : '供應鏈廠商'}\n\n即將開始設計您的網站！`)
  }, 800)
}
</script>

<template>
  <div style="font-family: system-ui, sans-serif; min-height: 100vh">

    <!-- ══════════ STEP 1: LOGIN ══════════ -->
    <div v-if="step === 'login'" class="min-h-screen flex">

      <!-- Left visual panel -->
      <div
        class="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden"
        style="background: linear-gradient(135deg, #819C73 0%, #6B8A5E 100%)"
      >
        <!-- Logo -->
        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: rgba(255,255,255,0.2)">
              <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <h1 class="text-white text-2xl font-bold">台灣速食餐飲協會</h1>
              <p class="text-sm" style="color: rgba(255,255,255,0.8)">Taiwan Fast Food Association</p>
            </div>
          </div>
        </div>

        <!-- Copy -->
        <div class="relative z-10">
          <h2 class="text-white text-4xl font-bold mb-4 leading-tight">數位共榮平台</h2>
          <p class="text-lg mb-6 leading-relaxed" style="color: rgba(255,255,255,0.9)">
            連結產業上下游，打造您的專屬數位官網
          </p>
          <p class="text-base" style="color: rgba(255,255,255,0.8)">與 500+ 會員共創商機</p>
        </div>

        <!-- Decorative blobs -->
        <div class="absolute rounded-full" style="top: 25%; right: 0; width: 256px; height: 256px; background: rgba(255,255,255,0.08); filter: blur(48px)"></div>
        <div class="absolute rounded-full" style="bottom: 25%; left: 0; width: 192px; height: 192px; background: rgba(255,255,255,0.08); filter: blur(48px)"></div>
      </div>

      <!-- Right login form -->
      <div class="flex-1 flex items-center justify-center p-8" style="background: #F5F5F0">
        <div class="w-full max-w-md">
          <div class="rounded-2xl p-8" style="background: #ffffff; box-shadow: 0 10px 40px rgba(0,0,0,0.1)">
            <!-- Mobile logo -->
            <div class="flex items-center gap-2 mb-6 lg:hidden">
              <svg class="w-6 h-6" style="color: #819C73" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <h1 class="text-xl font-bold" style="color: #2D3436">台灣速食餐飲協會</h1>
            </div>

            <div class="mb-8">
              <h2 class="text-2xl font-bold mb-2" style="color: #2D3436">歡迎回來！</h2>
              <p style="color: #6C757D">請輸入您的協會編號進行登入</p>
            </div>

            <form @submit="handleLogin" class="space-y-6">
              <div>
                <label class="block text-sm font-medium mb-2" style="color: #2D3436">協會編號 / 帳號</label>
                <input
                  v-model="associationId"
                  type="text"
                  placeholder="請輸入協會編號"
                  required
                  class="w-full px-4 py-3 rounded-xl outline-none border transition-all text-sm"
                  style="background: #F5F5F0; border-color: #E8E8E3; color: #2D3436"
                  @focus="(e) => (e.target.style.boxShadow = '0 0 0 2px #819C73', e.target.style.borderColor = 'transparent')"
                  @blur="(e) => (e.target.style.boxShadow = 'none', e.target.style.borderColor = '#E8E8E3')"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-2" style="color: #2D3436">密碼</label>
                <input
                  v-model="password"
                  type="password"
                  placeholder="請輸入密碼"
                  required
                  class="w-full px-4 py-3 rounded-xl outline-none border transition-all text-sm"
                  style="background: #F5F5F0; border-color: #E8E8E3; color: #2D3436"
                  @focus="(e) => (e.target.style.boxShadow = '0 0 0 2px #819C73', e.target.style.borderColor = 'transparent')"
                  @blur="(e) => (e.target.style.boxShadow = 'none', e.target.style.borderColor = '#E8E8E3')"
                />
              </div>

              <button
                type="submit"
                class="w-full py-3 rounded-xl font-medium text-white text-sm flex items-center justify-center gap-2 transition-all"
                style="background: #819C73; box-shadow: 0 4px 12px rgba(129,156,115,0.4)"
                @mouseenter="(e) => (e.currentTarget.style.background = '#6B8A5E')"
                @mouseleave="(e) => (e.currentTarget.style.background = '#819C73')"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                立即登入
              </button>

              <div class="text-center">
                <a href="#" class="text-sm transition-colors" style="color: #6C757D"
                  @mouseenter="(e) => (e.target.style.color = '#819C73')"
                  @mouseleave="(e) => (e.target.style.color = '#6C757D')"
                >忘記密碼？請聯繫協會秘書處</a>
              </div>
            </form>
          </div>

          <p class="text-center text-sm mt-6" style="color: #6C757D">© 2026 台灣速食餐飲協會 版權所有</p>
        </div>
      </div>
    </div>

    <!-- ══════════ STEP 2: ACTIVATION ══════════ -->
    <div
      v-if="step === 'activation'"
      class="min-h-screen flex items-center justify-center p-8"
      style="background: linear-gradient(135deg, #F5F5F0 0%, #E8E8E3 100%)"
    >
      <div class="w-full max-w-2xl">
        <div class="rounded-2xl p-8 md:p-12" style="background: #ffffff; box-shadow: 0 20px 60px rgba(0,0,0,0.12)">

          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style="background: rgba(129,156,115,0.1)">
              <svg class="w-8 h-8" style="color: #819C73" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold mb-3" style="color: #2D3436">帳號安全驗證</h1>
            <p class="max-w-xl mx-auto leading-relaxed" style="color: #6C757D">
              為了保障您的管理權限，並確保未來負責人異動時能順利交接，請綁定一個對外聯繫的電子信箱。
            </p>
          </div>

          <!-- Email row -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2" style="color: #2D3436">電子信箱地址</label>
              <div class="flex gap-3">
                <div class="flex-1 relative">
                  <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style="color: #6C757D" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="example@company.com"
                    :disabled="codeSent"
                    class="w-full pl-12 pr-4 py-3 rounded-xl outline-none border transition-all text-sm"
                    style="background: #F5F5F0; border-color: #E8E8E3; color: #2D3436"
                    @focus="(e) => !codeSent && (e.target.style.boxShadow = '0 0 0 2px #819C73', e.target.style.borderColor = 'transparent')"
                    @blur="(e) => (e.target.style.boxShadow = 'none', e.target.style.borderColor = '#E8E8E3')"
                  />
                </div>
                <button
                  v-if="!codeSent"
                  :disabled="!email"
                  class="px-6 py-3 rounded-xl font-medium text-white text-sm flex items-center gap-2 transition-all whitespace-nowrap"
                  style="background: #819C73; box-shadow: 0 4px 12px rgba(129,156,115,0.3)"
                  :style="{ opacity: email ? 1 : 0.5, cursor: email ? 'pointer' : 'not-allowed' }"
                  @click="handleSendCode"
                  @mouseenter="(e) => email && (e.currentTarget.style.background = '#6B8A5E')"
                  @mouseleave="(e) => (e.currentTarget.style.background = '#819C73')"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  發送驗證碼
                </button>
                <div
                  v-else
                  class="flex items-center px-4 rounded-xl border"
                  style="background: #F0FDF4; border-color: #BBF7D0"
                >
                  <svg class="w-5 h-5" style="color: #16A34A" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Code section -->
            <div v-if="codeSent">
              <div class="rounded-xl p-4 mb-6" style="background: rgba(129,156,115,0.05); border: 1px solid rgba(129,156,115,0.2)">
                <p class="text-sm" style="color: #2D3436">我們已向您的信箱發送了一組 6 位數驗證碼，請於下方輸入。</p>
              </div>

              <form @submit="handleVerify">
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-2" style="color: #2D3436">驗證碼</label>
                  <input
                    :value="verificationCode"
                    @input="onCodeInput"
                    type="text"
                    maxlength="6"
                    placeholder="000000"
                    required
                    class="w-full px-4 py-3 rounded-xl outline-none border transition-all text-2xl text-center tracking-widest font-mono"
                    style="background: #F5F5F0; border-color: #E8E8E3; color: #2D3436"
                    @focus="(e) => (e.target.style.boxShadow = '0 0 0 2px #819C73', e.target.style.borderColor = 'transparent')"
                    @blur="(e) => (e.target.style.boxShadow = 'none', e.target.style.borderColor = '#E8E8E3')"
                  />
                </div>
                <button
                  type="submit"
                  :disabled="verificationCode.length !== 6 || isVerifying"
                  class="w-full py-3 rounded-xl font-medium text-white text-sm transition-all"
                  style="background: #819C73; box-shadow: 0 4px 12px rgba(129,156,115,0.3)"
                  :style="{ opacity: verificationCode.length === 6 && !isVerifying ? 1 : 0.5, cursor: verificationCode.length === 6 && !isVerifying ? 'pointer' : 'not-allowed' }"
                  @mouseenter="(e) => verificationCode.length === 6 && !isVerifying && (e.currentTarget.style.background = '#6B8A5E')"
                  @mouseleave="(e) => (e.currentTarget.style.background = '#819C73')"
                >
                  {{ isVerifying ? '驗證中...' : '確認驗證碼' }}
                </button>
              </form>
            </div>

            <!-- Tip -->
            <div class="rounded-xl p-4" style="background: linear-gradient(135deg, rgba(184,134,11,0.05), rgba(129,156,115,0.05)); border: 1px solid rgba(184,134,11,0.2)">
              <div class="flex gap-3">
                <svg class="w-5 h-5 shrink-0 mt-0.5" style="color: #B8860B" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
                </svg>
                <p class="text-sm leading-relaxed" style="color: #2D3436">
                  <span class="font-medium">建議使用公司官方信箱或負責人信箱</span>
                  ，此信箱將作為未來找回密碼與接收訂單通知的主要管道。
                </p>
              </div>
            </div>
          </div>
        </div>

        <p class="text-center text-sm mt-6" style="color: #6C757D">© 2026 台灣速食餐飲協會 版權所有</p>
      </div>
    </div>

    <!-- ══════════ STEP 3: MEMBER TYPE ══════════ -->
    <div
      v-if="step === 'member-type'"
      class="min-h-screen flex items-center justify-center p-6 md:p-8"
      style="background: linear-gradient(135deg, #F5F5F0 0%, #E8E8E3 100%)"
    >
      <div class="w-full max-w-5xl">

        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-4" style="color: #2D3436">請選擇您的會員類型</h1>
          <p class="text-lg max-w-2xl mx-auto" style="color: #6C757D">
            我們將根據您的身分，提供最適合的網頁佈局與功能
          </p>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <button
            v-for="type in memberTypes"
            :key="type.id"
            class="relative text-left rounded-2xl p-8 transition-all duration-300"
            :style="{
              background: '#ffffff',
              boxShadow: selectedType === type.id
                ? '0 20px 60px rgba(129,156,115,0.25)'
                : '0 10px 30px rgba(0,0,0,0.08)',
              outline: selectedType === type.id ? '4px solid #819C73' : 'none',
              transform: selectedType === type.id ? 'scale(1.02)' : 'scale(1)',
            }"
            @click="selectedType = type.id"
            @mouseenter="(e) => selectedType !== type.id && (e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.14)', e.currentTarget.style.transform = 'scale(1.01)')"
            @mouseleave="(e) => selectedType !== type.id && (e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)', e.currentTarget.style.transform = 'scale(1)')"
          >
            <!-- Selection indicator -->
            <div
              class="absolute top-4 right-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all"
              :style="selectedType === type.id
                ? { background: '#819C73', borderColor: '#819C73' }
                : { background: '#ffffff', borderColor: '#E8E8E3' }"
            >
              <svg v-if="selectedType === type.id" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <!-- Icon -->
            <div
              class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
              :style="{ background: type.iconBg }"
            >
              <!-- Store icon -->
              <svg v-if="type.id === 'restaurant'" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <!-- Truck icon -->
              <svg v-else class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>

            <!-- Text -->
            <div class="mb-4">
              <h2 class="text-2xl font-bold mb-1" style="color: #2D3436">{{ type.title }}</h2>
              <p class="text-sm font-medium mb-3" style="color: #6C757D">{{ type.subtitle }}</p>
              <p class="leading-relaxed" style="color: #6C757D">{{ type.description }}</p>
            </div>

            <!-- Features -->
            <div>
              <p class="text-sm font-medium mb-3" style="color: #2D3436">功能包含：</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="f in type.features"
                  :key="f"
                  class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  :style="selectedType === type.id
                    ? { background: 'rgba(129,156,115,0.1)', color: '#819C73' }
                    : { background: '#F5F5F0', color: '#6C757D' }"
                >{{ f }}</span>
              </div>
            </div>
          </button>
        </div>

        <!-- Confirm button -->
        <div class="flex justify-center">
          <button
            :disabled="!selectedType || isConfirming"
            class="max-w-md w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-2 transition-all"
            :style="{
              background: '#819C73',
              opacity: selectedType && !isConfirming ? 1 : 0.5,
              cursor: selectedType && !isConfirming ? 'pointer' : 'not-allowed',
              boxShadow: selectedType ? '0 8px 24px rgba(129,156,115,0.35)' : 'none',
            }"
            @mouseenter="(e) => selectedType && !isConfirming && (e.currentTarget.style.background = '#6B8A5E')"
            @mouseleave="(e) => (e.currentTarget.style.background = '#819C73')"
            @click="handleConfirm"
          >
            <template v-if="isConfirming">處理中...</template>
            <template v-else>
              確認身分，開始設計我的網站
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </template>
          </button>
        </div>

        <p class="text-center text-sm mt-8" style="color: #6C757D">© 2026 台灣速食餐飲協會 版權所有</p>
      </div>
    </div>

  </div>
</template>
