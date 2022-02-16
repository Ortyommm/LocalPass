import { createI18n } from 'vue-i18n'
import ru from 'src/renderer/plugins/locales/ru'
import en from 'src/renderer/plugins/locales/en'

export const i18n = new createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'ru',
  globalInjection: true,
  messages: {
    ru,
    en,
  },
})
