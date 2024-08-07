import en from '@renderer/assets/locales/en.json'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import.meta.glob(`../../assets/locales/*.json`, { eager: true })

export const i18n = createI18n({
  legacy: false, // 设置为false以使用Composition API
  locale: 'en', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: { en }
})

async function loadLocaleMessages(locale: string) {
  // load locale messages with dynamic import
  if (i18n.global.locale.value === locale) return

  const messages = await import(`@renderer/assets/locales/${locale}.json`)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

export const setI18nLanguage = async (id: string) => {
  const html = document.querySelector('html')
  await loadLocaleMessages(id)
  i18n.global.locale.value = id as unknown as any

  if (html) {
    html.setAttribute('lang', id)
    const dr = ['ar', 'fa'].includes(id) ? 'rtl' : 'ltr'
    html.setAttribute('dir', dr) // 设置文本方向
  }
}

export const languageMap = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
  es: 'Español',
  fa: 'فارسی', // none
  fr: 'Français',
  id: 'Bahasa Indonesia', // none
  it: 'Italiano', // none
  ja: '日本語',
  ko: '한국어',
  ms: 'Bahasa Melayu', // none
  nl: 'Nederlands', // none
  no: 'Norsk', // none
  pl: 'Polski', // none
  pt: 'Português',
  ru: 'Русский',
  sv: 'Svenska', // none
  tr: 'Türkçe', // none
  uk: 'Українська', // none
  vi: 'Tiếng Việt', // none
  zh_hans: '简体中文',
  zh_hant: '繁体中文'
}

export function getLanguageName(val: string) {
  if (!val) return t('common.unknown')

  if (val.includes('zh')) {
    return '中文'
  }
  return languageMap[val] || val
}

export const langs: { id: string; value: string }[] = Object.keys(languageMap).map((key) => ({
  id: key,
  value: languageMap[key]
}))

export function t(key: string) {
  return i18n.global.t(key)
}
