import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import modules from './modules'

export default new createStore({
  modules,
  strict: process.env.NODE_ENV !== 'production',

  // TODO: Enable when deploy
  // plugins: [createPersistedState()]
})
