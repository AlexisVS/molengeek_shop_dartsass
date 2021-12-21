import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
    profile: null,
    myShop: null,
    shoppingCart: [],
  },
  mutations: {
    handleAuthToken (state, token) {
      state.authToken = token
    },
    handleProfile (state, profile) {
      state.profile = profile
    },
    handleMyShop (state, myShop) {
      state.myShop = myShop
    },
    handleShoppingCart (state, item) {
      if (state.shoppingCart.find(e => e.id == item.id) == undefined) {
        state.shoppingCart = [...state.shoppingCart, {...item}]
      }
      else {
        state.shoppingCart = [...state.shoppingCart].map(e => {
          if (e.id == item.id) {
            return {...e, quantity : e.quantity + item.quantity}
          }
          return e
        })
      }
      console.log(state.shoppingCart);
    }
  },
  getters: {
    personnalShopShoppinfCartQuantity: state => {
      if (state.shoppingCart.length > 0) {
        return [...state.shoppingCart].map(e => e.quantity).reduce( (a,b) => a + b)
      }
      return '0'
    }
  },
  actions: {
  },
  modules: {
  }
})
