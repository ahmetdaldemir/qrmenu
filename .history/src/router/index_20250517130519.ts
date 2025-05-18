import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Reservation from '../views/Reservation.vue'
import Route from '../views/Route.vue'
import RateUs from '../views/RateUs.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/route',
      name: 'Route',
      component: Route
    },
    {
      path: '/rate-us',
      name: 'RateUs',
      component: RateUs
    }
  ]
})

export default router 