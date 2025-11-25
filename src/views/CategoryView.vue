<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useWishStore } from '@/stores/wish'
import type { Category } from '@/types'
import { CATEGORIES } from '@/types'
import WishCard from '@/components/wish/WishCard.vue'
import SortToggle from '@/components/wish/SortToggle.vue'

const route = useRoute()
const wishStore = useWishStore()

const categoryKey = computed(() => route.params.category as Category)
const categoryInfo = computed(() => CATEGORIES[categoryKey.value])

const categoryWishes = computed(() => {
  return wishStore.wishes
    .filter(w => w.category === categoryKey.value)
    .sort((a, b) => {
      if (wishStore.sortBy === 'popular') {
        return b.blessingCount - a.blessingCount
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
})

watch(categoryKey, (newCategory) => {
  wishStore.setCategory(newCategory)
}, { immediate: true })
</script>

<template>
  <div class="py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8" v-if="categoryInfo">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <span class="mr-2">{{ categoryInfo.emoji }}</span>{{ categoryInfo.label }}願望
        </h1>
        <p class="text-gray-600">
          瀏覽所有{{ categoryInfo.label }}相關的願望
        </p>
      </div>

      <!-- Sort Toggle -->
      <div class="flex justify-end mb-6">
        <SortToggle />
      </div>

      <!-- Wish List -->
      <div v-if="categoryWishes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WishCard
          v-for="wish in categoryWishes"
          :key="wish.id"
          :wish="wish"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🌙</div>
        <h3 class="text-xl font-medium text-gray-700 mb-2">這個分類還沒有願望</h3>
        <p class="text-gray-500">成為第一個許願的人吧！</p>
      </div>
    </div>
  </div>
</template>
