<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWishStore } from '@/stores/wish'
import WishCard from '@/components/wish/WishCard.vue'

const authStore = useAuthStore()
const wishStore = useWishStore()

const myWishes = computed(() => {
  if (!authStore.user) return []
  return wishStore.wishes.filter(w => w.userId === authStore.user!.id)
})
</script>

<template>
  <div class="py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-3xl text-white">
            {{ authStore.user?.nickname?.charAt(0) || '?' }}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">
              {{ authStore.user?.nickname || '訪客' }}
            </h1>
            <p class="text-gray-500">{{ authStore.user?.email }}</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="bg-purple-50 rounded-xl p-4 text-center">
            <div class="text-3xl font-bold text-purple-600">{{ myWishes.length }}</div>
            <div class="text-sm text-gray-600">我的願望</div>
          </div>
          <div class="bg-yellow-50 rounded-xl p-4 text-center">
            <div class="text-3xl font-bold text-yellow-600">
              {{ myWishes.reduce((sum, w) => sum + w.blessingCount, 0) }}
            </div>
            <div class="text-sm text-gray-600">收到祝福</div>
          </div>
        </div>
      </div>

      <!-- My Wishes -->
      <div>
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          <span class="mr-2">🌟</span>我的願望
        </h2>

        <div v-if="myWishes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WishCard
            v-for="wish in myWishes"
            :key="wish.id"
            :wish="wish"
          />
        </div>

        <div v-else class="text-center py-12 bg-white rounded-2xl">
          <div class="text-4xl mb-3">✨</div>
          <p class="text-gray-500">你還沒有許下任何願望</p>
        </div>
      </div>
    </div>
  </div>
</template>
