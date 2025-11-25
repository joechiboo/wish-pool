<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useWishStore } from '@/stores/wish'
import WishCard from '@/components/wish/WishCard.vue'

const wishStore = useWishStore()
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-16 md:py-24 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            許下願望
          </span>
          <br />
          <span class="text-gray-800">收穫祝福</span>
        </h1>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          在這裡，每一個願望都值得被祝福。<br />
          分享你的心願，讓來自世界各地的祝福為你加油打氣。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/wishes/create"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>✨</span>
            <span>開始許願</span>
          </RouterLink>
          <RouterLink
            to="/wishes"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-purple-600 font-medium rounded-full hover:bg-purple-50 transition-all border border-purple-200"
          >
            <span>🌟</span>
            <span>探索願望</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Popular Wishes Section -->
    <section class="py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-800">
            <span class="mr-2">🔥</span>熱門願望
          </h2>
          <RouterLink
            to="/wishes"
            class="text-purple-600 hover:text-purple-700 font-medium"
          >
            查看全部 →
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WishCard
            v-for="wish in wishStore.popularWishes"
            :key="wish.id"
            :wish="wish"
          />
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 px-4 bg-white/50">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-12">
          <span class="mr-2">💫</span>如何使用
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center text-3xl">
              ✏️
            </div>
            <h3 class="font-bold text-gray-800 mb-2">許下願望</h3>
            <p class="text-gray-600 text-sm">
              寫下你的心願，可以選擇匿名或公開發布
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center text-3xl">
              🙏
            </div>
            <h3 class="font-bold text-gray-800 mb-2">獲得祝福</h3>
            <p class="text-gray-600 text-sm">
              其他用戶可以為你的願望送上祝福與鼓勵
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-3xl">
              🎉
            </div>
            <h3 class="font-bold text-gray-800 mb-2">夢想成真</h3>
            <p class="text-gray-600 text-sm">
              當願望實現時，分享你的喜悅給大家
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
