<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mockNews = [
  {
    id: '1',
    title: '[新品] 森林系厚切培根蛋捲，新上市！',
    category: '新品上市',
    status: 'published',
    publishDate: '2026-04-10',
    tags: ['週末限定', '早午餐'],
  },
  {
    id: '2',
    title: '歡慶母親節，早午餐第二客半價！',
    category: '限時優惠',
    status: 'published',
    publishDate: '2026-04-08',
    tags: ['母親節', '優惠'],
  },
  {
    id: '3',
    title: '4/15 店休公告',
    category: '店休公告',
    status: 'scheduled',
    publishDate: '2026-04-14',
    tags: [],
  },
  {
    id: '4',
    title: '週年慶感恩回饋活動',
    category: '活動資訊',
    status: 'draft',
    publishDate: '2026-04-13',
    tags: ['週年慶', '寵物友善'],
  },
]

const categoryColors = {
  '店休公告': { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  '限時優惠': { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
  '新品上市': { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
  '活動資訊': { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
}

const statusConfig = {
  published: { label: '已發布', color: '#16A34A', icon: 'check' },
  draft: { label: '草稿', color: '#6B7280', icon: 'file' },
  scheduled: { label: '排程中', color: '#2563EB', icon: 'clock' },
}

const filter = ref('all')

const filteredNews = computed(() =>
  filter.value === 'all' ? mockNews : mockNews.filter(n => n.status === filter.value)
)

const counts = computed(() => ({
  all: mockNews.length,
  published: mockNews.filter(n => n.status === 'published').length,
  draft: mockNews.filter(n => n.status === 'draft').length,
  scheduled: mockNews.filter(n => n.status === 'scheduled').length,
}))
</script>

<template>
  <div class="min-h-screen" style="background: #F9FAFB; color: #111827; font-family: system-ui, sans-serif">

    <!-- Header -->
    <header class="sticky top-0 z-10 border-b" style="background: #ffffff; border-color: rgba(0,0,0,0.1)">
      <div class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-medium" style="color: #111827">最新消息管理</h1>
          <p class="text-sm mt-0.5" style="color: #6B7280">像發 IG 一樣輕鬆發布店家公告</p>
        </div>
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
          style="background: #111827"
          @click="router.push('/news/editor')"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          新增文章
        </button>
      </div>
    </header>

    <div class="mx-auto max-w-5xl px-6 py-8">

      <!-- Tabs -->
      <div class="flex gap-1 mb-6 p-1 rounded-lg inline-flex" style="background: #E5E7EB">
        <button
          v-for="tab in [
            { key: 'all', label: '全部' },
            { key: 'published', label: '已發布' },
            { key: 'draft', label: '草稿' },
            { key: 'scheduled', label: '排程中' },
          ]"
          :key="tab.key"
          class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
          :style="filter === tab.key
            ? { background: '#ffffff', color: '#111827', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }
            : { background: 'transparent', color: '#6B7280' }"
          @click="filter = tab.key"
        >
          {{ tab.label }} ({{ counts[tab.key] }})
        </button>
      </div>

      <!-- List -->
      <div class="space-y-3">
        <div
          v-if="filteredNews.length === 0"
          class="py-16 text-center"
        >
          <svg class="w-12 h-12 mx-auto mb-4" style="color: #D1D5DB" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p style="color: #9CA3AF">目前沒有文章</p>
        </div>

        <button
          v-for="item in filteredNews"
          :key="item.id"
          class="w-full text-left rounded-lg border p-5 transition-all"
          style="background: #ffffff; border-color: rgba(0,0,0,0.08)"
          @mouseenter="(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }"
          @mouseleave="(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.boxShadow = 'none' }"
          @click="router.push(`/news/editor/${item.id}`)"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <!-- Badges row -->
              <div class="mb-2 flex items-center gap-2 flex-wrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  :style="{
                    background: categoryColors[item.category]?.bg,
                    color: categoryColors[item.category]?.text,
                    borderColor: categoryColors[item.category]?.border,
                  }"
                >
                  {{ item.category }}
                </span>
                <span
                  class="inline-flex items-center gap-1 text-sm"
                  :style="{ color: statusConfig[item.status].color }"
                >
                  <!-- check icon -->
                  <svg v-if="item.status === 'published'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <!-- file icon -->
                  <svg v-else-if="item.status === 'draft'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <!-- calendar-clock icon -->
                  <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="17" cy="17" r="3"/><polyline points="17 15.5 17 17 18 17"/>
                  </svg>
                  {{ statusConfig[item.status].label }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="mb-2 font-medium text-base leading-snug" style="color: #111827">{{ item.title }}</h3>

              <!-- Meta -->
              <div class="flex items-center gap-4 text-sm flex-wrap" style="color: #9CA3AF">
                <span class="inline-flex items-center gap-1.5">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ item.publishDate }}
                </span>
                <span v-if="item.tags.length > 0" class="flex gap-1.5 flex-wrap">
                  <span v-for="tag in item.tags" :key="tag">#{{ tag }}</span>
                </span>
              </div>
            </div>

            <!-- Arrow -->
            <svg class="w-5 h-5 shrink-0 mt-1" style="color: #D1D5DB" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
