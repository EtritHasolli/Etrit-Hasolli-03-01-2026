// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'
import EditStudent from '@/views/EditStudent.vue'
import StudentPage from '@/views/StudentPage.vue'
import ArchivePage from '@/views/ArchivePage.vue'
import HelpPage from '../views/HelpPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/student', component: StudentPage },
  { path: '/archive', component: ArchivePage },
  { path: '/help', component: HelpPage },
  { path: '/edit/:index', component: EditStudent }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  const userPass = localStorage.getItem('userPass')
  const isAuthenticated = user && userPass

  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
    return
  }

  next()
})

export default router