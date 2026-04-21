<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isEditing = computed(() => Boolean(route.params.id))

const title = ref('')
const category = ref('新品上市')
const content = ref('')
const tags = ref([])
const tagInput = ref('')
const publishMode = ref('publish')
const scheduleDate = ref('')
const coverImage = ref(null)

const categories = ['店休公告', '限時優惠', '新品上市', '活動資訊']

const tips = [
  { icon: '💡', text: '標題使用「[ ]」符號能增加專業感，例如：[新品] 森林系厚切培根蛋捲，新上市！' },
  { icon: '✨', text: '內容中適度加入 Emoji，可以讓您的公告更顯活潑親民。' },
  { icon: '📸', text: '發布店休公告時，別忘了附上一張溫馨的照片，會比純文字更受歡迎。' },
]

const quickTemplates = [
  {
    name: '店休模板',
    title: '店休公告',
    category: '店休公告',
    content: '親愛的朋友們：\n\n由於 [日期] 有重要事項，本店將暫停營業一天。\n\n造成不便，敬請見諒 🙏\n我們將於 [日期] 恢復正常營業，期待與您再次相見！',
  },
  {
    name: '活動優惠模板',
    title: '[優惠] ',
    category: '限時優惠',
    content: '🎉 限時優惠活動\n\n活動期間：[開始日期] - [結束日期]\n活動內容：\n• \n• \n\n趕快來享受優惠吧！',
  },
]

const publishLabel = computed(() => {
  if (publishMode.value === 'publish') return '立即發布'
  if (publishMode.value === 'draft') return '儲存草稿'
  return '排程發布'
})

function handleAddTag(e) {
  if (e.key === 'Enter' && tagInput.value.trim()) {
    e.preventDefault()
    if (!tags.value.includes(tagInput.value.trim())) {
      tags.value.push(tagInput.value.trim())
    }
    tagInput.value = ''
  }
}

function handleRemoveTag(tag) {
  tags.value = tags.value.filter(t => t !== tag)
}

function handleImageUpload(e) {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => { coverImage.value = reader.result }
    reader.readAsDataURL(file)
  }
}

function applyTemplate(tpl) {
  title.value = tpl.title
  category.value = tpl.category
  content.value = tpl.content
}

function handleSave() {
  console.log({ title: title.value, category: category.value, content: content.value, tags: tags.value, publishMode: publishMode.value, scheduleDate: scheduleDate.value })
  router.push('/news')
}
</script>

