<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWishStore } from '@/stores/wish'
import { useAuthStore } from '@/stores/auth'
import type { Category } from '@/types'
import { CATEGORIES } from '@/types'

const router = useRouter()
const wishStore = useWishStore()
const authStore = useAuthStore()

const title = ref('')
const description = ref('')
const category = ref<Category>('other')
const isAnonymous = ref(false)
const isSubmitting = ref(false)
const error = ref('')

const categories = Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]

async function handleSubmit() {
  if (!title.value.trim()) {
    error.value = '請輸入願望標題'
    return
  }

  if (title.value.length > 50) {
    error.value = '標題不能超過 50 字'
    return
  }

  isSubmitting.value = true
  error.value = ''

  const result = await wishStore.createWish({
    title: title.value.trim(),
    description: description.value.trim() || undefined,
    category: category.value,
    isAnonymous: isAnonymous.value,
    userId: authStore.user?.id || 'guest',
    userName: isAnonymous.value ? undefined : authStore.user?.nickname
  })

  if (result.success) {
    router.push('/wishes')
  } else {
    error.value = '發布失敗，請稍後再試'
  }

  isSubmitting.value = false
}
</script>

<template>
  <div class="py-8 px-4">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">
        <span class="mr-2">✨</span>許下願望
      </h1>
      <p class="text-gray-600 text-center mb-8">
        寫下你的心願，讓大家為你送上祝福
      </p>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <!-- Title -->
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            願望標題 <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="title"
            type="text"
            maxlength="50"
            placeholder="我希望..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
          <p class="text-sm text-gray-400 mt-1 text-right">{{ title.length }}/50</p>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            詳細描述 <span class="text-gray-400">(選填)</span>
          </label>
          <textarea
            id="description"
            v-model="description"
            rows="4"
            maxlength="500"
            placeholder="分享更多關於這個願望的故事..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
          />
          <p class="text-sm text-gray-400 mt-1 text-right">{{ description.length }}/500</p>
        </div>

        <!-- Category -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            選擇分類
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="[key, value] in categories"
              :key="key"
              type="button"
              @click="category = key"
              class="px-4 py-3 rounded-xl text-sm font-medium transition-all"
              :class="category === key
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'"
            >
              {{ value.emoji }} {{ value.label }}
            </button>
          </div>
        </div>

        <!-- Anonymous Toggle -->
        <div class="mb-8">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="isAnonymous"
              class="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span class="text-gray-700">匿名發布</span>
          </label>
          <p class="text-sm text-gray-500 mt-1 ml-8">
            匿名發布後，其他人將無法看到你的名稱
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <span v-if="isSubmitting">發布中...</span>
          <span v-else>🌟 發布願望</span>
        </button>
      </form>
    </div>
  </div>
</template>
