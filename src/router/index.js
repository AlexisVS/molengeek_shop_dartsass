import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/shop',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/Shop.vue')
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
  },
  {
    path: '/personnal-shop',
    component: () => import(/* webpackChunkName: "PersonnalShop" */ '../views/PersonnalShop.vue')
  },
  {
    path: '/shopping-cart',
    component: () => import(/* webpackChunkName: "ShoppingCart" */ '../views/ShoppingCart.vue')
  },
  {
    path: '/ordered',
    component: () => import(/* webpackChunkName: "Ordered" */ '../views/Ordered.vue')
  },
  {
    path: '/all-shops',
    component: () => import(/* webpackChunkName: "AllShops" */ '../views/AllShops.vue')
  },
  {
    path: '/shop/:id',
    component: () => import(/* webpackChunkName: "UserShop" */ '../views/UserShop.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
