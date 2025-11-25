<script setup lang="ts">
import { useWishStore } from '@/stores/wish'
import WishCard from '@/components/wish/WishCard.vue'
import CategoryFilter from '@/components/wish/CategoryFilter.vue'
import SortToggle from '@/components/wish/SortToggle.vue'

const wishStore = useWishStore()
</script>

<template>
  <div class="py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <span class="mr-2">🌟</span>願望池
        </h1>
        <p class="text-gray-600">
          探索大家的願望，為他們送上祝福
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <CategoryFilter />
        <SortToggle />
      </div>

      <!-- Wish List -->
      <div v-if="wishStore.filteredWishes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WishCard
          v-for="wish in wishStore.filteredWishes"
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
