import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '../views/AdminLayout.vue'
import LoginLayout from '../views/LoginLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout
  },
  {
    path: '/login',
    name: 'LoginLayout',
    component: LoginLayout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
