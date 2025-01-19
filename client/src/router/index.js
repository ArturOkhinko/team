import { createRouter, createWebHistory } from 'vue-router'
import ShortenUrl from "@/pages/ShortenUrl.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShortenUrl,
    },
  ],
})

export default router
