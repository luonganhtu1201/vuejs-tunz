import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '../views/AdminLayout.vue'
import UserLayout from '../views/UserLayout.vue'
import WorkLayout from '../views/WorkLayout.vue'
import LoginLayout from '../views/LoginLayout.vue'
import RegisterLayout from '../views/RegisterLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'AdminLayout',
    component: AdminLayout,
    children:[
      {
        path:'user',
        component: UserLayout
      },
      {
        path:'work',
        component: WorkLayout
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginLayout',
    component: LoginLayout
  },
  {
    path: '/register',
    name: 'RegisterLayout',
    component: RegisterLayout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
