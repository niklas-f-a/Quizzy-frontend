import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API/API.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      authenticated: true
    }, 
    categories: []
  },
  mutations: {
    registerAuth(state, auth){
      state.user.authenticated = auth
    }, 
    storeCategories(state, categories){
      state.categories = categories
    }
  },
  actions: {
    registerUser({commit}, credentials){
      API.registerUser(credentials)
      .then(() => {
        commit('registerAuth', true)
        // API.storeToken(data.token)
      })
    },
    login({commit}, credentials){
      API.login(credentials)
      .then((res) => {
        console.log(res);
        commit('registerAuth', true)
      })
    },
    getCategories({commit}){
      API.getCategories()
      .then(data => {
        commit('storeCategories', data)
      })
    }
  },
  modules: {
  }
})
