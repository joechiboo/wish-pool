// 分類類型
export type Category = 'health' | 'study' | 'career' | 'love' | 'other'

// 願望狀態
export type WishStatus = 'active' | 'fulfilled' | 'expired'

// 通知類型
export type NotificationType = 'blessing' | 'comment' | 'fulfilled' | 'announcement'

// 願望
export interface Wish {
  id: string
  title: string
  description?: string
  category: Category
  userId: string
  userName?: string
  userAvatar?: string
  isAnonymous: boolean
  blessingCount: number
  status: WishStatus
  deadline?: string
  createdAt: string
  updatedAt: string
}

// 祝福
export interface Blessing {
  id: string
  wishId: string
  userId: string
  userName?: string
  userAvatar?: string
  message?: string
  createdAt: string
}

// 使用者
export interface User {
  id: string
  email: string
  nickname: string
  avatar?: string
  createdAt: string
}

// 通知
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  relatedId?: string
  message: string
  isRead: boolean
  createdAt: string
}

// 分類資訊
export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  health: { label: '健康', emoji: '💪', color: 'emerald' },
  study: { label: '學業', emoji: '📚', color: 'blue' },
  career: { label: '事業', emoji: '💼', color: 'amber' },
  love: { label: '愛情', emoji: '💕', color: 'pink' },
  other: { label: '其他', emoji: '✨', color: 'purple' }
}
