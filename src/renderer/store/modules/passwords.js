export default {
  getters: {
    passwords(state) {
      return state.passwords
    },
  },
  state: {
    passwords: null,
  },
  mutations: {
    setPasswords(state, value) {
      state.passwords = value
    },
  },
}
