import './assets/main.css'

import { router } from '@renderer/route'
import { i18n } from '@renderer/view/setting'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).use(i18n).use(router).mount('#app')
