import { createRouter, createWebHashHistory } from 'vue-router'

import BookView from '../view/Book.vue'
import HomeView from '../view/Home.vue'
import NoteView from '../view/Note.vue'
import SettingView from '../view/Setting.vue'

export const RouterName = {
  Home: '/',
  Book: '/book',
  Note: '/note',
  Setting: '/setting'
}

const routes = [
  { path: RouterName.Home, component: HomeView },
  { path: RouterName.Book, component: BookView },
  { path: RouterName.Note, component: NoteView },
  { path: RouterName.Setting, component: SettingView }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
