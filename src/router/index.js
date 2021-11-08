import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import Work from '../views/Work.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import UserUpdate from '../views/UserUpdate.vue'
import store from  '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminLayout',
    component: AdminLayout,
    children:[
      {
        path:'user',
        name: 'UserUpdate',
        component: UserUpdate
      },
      {
        path:'',
        name:'Work',
        component: Work
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.auth.isAuthenticated && to.name !== 'Register') {
    next({ name: 'Login' || 'Register'})
  } else if(to.name === 'Login' && store.state.auth.isAuthenticated) {
    next({ name: 'Work' })
  } else if (to.name === 'Register' && store.state.auth.isAuthenticated){
    next({ name: 'Work' })
  }else {
    next()
  }
})
export default router
