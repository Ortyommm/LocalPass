import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ru from 'src/renderer/plugins/locales/ru'
import en from 'src/renderer/plugins/locales/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    ru,
    en,
  },
})
