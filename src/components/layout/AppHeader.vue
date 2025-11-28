<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
    <nav class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-white hover:text-yellow-300 transition-colors">
          <span class="text-2xl">🌟</span>
          <span>許願池</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink to="/wishes/create" class="text-white/90 hover:text-yellow-300 transition-colors font-medium">
            ✨ 許願
          </RouterLink>
          <RouterLink to="/wishes" class="text-white/90 hover:text-yellow-300 transition-colors font-medium">
            🔮 探索願望
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 text-white hover:text-yellow-300"
          aria-label="選單"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMenuOpen" class="md:hidden mt-4 pb-2 space-y-2 bg-black/70 rounded-xl backdrop-blur-md p-4">
        <RouterLink
          to="/wishes/create"
          class="block px-4 py-3 text-white hover:bg-white/20 hover:text-yellow-300 rounded-lg transition-colors"
          @click="isMenuOpen = false"
        >
          ✨ 許願
        </RouterLink>
        <RouterLink
          to="/wishes"
          class="block px-4 py-3 text-white hover:bg-white/20 hover:text-yellow-300 rounded-lg transition-colors"
          @click="isMenuOpen = false"
        >
          🔮 探索願望
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
