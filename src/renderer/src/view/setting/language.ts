import en from '@renderer/assets/locales/en.json'
import { SelectItem } from '@renderer/components'
import { StorageSelect } from '@renderer/shared'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

import.meta.glob(`../../assets/locales/*.json`, { eager: true })

const key = 'book—wise__language'

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

const setI18nLanguage = async ({ id, value }: SelectItem) => {
  const html = document.querySelector('html')
  await loadLocaleMessages(id)
  i18n.global.locale.value = id as unknown as any

  if (html) {
    html.setAttribute('lang', value)
    const dr = ['ar', 'fa'].includes(id) ? 'rtl' : 'ltr'
    html.setAttribute('dir', dr) // 设置文本方向
  }
}

const languageMap = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
  es: 'Español',
  fa: 'فارسی',
  fr: 'Français',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  nl: 'Nederlands',
  no: 'Norsk',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  sv: 'Svenska',
  tr: 'Türkçe',
  uk: 'Українська',
  vi: 'Tiếng Việt',
  zh_hans: '简体中文',
  zh_hant: '繁体中文'
}

const langs: SelectItem[] = Object.keys(languageMap).map((key) => ({
  id: key,
  value: languageMap[key]
}))

export const languageStore = new StorageSelect(key, langs, setI18nLanguage)
