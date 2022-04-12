import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Categories from '../views/Categories.vue'
import QuizView from '../views/QuizView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/categories/:quizzes',
    name: 'Quizzes',
    component: QuizView
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
  }
  else{
    next()
  }
})

export default router
