import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/Product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product/:pid',
    name: 'Product',
    component: Product,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
