const BASE_URL = 'http://localhost:5001/api'
// let token = ''

// export function storeToken(newToken){
//   token = newToken
// }

export function registerUser(credentials){
  const newUser = fetch(BASE_URL+'/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(res => {
    return res.json()
  })
 return newUser
}

export function login(credentials){
  const user = fetch(BASE_URL+'/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(res => {
    return res.json()
  })
  return user
}

export function getCategories(){
  const cat = fetch(BASE_URL+'/quizzes/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  return cat
}