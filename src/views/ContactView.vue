<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)

async function handleSubmit() {
  if (!name.value || !email.value || !message.value) return

  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  submitted.value = true
  isSubmitting.value = false
}
</script>

<template>
  <div class="py-12 px-4">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">
        <span class="mr-2">💌</span>聯繫我們
      </h1>
      <p class="text-gray-600 text-center mb-8">
        有任何問題或建議？歡迎與我們聯繫！
      </p>

      <div v-if="submitted" class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div class="text-5xl mb-4">✨</div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">感謝您的訊息！</h2>
        <p class="text-gray-600">我們會盡快回覆您。</p>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">您的名稱</label>
          <input id="name" v-model="name" type="text" required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
          <input id="email" v-model="email" type="email" required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
        </div>

        <div class="mb-6">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-2">訊息內容</label>
          <textarea id="message" v-model="message" rows="5" required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none" />
        </div>

        <button type="submit" :disabled="isSubmitting"
          class="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50">
          {{ isSubmitting ? '發送中...' : '送出訊息' }}
        </button>
      </form>
    </div>
  </div>
</template>
