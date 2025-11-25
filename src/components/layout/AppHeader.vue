<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
    <nav class="max-w-6xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
          <span class="text-2xl">🌟</span>
          <span>許願池</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink to="/wishes" class="text-gray-600 hover:text-purple-600 transition-colors">
            願望池
          </RouterLink>
          <RouterLink to="/wishes/create" class="text-gray-600 hover:text-purple-600 transition-colors">
            許願
          </RouterLink>

          <template v-if="authStore.isAuthenticated">
            <RouterLink to="/profile" class="text-gray-600 hover:text-purple-600 transition-colors">
              個人中心
            </RouterLink>
            <button
              @click="authStore.logout"
              class="text-gray-600 hover:text-red-500 transition-colors"
            >
              登出
            </button>
          </template>
          <template v-else>
            <RouterLink
              to="/login"
              class="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              登入
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 text-gray-600 hover:text-purple-600"
          aria-label="選單"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMenuOpen" class="md:hidden mt-4 pb-2 space-y-2">
        <RouterLink
          to="/wishes"
          class="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg"
          @click="isMenuOpen = false"
        >
          願望池
        </RouterLink>
        <RouterLink
          to="/wishes/create"
          class="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg"
          @click="isMenuOpen = false"
        >
          許願
        </RouterLink>

        <template v-if="authStore.isAuthenticated">
          <RouterLink
            to="/profile"
            class="block px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-lg"
            @click="isMenuOpen = false"
          >
            個人中心
          </RouterLink>
          <button
            @click="authStore.logout(); isMenuOpen = false"
            class="block w-full text-left px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-lg"
          >
            登出
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="block px-4 py-2 text-center bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            @click="isMenuOpen = false"
          >
            登入
          </RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>
