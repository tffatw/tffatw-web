<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-md p-8">
        <!-- 標題 -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">會員登入</h1>
          <p class="text-gray-500 mt-2 text-sm">台灣速食餐飲協會 會員專區</p>
        </div>

        <!-- 登入表單 -->
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="account" class="block text-sm font-medium text-gray-700 mb-1">帳號</label>
            <input
              id="account"
              v-model="account"
              type="text"
              autocomplete="username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="請輸入帳號"
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密碼</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="請輸入密碼"
            />
          </div>

          <!-- 錯誤訊息 -->
          <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors font-medium"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useSEO } from '../composables/useSEO'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { setPageMeta } = useSEO()

const account = ref('')
const password = ref('')
const errorMessage = ref('')

onMounted(() => {
  setPageMeta({
    title: '會員登入',
    description: '台灣速食餐飲連鎖協會會員登入頁面，登入後可存取會員專屬內容。'
  })
})

function handleSubmit() {
  errorMessage.value = ''
  const success = authStore.login(account.value, password.value)
  if (success) {
    const redirect = route.query.redirect || '/member'
    router.push(redirect)
  } else {
    errorMessage.value = '帳號或密碼錯誤，請重試。'
  }
}
</script>
