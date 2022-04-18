import {myHeaders} from './index'

const BASE_URL = process.env.VUE_APP_BASE_URL+'/api'


export function login(credentials){
  return fetch(BASE_URL+'/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(res => {
    if(res.status != 200){
      return {error: res.statusText}
    }else{
      return res.json()
    }
  })
}

export function registerUser(credentials){
  return fetch(BASE_URL+'/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(res => {
    if(res.ok == false){
      throw new Error('User Alredy exists')
    }else{
      return res.json()
    }
  })
}

export function getMe(){
  return fetch(BASE_URL+'/users/me', {
    method: 'GET', 
    headers: myHeaders
  })
  .then(res => res.json())
}

export function hasUserTakenQuiz(id){
  return fetch(BASE_URL+'/quizzes/taken/'+id, {
    method: 'GET', 
    headers: myHeaders
  })
  .then(res => {
    res.json()
    if(res.status != 200){
      return true
    }
    else {
      return false
    }
  })
}

export function getMyQuizzes(id){
  return fetch(BASE_URL+'/quizzes/users/'+id, {
    method: 'GET',
    headers: myHeaders
  })
  .then(res => res.json())
}