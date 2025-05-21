<template>
  <div>
    <!-- 頁面標題部分 -->
    <section class="bg-[#e0725f] text-white py-20">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">聯絡我們</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">隨時與我們取得聯繫，了解更多資訊或提出您的問題</p>
      </div>
    </section>

    <!-- 聯絡資訊部分 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- 左側聯絡資訊 -->
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">聯絡方式</h2>
            <div class="w-20 h-1 bg-red-600 mb-8"></div>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">辦公地址</h3>
                  <p class="text-gray-600">
                    台北市xx區xxx路三段303號
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">電話</h3>
                  <p class="text-gray-600">
                    秘書處: (+886) 2-2505-8888<br>
                    會員服務: (+886) 2-2505-8888
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">電子信箱</h3>
                  <p class="text-gray-600">
                    服務諮詢: tffatw.org@gmail.com<br>
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">工作時間</h3>
                  <p class="text-gray-600">
                    週一至週五: 上午9:00 - 下午5:30<br>
                    週六、週日及法定節假日休息
                  </p>
                </div>
              </div>
            </div>
            
            <!-- 社交媒體連結 -->
            <div class="mt-10">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">關注我們</h3>
              <div class="flex space-x-4">
                <a href="https://www.facebook.com/groups/152691983155490" class="bg-gray-100 p-3 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" class="bg-gray-100 p-3 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" class="bg-gray-100 p-3 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" class="bg-gray-100 p-3 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- 右側聯絡表單 -->
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">給我們留言</h2>
            <div class="w-20 h-1 bg-red-600 mb-8"></div>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">您的姓名 *</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">電子郵箱 *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  >
                </div>
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">主題 *</label>
                <select 
                  id="subject" 
                  v-model="form.subject" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">請選擇主題...</option>
                  <option value="general">一般諮詢</option>
                  <option value="membership">會員事務</option>
                  <option value="cooperation">合作洽談</option>
                  <option value="media">媒體合作</option>
                  <option value="other">其他</option>
                </select>
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">留言內容 *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5" 
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>
              
              <div class="flex items-start">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  v-model="form.privacy" 
                  required
                  class="mt-1 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                >
                <label for="privacy" class="ml-2 block text-sm text-gray-600">
                  我同意協會根據<a href="#" class="text-red-600 hover:underline">隱私政策</a>處理我的個人資訊 *
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  class="w-full py-3 bg-[#e0725f] text-white rounded-md hover:bg-[#d06050] transition-colors"
                  :disabled="submitting"
                >
                  {{ submitting ? '提交中...' : '提交留言' }}
                </button>
              </div>
              
              <!-- 提交成功提示 -->
              <div v-if="submitSuccess" class="bg-green-100 p-4 rounded-md">
                <div class="flex">
                  <svg class="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p class="text-green-700">您的留言已成功提交，我們將盡快與您聯繫。</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 地圖部分 -->
    <section class="py-12 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800">我們的位置</h2>
        </div>
        <div class="h-96 bg-gray-300 rounded-lg overflow-hidden">
          <!-- 這裡實際使用時替換為真實的地圖組件 -->
          <div class="h-full flex items-center justify-center bg-gray-100">
            <p class="text-gray-500">此處將顯示地圖，實際使用時請替換為您的地圖組件或嵌入地圖</p>
          </div>
        </div>
        <div class="mt-4 text-center text-gray-600">
          <p>地址：台北市xx區xxx路三段303號</p>
          <p class="mt-1">郵編：10451</p>
        </div>
      </div>
    </section>
    
    <!-- FAQ部分 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">常見問題</h2>
          <div class="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
            <button 
              @click="toggleFaq(index)" 
              class="w-full flex justify-between items-center p-4 bg-gray-50 text-left"
            >
              <span class="font-medium text-gray-800">{{ faq.question }}</span>
              <svg 
                :class="['w-5 h-5 transform transition-transform', faq.open ? 'rotate-180' : '']" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div :class="['p-4 bg-white', faq.open ? 'block' : 'hidden']">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 表單數據
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  privacy: false
});

// 表單狀態
const submitting = ref(false);
const submitSuccess = ref(false);

// 表單提交方法
const submitForm = () => {
  submitting.value = true;
  
  // 模擬表單提交
  setTimeout(() => {
    submitting.value = false;
    submitSuccess.value = true;
    
    // 重置表單
    form.name = '';
    form.email = '';
    form.phone = '';
    form.subject = '';
    form.message = '';
    form.privacy = false;
    
    // 3秒後隱藏成功提示
    setTimeout(() => {
      submitSuccess.value = false;
    }, 3000);
  }, 1500);
};

// FAQ數據
const faqs = ref([
  {
    question: '如何成為協會會員？',
    answer: '企業可以通過我們的官網提交會員申請，或直接聯繫會員服務部門。申請通過審核後，繳納相應的會費即可成為正式會員。',
    open: false
  },
  {
    question: '協會會員有哪些權益？',
    answer: '會員可以參加協會舉辦的各類活動，獲取行業資訊，享受專業諮詢服務，參與行業標準制定，以及與其他會員建立合作關係等。',
    open: false
  },
  {
    question: '如何參加協會舉辦的活動？',
    answer: '會員可通過官網、郵件通知了解最新活動資訊，並通過線上報名或聯繫活動負責人的方式參加活動。',
    open: false
  },
  {
    question: '協會提供哪些專業培訓？',
    answer: '協會定期舉辦各類專業培訓課程，包括技術培訓、管理培訓、法規解讀等，旨在提升會員的專業能力和競爭力。',
    open: false
  },
  {
    question: '如何與協會進行合作？',
    answer: '如果您希望與協會開展合作，可以通過電子郵件或電話聯繫我們，我們會與您討論具體的合作事宜。',
    open: false
  }
]);

// 切換FAQ展開/收起狀態
const toggleFaq = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};
</script> 
