import './assets/main.css'

import { router } from '@renderer/route'
import { i18n } from '@renderer/view/setting'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

import ExpandTree from '@renderer/components/tree/ExpandTree.vue'
import FoldTree from '@renderer/components/tree/FoldTree.vue'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .component('FoldTree', FoldTree)
  .component('ExpandTree', ExpandTree)
  .mount('#app')
