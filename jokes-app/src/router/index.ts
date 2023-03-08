import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OnePartJokesView  from '../views/OnePartJokesView.vue'
import TwoPartJokesView  from '../views/TwoPartJokesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/onepartjokes',
      name: 'onepartjokes',
      component: OnePartJokesView
    },
    {
      path: '/twopartjokes',
      name: 'twopartjokes',
      component: TwoPartJokesView
    },
  ]
})

export default router
