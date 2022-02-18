import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ru from 'src/renderer/plugins/locales/ru'
import en from 'src/renderer/plugins/locales/en'

Vue.use(VueI18n)

const localeInLocalStorage = localStorage.getItem('locale')
let locale
const isRu = window.navigator.language.slice(0, 2) === 'ru'
if (!localeInLocalStorage) {
  locale = isRu ? 'ru' : 'en'
} else {
  locale = localeInLocalStorage
}
console.log({ locale })

export const i18n = new VueI18n({
  locale,
  fallbackLocale: 'ru',
  messages: {
    ru,
    en,
  },
})
