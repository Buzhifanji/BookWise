import { createRouter, createWebHashHistory } from 'vue-router'

import LayoutView from '@renderer/layout/Layout.vue'
import BookView from '@renderer/view/Book.vue'
import HomeView from '@renderer/view/Home.vue'
import NoteView from '@renderer/view/Note.vue'
import ReaderView from '@renderer/view/reader/reader.vue'
import { SettingView } from '@renderer/view/setting'

export const RouterName = {
  Home: 'home',
  Book: 'book',
  Note: 'note',
  Setting: 'setting',
  Reader: 'reader',
  Layout: 'layout'
}

const routes = [
  // { path: '/', redirect: '/menu/' },
  {
    path: '/',
    name: RouterName.Layout,
    component: LayoutView,
    redirect: '/home', // 默认跳转
    children: [
      { path: 'home', name: RouterName.Home, component: HomeView },
      { path: 'book', name: RouterName.Book, component: BookView },
      { path: 'note', name: RouterName.Note, component: NoteView },
      { path: 'setting', name: RouterName.Setting, component: SettingView }
    ]
  },
  { path: '/reader:id', name: RouterName.Reader, component: ReaderView, props: true }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
