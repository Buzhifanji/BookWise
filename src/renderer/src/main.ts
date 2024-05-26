import ar from './assets/locales/ar.json'
import de from './assets/locales/de.json'
import en from './assets/locales/en.json'
import es from './assets/locales/es.json'
import fr from './assets/locales/fr.json'
import ja from './assets/locales/ja.json'
import ko from './assets/locales/ko.json'
import nl from './assets/locales/nl.json'
import no from './assets/locales/no.json'
import pt from './assets/locales/pt.json'
import ru from './assets/locales/ru.json'
import sv from './assets/locales/sv.json'
import tr from './assets/locales/tr.json'
import zhCN from './assets/locales/zh-CN.json'
import zhHK from './assets/locales/zh-HK.json'
import './assets/main.css'

import { router } from '@renderer/route'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

const pinia = createPinia()

const i18n = createI18n({
  legacy: false, // 设置为false以使用Composition API
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: { ar, de, en, es, fr, ja, ko, nl, no, pt, ru, sv, tr, 'zh-CN': zhCN, 'zh-HK': zhHK }
})

createApp(App).use(pinia).use(i18n).use(router).mount('#app')
