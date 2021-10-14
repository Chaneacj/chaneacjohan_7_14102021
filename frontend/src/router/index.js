import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import PostForm from '../views/PostForm.vue'
import Admin from '../views/Admin.vue'
import auth from '../middleware/auth'
import isAdmin from '../middleware/isAdmin'
import VueRouteMiddleware from 'vue-route-middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        return next({ name: 'Feed' });
      }
      next();
    }
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        return next({ name: 'Feed' });
      }
      next();
    }
  },
  {
    path: '/Feed',
    name: 'Feed',
    component: Feed,
    meta: {
      middleware: auth
    }
  },
  {
    path: '/PostForm',
    name: 'PostForm',
    component: PostForm,
    meta: {
      middleware: auth
    }
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    meta: {
      middleware: [auth, isAdmin]
    },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: {
      middleware: auth
    }
  },
  { path: '*', redirect: { name: 'Feed' }}
]

const router = new VueRouter({
  routes,
  mode:"history"
})

router.beforeEach(VueRouteMiddleware())
export default router
