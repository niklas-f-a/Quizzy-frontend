const BASE_URL = 'http://localhost:5001/api'
let token = ''

export function storeToken(newToken){
  token = newToken
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
    return res.json()
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
    return res.json()
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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    }
  })
  .then(res => res.json())
}

export function getQuizQuestions(id){
  return fetch(BASE_URL+'/quizzes/'+id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    }
  })
  .then(res => res.json())
}