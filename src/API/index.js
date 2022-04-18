import * as USER from './user'
import * as QUIZ from'./quiz'

export {USER, QUIZ}

export let myHeaders = {}

export function clearHeader(){
  myHeaders = {}
}

export function storeToken(newToken){
  myHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+newToken
  }
}