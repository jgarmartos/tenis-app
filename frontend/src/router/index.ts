import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlayersView from '@/views/PlayersView.vue'
import AddMatchComponent from '@/components/matches/AddMatchComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersView
    },
    {
      path: '/addMatch',
      name: 'addMatch',
      component: AddMatchComponent
    },
    {
      path: '/matches',
      name: 'matches',
      component: HomeView
    },
  ]
})

export default router
