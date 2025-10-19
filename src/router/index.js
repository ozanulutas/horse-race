import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'race',
      component: () => import('@/views/RaceView.vue'),
    },
  ],
})

export default router
