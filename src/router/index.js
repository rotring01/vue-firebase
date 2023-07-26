import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title: 'Mon Blog',   
      },
    },

    {
      path: '/register',
      name: 'register',
      component: ()=> import('../views/RegisterView.vue') ,
      meta:{
        title: 'Inscription',   
      },
    },

    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/LoginView.vue') ,
      meta:{
        title: 'Connexion',   
      },
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]

})


router.beforeEach((to, from, next) => {
   document.title = to.meta.title;

   next();
})

export default router
