import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import Survey from '@/views/Survey.vue'
import DefoultDashboard from '@/components/DefoultDashboard.vue'
import store from "@/store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          redirect:'/dashboard',
          component: DefoultDashboard,
          children:[
              {
                  name:'dashboard',
                  path:'/dashboard',
                  component:Dashboard,
                  meta: { requiresAuth: true },
              },
              {
                  path:'/surveys',
                  component:Survey
              }

          ]
      },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
      {
          path: '/register',
          name: 'register',
          component: Register
      },

  ]
})
router.beforeEach((to, from,next)=>{
     if(to.meta.requiresAuth && !store.state.user.token){
         next({name:'login'})
     }
     else if(store.state.user.token && (to.name==='login'||to.name==='register')){
          next({name:'dashboard'})
     }
     else {
         next()
     }
})
export default router
