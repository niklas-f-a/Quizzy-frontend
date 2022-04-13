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
    storeQuizCategory(state, quizzes){
      quizzes.forEach(quiz => {
        if(!state.quizzes[quiz.id]){
          state.quizList.push(quiz)
          Vue.set(state.quizzes, quiz.id, quiz)
        }
      });
    },
    storeQuestions(state, questions){
      state.quizzes[questions[0].QuizId]['questions'] = questions
    }
  },
  actions: {
    getQuizzes({commit},catId){
      API.getQuizzes(catId)
      .then(res => {
        commit('storeQuizCategory', res.data)
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
    }, 
    getQuizQuestions({commit}, id){
      API.getQuizQuestions(id)
      .then(res => commit('storeQuestions', res.data))
    }
  },
  getters: {
    musicCategory(state){
      return state.quizList.filter(quiz => quiz.CategoryId == 1)
    },
    natureCategory(state){
      return state.quizList.filter(quiz => quiz.CategoryId == 2)
    },
    movieCategory(state){
      return state.quizList.filter(quiz => quiz.CategoryId == 3)
    },
    mixCategory(state){
      return state.quizList.filter(quiz => quiz.CategoryId == 4)
    }, 
  }
})
