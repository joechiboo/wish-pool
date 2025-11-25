<script setup lang="ts">
import type { Category } from '@/types'
import { CATEGORIES } from '@/types'
import { useWishStore } from '@/stores/wish'

const wishStore = useWishStore()

const categories = Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]

function selectCategory(category: Category | null) {
  wishStore.setCategory(category)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      @click="selectCategory(null)"
      class="px-4 py-2 rounded-full text-sm font-medium transition-all"
      :class="wishStore.selectedCategory === null
        ? 'bg-purple-600 text-white shadow-md'
        : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'"
    >
      全部
    </button>

    <button
      v-for="[key, value] in categories"
      :key="key"
      @click="selectCategory(key)"
      class="px-4 py-2 rounded-full text-sm font-medium transition-all"
      :class="wishStore.selectedCategory === key
        ? 'bg-purple-600 text-white shadow-md'
        : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'"
    >
      {{ value.emoji }} {{ value.label }}
    </button>
  </div>
</template>
