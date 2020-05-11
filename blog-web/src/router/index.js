import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/article/list'
    },
    {
      path: '/article/list',
      name: 'list-article',
      component: () => import(/* webpackChunkName: "article" */ '../views/List.vue')
    },
    {
      path: '/article/create',
      name: 'create-article',
      component: () => import(/* webpackChunkName: "article" */ '../views/Create.vue')
    },
    {
      path: '/article/:id/edit',
      name: 'edit-article',
      component: () => import(/* webpackChunkName: "article" */ '../views/Edit.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
