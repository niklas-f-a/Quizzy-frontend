import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '../views/Login.vue'
import Categories from '../views/Categories.vue'
import QuizView from '../views/QuizView.vue'
import Quiz from '../views/Quiz.vue'
import Profile from '../views/Profile.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login, 
    beforeEnter: (to, from, next) => {
      if(store.state.user.authenticated){
        next({name: 'Categories'})
      }else{
        next()
      }
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/categories/:catId',
    name: 'Quizzes',
    component: QuizView
  }, 
  {
    path: '/profile', 
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz, 
    beforeEnter: (to, from, next) => {
      if(store.state.errorMessage){
        next(false)
      }else{
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(!store.state.user.authenticated && to.name !== 'Login'){
    next({name: 'Login'})
  }else{
    next()
  }
})

export default router
