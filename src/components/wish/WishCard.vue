<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Wish } from '@/types'
import { CATEGORIES } from '@/types'
import { useWishStore } from '@/stores/wish'

const props = defineProps<{
  wish: Wish
}>()

const wishStore = useWishStore()
const isBlessing = ref(false)
const showStars = ref(false)

const categoryInfo = computed(() => CATEGORIES[props.wish.category])

const displayName = computed(() => {
  if (props.wish.isAnonymous) return '匿名許願者'
  return props.wish.userName || '許願者'
})

const formattedDate = computed(() => {
  const date = new Date(props.wish.createdAt)
  return date.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric'
  })
})

async function handleBless() {
  if (isBlessing.value) return

  isBlessing.value = true
  showStars.value = true
  wishStore.blessWish(props.wish.id)

  setTimeout(() => {
    showStars.value = false
    isBlessing.value = false
  }, 1000)
}
</script>

<template>
  <article
    class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-float-in"
  >
    <div class="p-5">
      <!-- 頂部：分類與日期 -->
      <div class="flex items-center justify-between mb-3">
        <span
          class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
          :class="`bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700`"
        >
          {{ categoryInfo.emoji }} {{ categoryInfo.label }}
        </span>
        <span class="text-sm text-gray-400">{{ formattedDate }}</span>
      </div>

      <!-- 標題 -->
      <RouterLink :to="`/wishes/${wish.id}`">
        <h3 class="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 mb-2">
          {{ wish.title }}
        </h3>
      </RouterLink>

      <!-- 描述 -->
      <p v-if="wish.description" class="text-gray-500 text-sm line-clamp-2 mb-4">
        {{ wish.description }}
      </p>

      <!-- 底部：許願者與祝福 -->
      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
        <span class="text-sm text-gray-500">
          {{ displayName }}
        </span>

        <button
          @click="handleBless"
          class="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-medium hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105 active:scale-95"
          :class="{ 'animate-celebrate': isBlessing }"
        >
          <span>🙏</span>
          <span>{{ wish.blessingCount }}</span>

          <!-- 星星動畫 -->
          <div v-if="showStars" class="absolute -top-2 left-1/2 -translate-x-1/2">
            <span class="absolute animate-float-stars" style="animation-delay: 0s">✨</span>
            <span class="absolute animate-float-stars" style="animation-delay: 0.1s; left: -10px">⭐</span>
            <span class="absolute animate-float-stars" style="animation-delay: 0.2s; left: 10px">🌟</span>
          </div>
        </button>
      </div>
    </div>
  </article>
</template>
