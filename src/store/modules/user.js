import * as API from '@/API/API'
import router from '@/router'



export default{
  state:{
    info: {},
    authenticated: false
  },
  mutations: {
    registerAuth(state, auth){
      state.authenticated = auth
    },
    storeUser(state, user){
      state.info = user
    },
    logOut(state){
      state.info = {}
      state.quiz = []
      state.authenticated = false
    }
  },
  actions: {
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
    logOut({commit}){
      API.clearHeader()
      commit('logOut')
      router.push('/')
    },
    getMe({state, commit}){
      API.getMe()
      .then(res => commit('storeUser', res.data))
      .then(() => API.getMyQuizzes(state.info.id))
      .then(res => commit('storeQuiz', res.data))
    },
  }
}