import './assets/css/main.css'
import './assets/css/selection.css'

import { router } from '@renderer/route'
import { i18n } from '@renderer/view/setting'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import { ExpandTreeView, FoldTreeView } from '@renderer/components'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .component('FoldTreeView', FoldTreeView)
  .component('ExpandTreeView', ExpandTreeView)
  .mount('#app')
