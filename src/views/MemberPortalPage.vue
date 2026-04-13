<template>
  <div class="min-h-screen bg-gray-50 py-16 px-4">
    <div class="container-custom max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-8">
        <!-- 歡迎標題 -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-800">會員專區</h1>
          <p class="text-gray-600 mt-2">
            歡迎回來，<span class="font-semibold text-red-700">{{ authStore.currentUser?.name }}</span>
          </p>
        </div>

        <hr class="border-gray-200 mb-8" />

        <!-- 會員資訊 -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">帳號資訊</h2>
          <div class="bg-gray-50 rounded-md p-4 text-sm text-gray-600 space-y-2">
            <div class="flex gap-2">
              <span class="font-medium text-gray-700">帳號：</span>
              <span>{{ authStore.currentUser?.account }}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-medium text-gray-700">顯示名稱：</span>
              <span>{{ authStore.currentUser?.name }}</span>
            </div>
          </div>
        </div>

        <!-- 會員專屬內容（預留區） -->
        <div class="mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">會員資源</h2>
          <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-700">
            會員專屬內容建置中，敬請期待。
          </div>
        </div>

        <!-- 登出按鈕 -->
        <div class="pt-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useSEO } from '../composables/useSEO'

const router = useRouter()
const authStore = useAuthStore()
const { setPageMeta } = useSEO()

onMounted(() => {
  setPageMeta({
    title: '會員專區',
    description: '台灣速食餐飲連鎖協會會員專屬內容，提供會員專屬資源與資訊。'
  })
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>