<template>
  <div class="min-h-screen" style="background: #F9FAFB; color: #111827; font-family: system-ui, sans-serif">

    <!-- Header -->
    <header class="sticky top-0 z-10 border-b" style="background: #ffffff; border-color: rgba(0,0,0,0.1)">
      <div class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            class="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style="color: #6B7280"
            @mouseenter="(e) => (e.currentTarget.style.background = '#F3F4F6')"
            @mouseleave="(e) => (e.currentTarget.style.background = 'transparent')"
            @click="router.push('/news')"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <div>
            <h2 class="text-lg font-medium" style="color: #111827">{{ isEditing ? '編輯文章' : '新增文章' }}</h2>
            <p class="text-sm" style="color: #6B7280">填寫文章資訊並選擇發布方式</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style="border-color: rgba(0,0,0,0.15); color: #374151; background: #ffffff"
            @mouseenter="(e) => (e.currentTarget.style.background = '#F9FAFB')"
            @mouseleave="(e) => (e.currentTarget.style.background = '#ffffff')"
            @click="router.push('/news')"
          >
            取消
          </button>
          <button
            class="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
            style="background: #111827"
            @click="handleSave"
          >
            {{ publishLabel }}
          </button>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-7xl px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Left: Main form -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Title -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium" style="color: #374151">
              文章標題
              <span class="font-normal ml-1" style="color: #9CA3AF">(建議 20 字內)</span>
            </label>
            <input
              v-model="title"
              type="text"
              placeholder="例如：歡慶母親節，早午餐第二客半價！"
              maxlength="50"
              class="w-full rounded-lg px-4 py-2.5 outline-none border text-sm transition-colors"
              style="background: #ffffff; border-color: rgba(0,0,0,0.12); color: #111827"
              @focus="(e) => (e.target.style.borderColor = '#374151')"
              @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')"
            />
            <p class="text-xs text-right" style="color: #9CA3AF">{{ title.length }} / 50</p>
          </div>

          <!-- Category -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium" style="color: #374151">文章分類</label>
            <select
              v-model="category"
              class="w-full rounded-lg px-4 py-2.5 outline-none border text-sm appearance-none cursor-pointer"
              style="background: #ffffff; border-color: rgba(0,0,0,0.12); color: #111827"
              @focus="(e) => (e.target.style.borderColor = '#374151')"
              @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Cover image -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium" style="color: #374151">
              封面圖片
              <span class="font-normal ml-1" style="color: #9CA3AF">(建議 16:9 比例)</span>
            </label>
            <div
              class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
              style="border-color: rgba(0,0,0,0.12)"
            >
              <div v-if="coverImage" class="relative">
                <img :src="coverImage" alt="封面預覽" class="w-full rounded-lg" />
                <button
                  class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg text-white"
                  style="background: #EF4444"
                  @click="coverImage = null"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <label v-else for="cover-upload" class="cursor-pointer block">
                <svg class="w-8 h-8 mx-auto mb-2" style="color: #9CA3AF" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                <p class="text-sm mb-1" style="color: #6B7280">點擊上傳圖片</p>
                <p class="text-xs" style="color: #9CA3AF">支援 JPG、PNG 格式</p>
                <input id="cover-upload" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
              </label>
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium" style="color: #374151">文章內容</label>
            <textarea
              v-model="content"
              placeholder="輸入文章內容，支援換行..."
              rows="10"
              class="w-full rounded-lg px-4 py-3 outline-none border text-sm resize-none transition-colors"
              style="background: #ffffff; border-color: rgba(0,0,0,0.12); color: #111827"
              @focus="(e) => (e.target.style.borderColor = '#374151')"
              @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')"
            ></textarea>
          </div>

          <!-- Tags -->
          <div class="space-y-1.5">
            <label class="text-sm font-medium" style="color: #374151">
              標籤分類
              <span class="font-normal ml-1" style="color: #9CA3AF">(選填，按 Enter 新增)</span>
            </label>
            <input
              v-model="tagInput"
              type="text"
              placeholder="例如：#寵物友善 #週末限定"
              class="w-full rounded-lg px-4 py-2.5 outline-none border text-sm transition-colors"
              style="background: #ffffff; border-color: rgba(0,0,0,0.12); color: #111827"
              @focus="(e) => (e.target.style.borderColor = '#374151')"
              @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')"
              @keydown="handleAddTag"
            />
            <div v-if="tags.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="tag in tags"
                :key="tag"
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style="background: #E5E7EB; color: #374151"
              >
                #{{ tag }}
                <button
                  class="ml-1 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                  style="color: #6B7280"
                  @mouseenter="(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.1)')"
                  @mouseleave="(e) => (e.currentTarget.style.background = 'transparent')"
                  @click="handleRemoveTag(tag)"
                >
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Publish mode -->
          <div class="border-t pt-6 space-y-4" style="border-color: rgba(0,0,0,0.08)">
            <label class="text-sm font-medium" style="color: #374151">發布狀態</label>
            <div class="space-y-3">
              <label
                v-for="opt in [
                  { value: 'publish', label: '立即發布', desc: '文章將立即對外公開' },
                  { value: 'draft', label: '儲存草稿', desc: '暫存，隨時可繼續編輯' },
                  { value: 'schedule', label: '排程發布', desc: '設定未來發布時間' },
                ]"
                :key="opt.value"
                class="flex items-start gap-3 cursor-pointer"
              >
                <div class="mt-0.5 relative">
                  <input
                    type="radio"
                    name="publishMode"
                    :value="opt.value"
                    v-model="publishMode"
                    class="sr-only"
                  />
                  <div
                    class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                    :style="publishMode === opt.value
                      ? { borderColor: '#111827', background: '#111827' }
                      : { borderColor: '#D1D5DB', background: '#ffffff' }"
                    @click="publishMode = opt.value"
                  >
                    <div v-if="publishMode === opt.value" class="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                </div>
                <div @click="publishMode = opt.value">
                  <p class="text-sm font-medium" style="color: #111827">{{ opt.label }}</p>
                  <p class="text-xs" style="color: #9CA3AF">{{ opt.desc }}</p>
                </div>
              </label>
            </div>

            <div v-if="publishMode === 'schedule'" class="ml-7 space-y-1.5">
              <label class="text-sm font-medium" style="color: #374151">發布日期與時間</label>
              <input
                v-model="scheduleDate"
                type="datetime-local"
                class="rounded-lg px-4 py-2.5 outline-none border text-sm transition-colors"
                style="background: #ffffff; border-color: rgba(0,0,0,0.12); color: #111827"
                @focus="(e) => (e.target.style.borderColor = '#374151')"
                @blur="(e) => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')"
              />
            </div>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <div class="space-y-5">

          <!-- Tips -->
          <div class="rounded-xl border p-5" style="background: #ffffff; border-color: rgba(0,0,0,0.08)">
            <div class="mb-4 flex items-center gap-2">
              <svg class="w-5 h-5" style="color: #F59E0B" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
              </svg>
              <h3 class="text-sm font-medium" style="color: #111827">撰寫小技巧</h3>
            </div>
            <div class="space-y-4">
              <div v-for="(tip, i) in tips" :key="i" class="text-sm">
                <p class="leading-relaxed" style="color: #6B7280">
                  <span class="mr-1.5">{{ tip.icon }}</span>{{ tip.text }}
                </p>
              </div>
            </div>
          </div>

          <!-- Quick templates -->
          <div class="rounded-xl border p-5" style="background: #ffffff; border-color: rgba(0,0,0,0.08)">
            <h3 class="text-sm font-medium mb-4" style="color: #111827">快速範本</h3>
            <div class="space-y-2">
              <button
                v-for="tpl in quickTemplates"
                :key="tpl.name"
                class="w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors"
                style="border-color: rgba(0,0,0,0.12); color: #374151; background: #ffffff"
                @mouseenter="(e) => (e.currentTarget.style.background = '#F9FAFB')"
                @mouseleave="(e) => (e.currentTarget.style.background = '#ffffff')"
                @click="applyTemplate(tpl)"
              >
                {{ tpl.name }}
              </button>
            </div>
          </div>

          <!-- Preview -->
          <div class="rounded-xl border p-5" style="background: #ffffff; border-color: rgba(0,0,0,0.08)">
            <h3 class="text-sm font-medium mb-3" style="color: #111827">預覽</h3>
            <div class="rounded-lg border p-4 space-y-2 text-sm" style="background: #F9FAFB; border-color: rgba(0,0,0,0.08)">
              <span
                v-if="category"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-2"
                :style="{
                  background: { '店休公告': '#FEF3C7', '限時優惠': '#FEE2E2', '新品上市': '#D1FAE5', '活動資訊': '#DBEAFE' }[category] || '#F3F4F6',
                  color: { '店休公告': '#92400E', '限時優惠': '#991B1B', '新品上市': '#065F46', '活動資訊': '#1E40AF' }[category] || '#374151',
                  borderColor: { '店休公告': '#FDE68A', '限時優惠': '#FECACA', '新品上市': '#A7F3D0', '活動資訊': '#BFDBFE' }[category] || '#E5E7EB',
                }"
              >{{ category }}</span>
              <p class="font-medium text-sm leading-snug" style="color: #111827; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical">
                {{ title || '文章標題' }}
              </p>
              <p
                v-if="content"
                class="text-xs leading-relaxed"
                style="color: #9CA3AF; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; white-space: pre-line"
              >{{ content }}</p>
              <div v-if="tags.length > 0" class="flex flex-wrap gap-1 pt-1">
                <span v-for="tag in tags" :key="tag" class="text-xs" style="color: #9CA3AF">#{{ tag }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
