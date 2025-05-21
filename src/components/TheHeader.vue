<template>
  <header class="bg-white shadow">
    <nav class="container-custom py-4">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <!-- Logo部分 -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img src="../assets/logo.png" alt="/" class="h-10 w-auto mr-2">
            <span class="text-xl font-bold text-red-700">台灣速食餐飲協會</span>
          </router-link>
        </div>
        
        <!-- 移動端選單按鈕 -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden self-end">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <!-- 導航選單 -->
        <div :class="['md:flex', isMenuOpen ? 'block' : 'hidden']">
          <ul class="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
            <li><router-link to="/" class="text-gray-700 hover:text-red-600 font-medium">首頁</router-link></li>
            <li><router-link to="/about" class="text-gray-700 hover:text-red-600 font-medium">關於協會</router-link></li>
            <li><router-link to="/leadership" class="text-gray-700 hover:text-red-600 font-medium">協會成員</router-link></li>
            <li><router-link to="/events" class="text-gray-700 hover:text-red-600 font-medium">活動資訊</router-link></li>
            <li><router-link to="/contact" class="text-gray-700 hover:text-red-600 font-medium">聯絡我們</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script> 
