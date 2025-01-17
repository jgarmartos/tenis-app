import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlayersView from '@/views/PlayersView.vue'
import AddMatchComponent from '@/components/matches/AddMatchComponent.vue'
import MatchInfoComponent from '@/components/matches/MatchInfoComponent.vue'
import PlayerProfile from '@/components/players/PlayerProfile.vue'

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
    {
      path: '/matchInfo',
      name: 'matchInfo',
      component: MatchInfoComponent,
      props: route => ({ 
        matchInfo: JSON.parse(route.query.matchInfo as string)
      })

    },
    {
      path: '/player/:id',
      name: 'playerInfo',
      component: PlayerProfile,
      // make the id prop available to the component
      props: route => ({
        id: route.params.id
      })
    }
  ]
})

export default router
