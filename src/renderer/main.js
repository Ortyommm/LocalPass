import 'bulma-fluent/bulma.sass'
import 'material-design-icons/iconfont/material-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/bootstrap.min.css'
import './assets/font/bootstrap-icons.css'
import './assets/style/animations.scss'
import './assets/js/popper.min'
import './assets/js/bootstrap.min'
import './assets/style/main.scss'
import router from './router/index'
import store from './store/index'
import { i18n } from './plugins/i18n'
// import PortalVue from 'portal-vue'
const isDev = process.env.NODE_ENV === 'development'

// Vue.config.devtools = isDev
// Vue.config.performance = isDev
// Vue.config.productionTip = isDev

//TODO theme change?
//TODO load password archive
//TODO languages
const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
// new Vue({
//   el: '#app',
//   router,
//   store,
//   i18n,
//   render: (h) => h(App),
// })
console.log({ i18n })
// to avoild accesing electorn api from web app build
if (window && window.process && window.process.type === 'renderer') {
  const { ipcRenderer } = require('electron')

  // handle menu event updates from main script
  ipcRenderer.on('change-view', (event, data) => {
    if (data.route) {
      router.push(data.route)
    }
  })
}

// sample context menu
// const { remote } = require('electron')
// const { Menu, MenuItem } = remote
// const menu = new Menu()
// menu.append(new MenuItem({ label: 'Home' }))
// menu.append(new MenuItem({ type: 'separator' }))
// menu.append(new MenuItem({ label: 'Other' }))

// window.addEventListener(
//   'contextmenu',
//   (e) => {
//     e.preventDefault()
//     menu.popup({ window: remote.getCurrentWindow() })
//   },
//   false
// )
