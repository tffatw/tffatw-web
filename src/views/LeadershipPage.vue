<template>
  <div>
    <!-- 頁面標題部分 -->
    <section class="bg-[#e0725f] text-white py-20">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">協會成員</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">了解協會領導團隊，共同推動行業發展</p>
      </div>
    </section>

    <!-- 當屆理事會領導 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">本屆理事會</h2>
          <div class="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            第X屆理事會成員由行業內著名企業領導和專業人士組成，任期20xx年至20xx年
          </p>
        </div>
        
        <!-- 理事長 -->
        <div class="mb-16">
          <div class="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div class="w-64 h-64 overflow-hidden rounded-full border-4 border-red-100 shadow-lg flex-shrink-0">
              <img src="../assets/male_icon.png" alt="理事長" class="w-full h-full object-cover">
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-800 mb-2">蔡思庭</h3>
              <p class="text-red-600 font-medium mb-4">理事長</p>
              <p class="text-gray-600 mb-4 leading-relaxed">
                蔡思庭先生現任XX集團有限公司董事長，在行業內擁有超過30年的豐富經驗。他於20xx年當選為協會第x屆理事長，致力於推動行業技術創新和國際化發展。
              </p>
              <p class="text-gray-600 leading-relaxed">
                在他的領導下，協會積極推動行業標準制定，促進企業間合作，為行業持續健康發展作出重要貢獻。
              </p>
            </div>
          </div>
        </div>
        
        <!-- 秘書長 -->
        <div class="mb-16">
          <div class="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div class="w-48 h-48 overflow-hidden rounded-full border-4 border-red-100 shadow-lg flex-shrink-0">
              <img src="../assets/male_icon.png" alt="秘書長" class="w-full h-full object-cover">
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">蕭雅梅</h3>
              <p class="text-red-600 font-medium mb-4">秘書長</p>
              <p class="text-gray-600 leading-relaxed">
                蕭雅梅女士現任XX集團有限公司董事長，在行業內擁有超過30年的豐富經驗。她於20xx年當選為協會第x屆理事長，致力於推動行業技術創新和國際化發展。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 歷屆理事長部分 -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">歷屆理事長</h2>
          <div class="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            感謝歷屆理事長為協會發展做出的重要貢獻
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(chairman, index) in pastChairmen" :key="index" class="card p-6 text-center">
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-red-100 mx-auto mb-4">
              <img :src="chairman.image" :alt="chairman.name" class="w-full h-full object-cover">
            </div>
            <h3 class="text-lg font-bold text-gray-800">{{ chairman.name }}</h3>
            <p class="text-red-600 font-medium mb-2">{{ chairman.term }}</p>
            <p class="text-gray-600 text-sm mb-2">{{ chairman.period }}</p>
            <p class="text-gray-600 text-sm">{{ chairman.company }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 品牌介紹 -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">品牌成員</h2>
          <div class="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
          <p class="text-gray-600 max-w-2xl mx-auto">
            匯聚了國內頂尖速食餐飲品牌的菁英領導者，每位成員皆為業界翹楚，憑藉豐富的市場經驗與專業知識，共同致力於推動產業進步與創新。
          </p>
        </div>
        
        <!-- 篩選選項 -->
        <div class="mb-8">
          <div class="flex flex-wrap justify-center gap-4">
            <button 
              @click="currentCategory = 'all'" 
              :class="['px-4 py-2 rounded-full text-sm font-medium', 
                      currentCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
            >
              全部
            </button>
            <button 
              v-for="category in brandCategories" 
              :key="category.value"
              @click="currentCategory = category.value" 
              :class="['px-4 py-2 rounded-full text-sm font-medium', 
                      currentCategory === category.value ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
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
              <a :href="brand.website" target="_blank" class="text-red-600 hover:text-red-800 text-sm font-medium">
                訪問官網 &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import redorangeImg from '../assets/redorange.png';
import saltlessImg from '../assets/saltless.png';
import bioTechImg from '../assets/bio_tech.jpg';
import ericaImg from '../assets/erica_tech.png';
import lodpolImg from '../assets/lodpol.png';
import maleIconImg from '../assets/male_icon.png';

// 理事會成員數據
const boardMembers = [
  { name: '陳志強', company: 'AA公司', image: maleIconImg },
  { name: '張麗華', company: 'BB集團', image: maleIconImg },
  { name: '王偉', company: 'CC科技', image: maleIconImg },
  { name: '李小紅', company: 'DD傳媒', image: maleIconImg },
  { name: '趙明', company: 'EE工業', image: maleIconImg },
  { name: '黃海', company: 'FF商貿', image: maleIconImg },
  { name: '周健', company: 'GG實業', image: maleIconImg },
  { name: '吳芳', company: 'HH投資', image: maleIconImg },
];

// 歷屆理事長數據
const pastChairmen = [
  { name: '張廷章', term: '創會會長', period: '2000-2004', company: '巨森食品企業有限公司', image: maleIconImg },
  { name: '林坤炎', term: '榮譽理事長', period: '2000-2004', company: '巨森食品企業有限公司', image: maleIconImg },
  { name: '徐倉賓', term: '第一屆副理事長', period: '2000-2004', company: '弘爺國際企業股份有限公司', image: maleIconImg },
  { name: '蔡澔鎔', term: '第二屆理事長', period: '2004-2008', company: '齋聖彥有限公司', image: maleIconImg },
  { name: '陳筑怜', term: '第二屆理事長', period: '2004-2008', company: '齋聖彥有限公司', image: maleIconImg },
  { name: '葉益芳', term: '第三屆理事長', period: '2008-2015', company: '益方封口機公司', image: maleIconImg },
  { name: '林良田', term: '第五,六屆理事長', period: '2008-2015', company: '板田實業有限公司', image: maleIconImg },
  { name: '陳弘欽', term: '第七,八屆理事長', period: '2008-2015', company: '巧沛國際股份有限公司', image: maleIconImg },
  { name: '莊茂山', term: '第九屆理事長', period: '2008-2015', company: '吉得堡食品有限公司', image: maleIconImg },
];

// 品牌分類
const brandCategories = [
  { label: '餐飲服務', value: '餐飲服務' },
  { label: '供應商', value: '供應商' },
  { label: '食品製造商', value: '食品製造商' },
];


const currentCategory = ref('all');

// 品牌數據
const brands = [
  {
    id: 1,
    name: '紅橘子',
    logo: redorangeImg,
    category: '餐飲服務',
    description: '紅橘子，開啟你幸福的每一天。我們為了幸福而開店，當然也要每天都很幸福。',
    website: 'https://www.redorange.com.tw/'
  },
  {
    id: 2,
    name: '少點鹽',
    logo: saltlessImg,
    category: '餐飲服務',
    description: '少點鹽健康餐盒專賣，顛覆傳統水煮餐盒印象，當天新鮮食材現烹調，少油少鹽呈現食物的原味，每口都新鮮，簡單卻又不失美味。',
    website: 'https://www.healthittaipei.com.tw'
  },
  {
    id: 3,
    name: '喜多生物科技',
    logo: bioTechImg,
    category: '食品製造商',
    description: '喜多以「品質優先」「生產專精」「經營績效」之理念，幾十年來累積許多寶貴的專業經驗提供許多優質產品，並期許以真材實料做食品吃出健康歡喜多服務廣大消費者。',
    website: 'https://www.facebook.com/SIDUODRINK8848'
  },
  {
    id: 4,
    name: '艾力卡公司',
    logo: ericaImg,
    description: '專業進口咖啡杯、餐盒的紙原料，只要連鎖店需要的杯、餐盒，我有廠商全配合。',
    category: '供應商',
    website: 'https://www.twincn.com/item.aspx?no=94021730'
  },
  {
    id: 5,
    name: '快樂波浪紙杯工廠',
    logo: lodpolImg,
    description: '我們是一群來自不同領域的工程師團隊，也是對紙杯製造充滿熱情的創業者，致力研究提升技術，應用科技解決問題。',
    category: '供應商',
    website: 'https://lodpol.com/'
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
