import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Wish, Category } from '@/types'

// 模擬資料（之後會換成 Supabase）
const mockWishes: Wish[] = [
  {
    id: '1',
    title: '希望今年能考上理想的研究所',
    description: '已經準備了很久，希望能夠順利上榜！',
    category: 'study',
    userId: '1',
    userName: '小明',
    isAnonymous: false,
    blessingCount: 128,
    status: 'active',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: '希望家人身體健康',
    description: '爸媽年紀大了，希望他們每天都健健康康的。',
    category: 'health',
    userId: '2',
    isAnonymous: true,
    blessingCount: 256,
    status: 'active',
    createdAt: '2025-01-14T08:30:00Z',
    updatedAt: '2025-01-14T08:30:00Z'
  },
  {
    id: '3',
    title: '希望能找到心儀的工作',
    category: 'career',
    userId: '3',
    userName: '求職者',
    isAnonymous: false,
    blessingCount: 89,
    status: 'active',
    createdAt: '2025-01-13T15:20:00Z',
    updatedAt: '2025-01-13T15:20:00Z'
  },
  {
    id: '4',
    title: '希望能遇到對的人',
    description: '單身太久了，希望今年能脫單！',
    category: 'love',
    userId: '4',
    isAnonymous: true,
    blessingCount: 342,
    status: 'active',
    createdAt: '2025-01-12T20:00:00Z',
    updatedAt: '2025-01-12T20:00:00Z'
  },
  {
    id: '5',
    title: '願世界和平',
    category: 'other',
    userId: '5',
    userName: '和平使者',
    isAnonymous: false,
    blessingCount: 512,
    status: 'active',
    createdAt: '2025-01-10T12:00:00Z',
    updatedAt: '2025-01-10T12:00:00Z'
  }
]

export const useWishStore = defineStore('wish', () => {
  const wishes = ref<Wish[]>(mockWishes)
  const selectedCategory = ref<Category | null>(null)
  const sortBy = ref<'latest' | 'popular'>('latest')
  const isLoading = ref(false)

  const filteredWishes = computed(() => {
    let result = [...wishes.value]

    if (selectedCategory.value) {
      result = result.filter(w => w.category === selectedCategory.value)
    }

    if (sortBy.value === 'popular') {
      result.sort((a, b) => b.blessingCount - a.blessingCount)
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  })

  const popularWishes = computed(() => {
    return [...wishes.value]
      .sort((a, b) => b.blessingCount - a.blessingCount)
      .slice(0, 5)
  })

  function setCategory(category: Category | null) {
    selectedCategory.value = category
  }

  function setSortBy(sort: 'latest' | 'popular') {
    sortBy.value = sort
  }

  function getWishById(id: string) {
    return wishes.value.find(w => w.id === id)
  }

  async function createWish(wish: Omit<Wish, 'id' | 'blessingCount' | 'status' | 'createdAt' | 'updatedAt'>) {
    isLoading.value = true
    try {
      // TODO: 實作 Supabase 儲存
      const newWish: Wish = {
        ...wish,
        id: Date.now().toString(),
        blessingCount: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      wishes.value.unshift(newWish)
      return { success: true, wish: newWish }
    } catch (error) {
      return { success: false, error }
    } finally {
      isLoading.value = false
    }
  }

  function blessWish(wishId: string) {
    const wish = wishes.value.find(w => w.id === wishId)
    if (wish) {
      wish.blessingCount++
    }
  }

  return {
    wishes,
    selectedCategory,
    sortBy,
    isLoading,
    filteredWishes,
    popularWishes,
    setCategory,
    setSortBy,
    getWishById,
    createWish,
    blessWish
  }
})
