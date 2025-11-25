<script setup lang="ts">
import { useWishStore } from '@/stores/wish'

const wishStore = useWishStore()
</script>

<template>
  <div class="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
    <button
      @click="wishStore.setSortBy('latest')"
      class="px-4 py-2 rounded-full text-sm font-medium transition-all"
      :class="wishStore.sortBy === 'latest'
        ? 'bg-purple-600 text-white'
        : 'text-gray-600 hover:text-purple-600'"
    >
      最新
    </button>
    <button
      @click="wishStore.setSortBy('popular')"
      class="px-4 py-2 rounded-full text-sm font-medium transition-all"
      :class="wishStore.sortBy === 'popular'
        ? 'bg-purple-600 text-white'
        : 'text-gray-600 hover:text-purple-600'"
    >
      最熱門
    </button>
  </div>
</template>
