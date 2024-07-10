import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import 'dayjs/locale/de'
import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/fa'
import 'dayjs/locale/fr'
import 'dayjs/locale/id'
import 'dayjs/locale/it'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'
import 'dayjs/locale/ms'
import 'dayjs/locale/nl'
// import 'dayjs/locale/no'
import 'dayjs/locale/pl'
import 'dayjs/locale/pt'
import 'dayjs/locale/ru'
import 'dayjs/locale/sv'
import 'dayjs/locale/tr'
import 'dayjs/locale/uk'
import 'dayjs/locale/vi'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-hk'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { watchEffect } from 'vue'
import { i18n } from './data'

dayjs.extend(localizedFormat)

watchEffect(() => {
  const lang = i18n.global.locale.value as unknown as string
  if (lang === 'zh_hans') {
    dayjs.locale('zh-cn')
  } else if (lang === 'zh_hant') {
    dayjs.locale('zh-hk')
  } else if (lang === 'no') {
    dayjs.locale('en')
  } else {
    dayjs.locale(lang)
  }
})
