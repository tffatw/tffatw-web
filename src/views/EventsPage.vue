<template>
  <div>
    <!-- 頁面標題部分 -->
    <section class="bg-[#e0725f] text-white py-20">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">活動資訊</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">掌握協會最新動態與行業資訊</p>
      </div>
    </section>

    <!-- 篩選和搜尋 -->
    <section class="bg-gray-50 py-12">
      <div class="container-custom">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- 篩選選項 -->
          <div class="flex flex-wrap gap-3">
            <button 
              @click="currentCategory = 'all'" 
              :class="['px-4 py-2 rounded-full text-sm font-medium', 
                      currentCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              全部
            </button>
            <button 
              v-for="category in eventCategories" 
              :key="category.value"
              @click="currentCategory = category.value" 
              :class="['px-4 py-2 rounded-full text-sm font-medium', 
                      currentCategory === category.value ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              {{ category.label }}
            </button>
          </div>
          
          <!-- 搜尋框 -->
          <div class="relative w-full md:w-auto">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="搜尋活動..." 
              class="border border-gray-300 rounded-full py-2 px-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 活動列表 -->
    <section class="bg-gray-50 py-16">
      <div class="container-custom">
        <!-- 沒有結果時顯示 -->
        <div v-if="filteredEvents.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">沒有找到符合條件的活動</h3>
          <p class="text-gray-500">請嘗試其他搜尋條件或瀏覽全部活動</p>
          <button @click="resetFilters" class="mt-4 text-red-600 hover:text-red-800 font-medium">
            重置篩選條件
          </button>
        </div>
        
        <!-- 活動卡片網格 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="event in filteredEvents" 
            :key="event.id"
            class="card overflow-hidden group"
          >
            <!-- 活動圖片 -->
            <div class="relative overflow-hidden">
              <img :src="event.image" :alt="event.title" class="w-full h-52 object-cover transition duration-500 group-hover:scale-105">
              <div class="absolute top-4 left-4">
                <span class="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">{{ event.category }}</span>
              </div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div class="flex items-center text-white">
                  <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ event.date }}</span>
                </div>
              </div>
            </div>
            
            <!-- 活動內容 -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{{ event.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ event.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ event.location }}</span>
                </div>
                <router-link :to="`/events/${event.id}`" class="text-red-600 hover:text-red-800 font-medium text-sm">
                  查看詳情 &rarr;
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分頁 -->
        <div class="mt-12 flex justify-center">
          <div class="flex space-x-1">
            <button 
              @click="currentPage > 1 ? currentPage-- : null"
              :class="['px-3 py-1 rounded text-sm', currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              上一頁
            </button>
            <button 
              v-for="page in displayedPages" 
              :key="page"
              @click="currentPage = page"
              :class="['px-3 py-1 rounded text-sm', currentPage === page ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              {{ page }}
            </button>
            <button 
              @click="currentPage < totalPages ? currentPage++ : null"
              :class="['px-3 py-1 rounded text-sm', currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              下一頁
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { eventService } from '../services/eventService';

const featuredEvents = ref([]);

// 活動分類
const eventCategories = [
  { label: '例會', value: '例會' },
  { label: '參訪活動', value: '參訪活動' }
];

// 活動數據
const events = [
  {
    id: 1,
    title: '2023年度行業發展趨勢峰會',
    date: '2023-06-15',
    location: '國際會議中心',
    category: '會議論壇',
    image: '/event-1.jpg',
    description: '本次峰會將邀請行業頂尖專家，共同探討行業未來發展趨勢、技術創新方向以及政策影響。',
    featured: true
  }
];

// 活動圖片畫廊
const gallery = [
  { src: '/event-1.jpg', alt: '行業峰會現場', featured: true },
  { src: '/event-2.jpg', alt: '工作坊培訓' },
  { src: '/event-3.jpg', alt: '企業交流活動' },
  { src: '/event-4.jpg', alt: '簽約儀式' },
  { src: '/event-5.jpg', alt: '專題研討會' }
];

// 搜尋和篩選
const searchQuery = ref('');
const currentCategory = ref('all');
const currentPage = ref(1);
const eventsPerPage = 3;

// 根據搜尋和篩選條件過濾活動
const filteredBySearch = computed(() => {
  if (!searchQuery.value) return featuredEvents.value || [];
  const query = searchQuery.value.toLowerCase();
  return (featuredEvents.value || []).filter(event => 
    event.title.toLowerCase().includes(query) || 
    event.description.toLowerCase().includes(query) ||
    event.location.toLowerCase().includes(query)
  );
});

const filteredByCategory = computed(() => {
  if (currentCategory.value === 'all') return filteredBySearch.value;
  return filteredBySearch.value.filter(event => event.type === currentCategory.value);
});

// 分頁功能
const totalPages = computed(() => {
  const total = Math.max(1, Math.ceil(filteredByCategory.value.length / eventsPerPage));
  return total;
});

const filteredEvents = computed(() => {
  const startIndex = (currentPage.value - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  return Array.isArray(filteredByCategory.value) ? filteredByCategory.value.slice(startIndex, endIndex) : [];
});

// 重置篩選條件
const resetFilters = () => {
  searchQuery.value = '';
  currentCategory.value = 'all';
  currentPage.value = 1;
};

// 當篩選條件改變時，重置為第一頁
watch([searchQuery, currentCategory], () => {
  currentPage.value = 1;
});

const displayedPages = computed(() => {
  const pages = [];
  let startPage = Math.max(1, currentPage.value - 2);
  let endPage = Math.min(totalPages.value, startPage + 4);
  
  // 調整 startPage 確保總是顯示 5 個頁碼（如果有那麼多頁）
  if (endPage - startPage < 4 && startPage > 1) {
    startPage = Math.max(1, endPage - 4);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

onMounted(() => {
  featuredEvents.value = eventService.getFeaturedEvents(0);
});
</script>
