<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white/50 border-t border-gray-100 py-8 mt-auto">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2 text-gray-600">
          <span class="text-xl">🌟</span>
          <span class="font-medium">許願池 Wish Pool</span>
        </div>

        <div class="flex items-center gap-6">
          <RouterLink
            to="/contact"
            class="text-sm text-gray-500 hover:text-purple-600 transition-colors"
          >
            💌 聯繫我們
          </RouterLink>
          <p class="text-sm text-gray-500">
            © {{ currentYear }} Wish Pool. 願你夢想成真 ✨
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
