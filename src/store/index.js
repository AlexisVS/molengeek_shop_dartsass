import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
    profile: null,
  },
  mutations: {
    handleAuthToken (state, token) {
      state.authToken = token
    },
    handleProfile (state, profile) {
      state.profile = profile
    }
  },
  actions: {
  },
  modules: {
  }
})
