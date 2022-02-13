export default {
  getters: {
    pinKey(state) {
      return state.pinKey
    },
  },
  state: {
    pinKey: null,
  },
  mutations: {
    setPinKey(state, value) {
      state.pinKey = value
    },
  },
}
