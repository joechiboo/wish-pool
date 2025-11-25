import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_token')
  }

  // 模擬登入（之後會換成 Supabase Auth）
  async function login(email: string, _password: string) {
    isLoading.value = true
    try {
      // TODO: 實作 Supabase Auth
      const mockUser: User = {
        id: '1',
        email,
        nickname: email.split('@')[0],
        createdAt: new Date().toISOString()
      }
      user.value = mockUser
      return { success: true }
    } catch (error) {
      return { success: false, error }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    login,
    logout
  }
})
