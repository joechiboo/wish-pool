import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/wish-pool/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '首頁' }
    },
    {
      path: '/wishes',
      name: 'wishes',
      component: () => import('@/views/WishListView.vue'),
      meta: { title: '願望池' }
    },
    {
      path: '/wishes/create',
      name: 'create-wish',
      component: () => import('@/views/CreateWishView.vue'),
      meta: { title: '許願', requiresAuth: true }
    },
    {
      path: '/wishes/:id',
      name: 'wish-detail',
      component: () => import('@/views/WishDetailView.vue'),
      meta: { title: '願望詳情' }
    },
    {
      path: '/category/:category',
      name: 'category',
      component: () => import('@/views/CategoryView.vue'),
      meta: { title: '分類' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { title: '個人中心', requiresAuth: true }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: '聯繫我們' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: '登入' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '404' }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || '願望池'} - Wish Pool`
  next()
})

export default router
