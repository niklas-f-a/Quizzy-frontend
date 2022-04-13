import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API/API.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      authenticated: false
    }, 
    categories: [],
    quizzes: {},
    quizList: []
  },
  mutations: {
    registerAuth(state, auth){
      state.user.authenticated = auth
    }, 
    storeCategories(state, categories){
      state.categories = categories
    },
    storeQuiz(state, quizzes){
      quizzes.forEach(quiz => {
        if(!state.quizzes[quiz.id]){
          state.quizList.push(quiz)
          Vue.set(state.quizzes, quiz.id, quiz)
        }
      });
    }
  },
  actions: {
    getQuizzes({commit},catId){
      API.getQuizzes(catId)
      .then(res => {
        commit('storeQuiz', res.data)
      })
      
    },
    registerUser({commit}, credentials){
      API.registerUser(credentials)
      .then(data => {
        commit('registerAuth', true)
        API.storeToken(data.token)
      })
    },
    login({commit}, credentials){
      API.login(credentials)
      .then((data) => {
        API.storeToken(data.token)
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
  getters: {
    musicCategory(state){
      return state.quizList.filter(quiz => quiz.CategoryId == 1)
    }
  }
})
