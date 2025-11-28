import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/wish-pool/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: '許願池' }
    },
    {
      path: '/wishes',
      name: 'wishes',
      component: () => import('@/views/WishListView.vue'),
      meta: { title: '探索願望' }
    },
    {
      path: '/wishes/create',
      name: 'create-wish',
      component: () => import('@/views/CreateWishView.vue'),
      meta: { title: '許願' }
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
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: '關於我們' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: '聯繫我們' }
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
