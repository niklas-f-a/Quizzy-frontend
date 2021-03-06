import {myHeaders} from './index'

const BASE_URL = process.env.VUE_APP_BASE_URL+'/api'



export function updateQuestion({questionId, updatedQuestion}){
  return fetch(BASE_URL+'/quizzes/question/'+questionId, {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify(updatedQuestion)
  })
  .then(res => res.json())
}

export async function sendQuiz({quizInfo, quizImage, quizQuestions}){
  const quiz = await sendQuizInfo(quizInfo)
  await sendQuizImage(quizImage)
  addQuizId(quizQuestions, quiz.data.id)
  await sendQuizQuestions(quizQuestions)
}

function addQuizId(questions, quizId){
  return questions.map(question => {
    question['QuizId'] = quizId
  })
}

function sendQuizQuestions(quizQuestions){
  return fetch(BASE_URL+'/quizzes', {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(quizQuestions)
  })
  .then(res => res.json())
}

function sendQuizInfo(quizInfo){
  return fetch(BASE_URL+'/quizzes', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(quizInfo)
  })
  .then(res => res.json())
}

function sendQuizImage(quizImage){
  return fetch(BASE_URL+'/images/upload', {
    method: 'POST',
    headers: {
      'Authorization': myHeaders['Authorization']
    },
    body: quizImage
  })
  .then(res => res.json())
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

export function getQuizzes({catId, page = 1, pageSize = 8}){
  console.log(catId, page, pageSize);
  return fetch(`${BASE_URL}/quizzes/categories/${catId}?page=${page}&pageSize=${pageSize}`, {
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

export function sendScore({score, quizId}){
  fetch(BASE_URL+'/quizzes/result/'+quizId, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ 'score': score })
  })
}