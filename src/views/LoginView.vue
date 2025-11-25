<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  if (!email.value || !password.value) {
    error.value = '請輸入電子郵件和密碼'
    return
  }

  isLoading.value = true
  error.value = ''

  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/')
  } else {
    error.value = '登入失敗，請檢查帳號密碼'
  }

  isLoading.value = false
}
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="text-5xl mb-4">🌟</div>
        <h1 class="text-2xl font-bold text-gray-800">歡迎回到許願池</h1>
        <p class="text-gray-600 mt-2">登入後即可許願和送祝福</p>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            電子郵件
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            密碼
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <!-- Error -->
        <div v-if="error" class="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {{ error }}
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
        >
          {{ isLoading ? '登入中...' : '登入' }}
        </button>

        <!-- Demo Note -->
        <p class="text-center text-sm text-gray-500 mt-6">
          💡 示範模式：輸入任意帳號密碼即可體驗
        </p>
      </form>
    </div>
  </div>
</template>
