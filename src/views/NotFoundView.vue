<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center py-12 px-4">
    <div class="text-center">
      <div class="text-8xl mb-6">🌙</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">找不到這個頁面</p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
      >
        <span>🏠</span>
        <span>回到首頁</span>
      </RouterLink>
    </div>
  </div>
</template>
