import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API/API.js'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      authenticated: false, 
    }, 
    categories: [],
    quizzes: {},
    quizList: [], 
    errorMessage: '', 
    quizLoading: false
  },
  mutations: {
    removeErrorMessage(state){
      state.errorMessage = ''
    },
    setError(state, errorMessage){
      state.errorMessage = errorMessage
    },
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
      state.quizLoading = false
    }, 
  },
  actions: {
    sendScore(_, payload){
      API.sendScore(payload)
    },
    hasUserTakenQuiz({commit}, {id, categoryName}){
      API.hasUserTakenQuiz(id)
      .then(data => {
        if(data == true){
          commit('setError', 'You have already taken this quiz')
        }
        else{
          router.push({path:'/quiz/'+id, query: {name: categoryName}})
        }
      })
    },
    removeErrorMessage({commit}){
      commit('removeErrorMessage')
    },
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
        router.push('/categories')
      }) 
      .catch(error => {
        commit('setError', error.message)
      })
    },
    login({commit}, credentials){
      API.login(credentials)
      .then((data) => {
        if(data.error){
          commit('setError', data.error)
        }
        else{
          API.storeToken(data.token)
          commit('registerAuth', true)
        }
      })
      .then(() => {
        router.push('/categories')
      })
    },
    getCategories({commit}){
      API.getCategories()
      .then(data => {
        commit('storeCategories', data)
      })
    }, 
    getQuizQuestions({commit, state}, id){
      state.quizLoading = true
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
