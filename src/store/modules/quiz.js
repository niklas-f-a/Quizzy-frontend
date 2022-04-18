import Vue from 'vue'
import * as API from '@/API'



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
    updateQuestion(state, {quizId, questionId, updatedQuestion}){
      const index = state.quizzes[quizId].questions.findIndex(question => question.id == questionId)
      console.log(index);
      state.quizzes[quizId].questions[index] = updatedQuestion
      console.log(state.quizzes[quizId].questions[index]);
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
      API.QUIZ.updateQuestion(question)
      .then(res => commit('setMessage', res.message))
      .then(() => commit('updateQuestion', question))
      .then(() => {
        setTimeout(() => {
          commit('removeMessage')
        }, 3000);
      })
    },
    sendQuiz({commit}, quiz){
      commit('toggleLoading')
      API.QUIZ.sendQuiz(quiz)
    },
    getQuizzes({commit},catId){
      API.QUIZ.getQuizzes(catId)
      .then(res => {
        commit('storeQuiz', res.data)
      })
    },
    getQuizQuestions({commit}, id){
      commit('toggleLoading')
      API.QUIZ.getQuizQuestions(id)
      .then(res => commit('storeQuestions', res.data))
    }
  }
}