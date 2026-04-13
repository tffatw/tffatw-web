<script setup>
import { useRoute } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- 網站頭部（standalone 頁面不顯示） -->
    <TheHeader v-if="!route.meta.standalone" />

    <!-- 主要內容區域 -->
    <main :class="route.meta.standalone ? '' : 'flex-grow'">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 網站底部（standalone 頁面不顯示） -->
    <TheFooter v-if="!route.meta.standalone" />
  </div>
</template>

<style>
/* 頁面過渡動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
