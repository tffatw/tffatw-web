<template>
  <div>
    <!-- 頁面標題部分 -->
    <section class="bg-blue-800 text-white py-20">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">合作品牌</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">攜手行業領先企業，共同促進行業發展</p>
      </div>
    </section>

    <!-- 品牌介紹 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">我們的合作夥伴</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            我們與行業內眾多知名企業建立了緊密的合作關係，共同推動行業創新與發展
          </p>
        </div>
        
        <!-- 篩選選項 -->
        <div class="mb-8">
          <div class="flex flex-wrap justify-center gap-4">
            <button 
              @click="currentCategory = 'all'" 
              :class="['px-4 py-2 rounded-full text-sm font-medium', 
                      currentCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              全部
            </button>
            <button 
              v-for="category in brandCategories" 
              :key="category.value"
              @click="currentCategory = category.value" 
              :class="['px-4 py-2 rounded-full text-sm font-medium', 
                      currentCategory === category.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
        
        <!-- 品牌展示 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="brand in filteredBrands" 
            :key="brand.id"
            class="card p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex justify-center mb-6">
              <img :src="brand.logo" :alt="brand.name" class="h-20 object-contain">
            </div>
            <h3 class="text-lg font-semibold text-gray-800 text-center mb-2">{{ brand.name }}</h3>
            <p class="text-sm text-gray-600 text-center mb-4">{{ brand.category }}</p>
            <p class="text-gray-600 text-sm mb-4">{{ brand.description }}</p>
            <div class="text-center">
              <a :href="brand.website" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                訪問官網 &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 合作優勢 -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">合作優勢</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            加入我們，共享資源，共創價值
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-8">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">廣泛的行業網絡</h3>
            <p class="text-gray-600 text-center">
              與行業內500多家會員單位建立聯繫，拓展商業合作機會，共享優質資源。
            </p>
          </div>
          
          <div class="card p-8">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">專業影響力</h3>
            <p class="text-gray-600 text-center">
              提升品牌在行業內的專業形象和影響力，參與行業標準制定，引領行業發展。
            </p>
          </div>
          
          <div class="card p-8">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">品牌推廣</h3>
            <p class="text-gray-600 text-center">
              通過協會平台和活動，獲得品牌曝光和推廣機會，接觸潛在客戶和合作夥伴。
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 合作流程 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">如何成為合作夥伴</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div class="flex flex-col md:flex-row justify-center gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold">1</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">提交申請</h3>
            <p class="text-gray-600 max-w-xs mx-auto">
              填寫合作夥伴申請表，提交企業基本資訊和合作意向
            </p>
          </div>
          
          <div class="hidden md:block self-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold">2</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">資質審核</h3>
            <p class="text-gray-600 max-w-xs mx-auto">
              協會秘書處審核企業資質和合作條件
            </p>
          </div>
          
          <div class="hidden md:block self-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold">3</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">簽署協議</h3>
            <p class="text-gray-600 max-w-xs mx-auto">
              確定合作內容，簽署合作協議
            </p>
          </div>
          
          <div class="hidden md:block self-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold">4</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">正式合作</h3>
            <p class="text-gray-600 max-w-xs mx-auto">
              開始享受合作夥伴權益，參與協會活動
            </p>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/contact" class="btn btn-primary">
            聯絡我們，成為合作夥伴
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import redorangeImg from '../assets/redorange.png';
import saltlessImg from '../assets/saltless.png';

// 品牌分類
const brandCategories = [
  { label: '早餐', value: '早餐' },
  { label: '健康餐盒', value: '健康餐盒' },
  { label: '服務業', value: '服務業' },
  { label: '金融機構', value: '金融機構' },
  { label: '媒體機構', value: '媒體機構' }
];

// 當前選中的分類
const currentCategory = ref('all');

// 品牌數據
const brands = [
  {
    id: 1,
    name: '紅橘子',
    logo: redorangeImg,
    category: '早餐',
    description: '紅橘子，開啟你幸福的每一天。我們為了幸福而開店，當然也要每天都很幸福。',
    website: 'https://www.redorange.com.tw/'
  },
  {
    id: 2,
    name: '少點鹽',
    logo: saltlessImg,
    category: '健康餐盒',
    description: '少點鹽健康餐盒專賣，顛覆傳統水煮餐盒印象，當天新鮮食材現烹調，少油少鹽呈現食物的原味，每口都新鮮，簡單卻又不失美味。',
    website: 'https://www.healthittaipei.com.tw'
  }
];

// 根據當前分類篩選品牌
const filteredBrands = computed(() => {
  if (currentCategory.value === 'all') {
    return brands;
  } else {
    return brands.filter(brand => brand.category === currentCategory.value);
  }
});
</script> 
