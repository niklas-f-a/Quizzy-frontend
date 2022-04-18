import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API'
import user from './modules/user.js'
import quiz from './modules/quiz.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    errorMessage: '', 
    message: '',
    loading: false
  },
  mutations: {
    setMessage(state, message){
      state.message = message
    },
    removeMessage(state){
      state.message = ''
    },
    removeErrorMessage(state){
      state.errorMessage = ''
    },
    setError(state, errorMessage){
      state.errorMessage = errorMessage
    },
    storeCategories(state, categories){
      state.categories = categories
    },
  },
  actions: {
    sendScore(_, payload){
      API.QUIZ.sendScore(payload)
    },
    removeErrorMessage({commit}){
      commit('removeErrorMessage')
    },
    removeMessage({commit}){
      commit('removeErrorMessage')
    },
    getCategories({commit}){
      API.QUIZ.getCategories()
      .then(data => {
        commit('storeCategories', data)
      })
    },
    
  },
  getters: {
    musicCategory(state){
      return state.quiz.quizList.filter(quiz => quiz.CategoryId == 1)
    },
    natureCategory(state){
      return state.quiz.quizList.filter(quiz => quiz.CategoryId == 2)
    },
    movieCategory(state){
      return state.quiz.quizList.filter(quiz => quiz.CategoryId == 3)
    },
    mixCategory(state){
      return state.quiz.quizList.filter(quiz => quiz.CategoryId == 4)
    }, 
    userQuizzes(state){
      return state.quiz.quizList.filter(quiz => quiz.userId == state.user.info.id)
    }
  },
  modules: {
    user,
    quiz
  }
})
