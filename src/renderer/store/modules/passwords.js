export default {
  getters: {
    passwords(state) {
      return state.passwords
    },
  },
  state: {
    passwords: [],
  },
  mutations: {
    setPasswords(state, value) {
      state.passwords = value
    },
  },
}
