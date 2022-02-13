import Vue from 'vue'
import Router from 'vue-router'
import Login from 'src/renderer/views/Login.vue'
import Home from 'src/renderer/views/Home'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      meta: {
        title: 'Login',
        icon: 'fa-home',
      },

      component: Login,
      beforeEnter(to, from, next) {
        if (!store.getters.pinKey) {
          next()
          return
        }
        next(false)
      },
    },
    {
      path: '/home',
      meta: {
        title: 'Home',
        icon: 'fa-home',
      },
      beforeEnter(to, from, next) {
        console.log(store.getters.pinKey)
        if (store.getters.pinKey) {
          next()
          return
        }
        next('/login')
      },
      component: Home,
    },
  ],
})

router.afterEach((to) => {
  let title =
    to.path === '/home'
      ? process.env.PRODUCT_NAME
      : `${to.meta.title} - ${process.env.PRODUCT_NAME}`

  if (!title) {
    title = 'Home'
  }

  document.title = title
})

export default router
