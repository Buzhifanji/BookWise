import { createRouter, createWebHashHistory } from 'vue-router'

import BookView from '../view/Book.vue'
import HomeView from '../view/Home.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/book', component: BookView }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
