const BASE_URL = 'http://localhost:5001/api'

let myHeaders


export function storeToken(newToken){
  myHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+newToken
  }
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

export function getCategories(){
  return fetch(BASE_URL+'/quizzes/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
}

export function getQuizzes(catId){
  return fetch(BASE_URL+'/quizzes/categories/'+catId, {
    method: 'GET',
    headers: myHeaders
  })
  .then(res => res.json())
}

export function getQuizQuestions(id){
  return fetch(BASE_URL+'/quizzes/'+id, {
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

export function sendScore({score, quizId}){
  fetch(BASE_URL+'/quizzes/result/'+quizId, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ 'score': score })
  })
}

export function getMe(){
  return fetch(BASE_URL+'/users/me', {
    method: 'GET', 
    headers: myHeaders
  })
  .then(res => res.json())
}

export function getMyQuizzes(id){
  return fetch(BASE_URL+'/quizzes/users/'+id, {
    method: 'GET',
    headers: myHeaders
  })
  .then(res => res.json())
}