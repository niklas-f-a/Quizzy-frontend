import Vue from 'vue'
import * as API from '@/API'



export default {
  state: {
    quizzes: {},
    quizList: [],
    loading: false,
    quizPerPage: 8,
    currentPage: 1,
    maxQuizCount: {
      music: null,
      movie: null,
      nature: null,
      mix: null
    }
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
      state.quizzes[quizId].questions[index] = updatedQuestion
      console.log(state.quizzes[quizId].questions[index]);
    },
    storeQuestions(state, questions){
      state.quizzes[questions[0].QuizId]['questions'] = questions
      state.loading = false
    },
    toggleLoading(state){
      state.loading = !state.loading
    },
    setMaxQuizCount(state, {maxCount, category}){
      state.maxQuizCount[category] = maxCount
    },
    increaseCurrentPage(state){
      state.currentPage++
    },
  },
  actions: {
    increasePageCounter({commit, state, dispatch}, {catId, maxPages}){
      if(state.currentPage < maxPages){
        commit('increaseCurrentPage', catId)
        dispatch('getQuizzes', (catId))
      }
    },
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
    getQuizzes({commit, state},catId){
      API.QUIZ.getQuizzes({catId, page: state.currentPage})
      .then(res => {
        console.log(res);
        commit('setMaxQuizCount', {maxCount: res.categoryCount.counts, category: res.data[0].Category.name})
        commit('storeQuiz', res.data)
      })
    },
    getQuizQuestions({commit}, id){
      commit('toggleLoading')
      API.QUIZ.getQuizQuestions(id)
      .then(res => commit('storeQuestions', res.data))
    }
  },
  getters: {
    maxMusicPages(state){
      return Math.ceil(state.maxQuizCount.music / state.quizPerPage)
    },
    maxNaturePages(state){
      return Math.ceil(state.maxQuizCount.nature / state.quizPerPage)
    },
    maxMixPages(state){
      return Math.ceil(state.maxQuizCount.mix / state.quizPerPage)
    },
    maxMoviePages(state){
      return Math.ceil(state.maxQuizCount.movie / state.quizPerPage)
    }
  }
}