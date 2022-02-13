import 'bulma-fluent/bulma.sass'
import 'material-design-icons/iconfont/material-icons.css'
import Vue from 'vue'
import App from './App.vue'
import './assets/bootstrap.min.css'
import './assets/font/bootstrap-icons.css'
import './assets/style/animations.scss'
import './assets/style/main.scss'
import router from './router/index'
import store from './store/index'
// import PortalVue from 'portal-vue'
const isDev = process.env.NODE_ENV === 'development'

Vue.config.devtools = isDev
Vue.config.performance = isDev
Vue.config.productionTip = isDev

// tslint:disable-next-line: no-unused-expression
//TODO theme change
//TODO load password archive
//TODO languages
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})

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
