import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OnePartJokesView from '../views/OnePartJokesView.vue';
import TwoPartJokesView from '../views/TwoPartJokesView.vue';
import MyFavoritesView from '../views/MyFavoritesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/onepartjokes',
      name: 'onepartjokes',
      component: OnePartJokesView,
    },
    {
      path: '/twopartjokes',
      name: 'twopartjokes',
      component: TwoPartJokesView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: MyFavoritesView,
    },
  ],
});

export default router;
