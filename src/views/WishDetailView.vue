<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useWishStore } from '@/stores/wish'
import { CATEGORIES } from '@/types'

const route = useRoute()
const wishStore = useWishStore()

const isBlessing = ref(false)
const showStars = ref(false)

const wish = computed(() => {
  return wishStore.getWishById(route.params.id as string)
})

const categoryInfo = computed(() => {
  if (!wish.value) return null
  return CATEGORIES[wish.value.category]
})

const displayName = computed(() => {
  if (!wish.value) return ''
  if (wish.value.isAnonymous) return '匿名許願者'
  return wish.value.userName || '許願者'
})

const formattedDate = computed(() => {
  if (!wish.value) return ''
  return new Date(wish.value.createdAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

function handleBless() {
  if (!wish.value || isBlessing.value) return

  isBlessing.value = true
  showStars.value = true
  wishStore.blessWish(wish.value.id)

  setTimeout(() => {
    showStars.value = false
    isBlessing.value = false
  }, 1000)
}
</script>

<template>
  <div class="pt-24 pb-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Wish Detail -->
      <article v-if="wish" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8">
          <!-- Category Badge -->
          <span
            v-if="categoryInfo"
            class="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            :class="`bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700`"
          >
            {{ categoryInfo.emoji }} {{ categoryInfo.label }}
          </span>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {{ wish.title }}
          </h1>

          <!-- Description -->
          <p v-if="wish.description" class="text-gray-600 leading-relaxed mb-6">
            {{ wish.description }}
          </p>

          <!-- Meta Info -->
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-8 pt-6 border-t border-gray-100">
            <span>{{ displayName }}</span>
            <span>•</span>
            <span>{{ formattedDate }}</span>
          </div>

          <!-- Bless Button -->
          <div class="flex justify-center">
            <button
              @click="handleBless"
              class="relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-lg font-medium hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              :class="{ 'animate-celebrate': isBlessing }"
            >
              <span class="text-2xl">🙏</span>
              <span>送出祝福</span>
              <span class="ml-2 px-3 py-1 bg-white/20 rounded-full">{{ wish.blessingCount }}</span>

              <!-- Stars Animation -->
              <div v-if="showStars" class="absolute -top-4 left-1/2 -translate-x-1/2">
                <span class="absolute animate-float-stars text-xl" style="animation-delay: 0s">✨</span>
                <span class="absolute animate-float-stars text-xl" style="animation-delay: 0.1s; left: -20px">⭐</span>
                <span class="absolute animate-float-stars text-xl" style="animation-delay: 0.2s; left: 20px">🌟</span>
              </div>
            </button>
          </div>
        </div>
      </article>

      <!-- Not Found -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-xl font-medium text-gray-700 mb-2">找不到這個願望</h2>
        <p class="text-gray-500 mb-6">可能已被刪除或不存在</p>
        <RouterLink
          to="/wishes"
          class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700"
        >
          探索其他願望
        </RouterLink>
      </div>
    </div>
  </div>
</template>
