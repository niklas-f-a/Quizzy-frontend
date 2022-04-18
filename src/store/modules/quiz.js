import Vue from 'vue'
import * as API from '@/API/API'



export default {
  state: {
    quizzes: {},
    quizList: [], 
    loading: false
  },
  mutations: {
    storeQuiz(state, quizzes){
      quizzes.forEach(quiz => {
        if(!state.quizzes[quiz.id]){
          state.quizList.push(quiz)
          Vue.set(state.quizzes, quiz.id, quiz)
        }
      });
    },
    storeQuestions(state, questions){
      state.quizzes[questions[0].QuizId]['questions'] = questions
      state.loading = false
    },
    toggleLoading(state){
      state.loading = !state.loading
    }
  },
  actions: {
    updateQuestion({commit}, question){
      API.updateQuestion(question)
      .then(res => commit('setMessage', res.message))
    },
    sendQuiz({commit}, quiz){
      commit('toggleLoading')
      API.sendQuiz(quiz)
    },
    getQuizzes({commit},catId){
      API.getQuizzes(catId)
      .then(res => {
        commit('storeQuiz', res.data)
      })
    },
    getQuizQuestions({commit}, id){
      commit('toggleLoading')
      API.getQuizQuestions(id)
      .then(res => commit('storeQuestions', res.data))
    }
  }
}