import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import WorkLayout from '../views/Work.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import UserUpdate from '../views/UserUpdate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminLayout',
    component: AdminLayout,
    children:[
      {
        path:'user',
        name: 'UserLayout',
        component: UserUpdate
      },
      {
        path:'',
        component: WorkLayout
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginLayout',
    component: Login
  },
  {
    path: '/register',
    name: 'RegisterLayout',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
