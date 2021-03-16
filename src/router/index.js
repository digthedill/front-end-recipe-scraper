import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FullRecipe from '../components/FullRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import('../views/Recipes.vue'),
  },
  {
    path: '/recipes/:id',
    name: 'full recipe',
    component: FullRecipe,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) => {
//   const authenticatedUser = null;
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   if (requiresAuth && !authenticatedUser) {
//     next("/");
//   } else {
//     next();
//   }
// });

export default router
