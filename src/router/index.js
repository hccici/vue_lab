import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/iconManager',
    name: 'iconManager',
    component: () => import('@views/iconManager')
  },
  {
    path: '/codeMirror',
    name: 'codeMirror',
    component: () => import('@views/codeMirror')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@views/table')
  },
  {
    path: '/myComponents',
    name: 'myComponents',
    component: () => import('@views/myComponents'),
    children: [
      {
        path: 'myForm',
        name: 'myForm',
        component: () => import('@views/myComponents/myForm')
      },
      {
        path: 'searchSelect',
        name: 'searchSelect',
        component: () => import('@views/myComponents/searchSelect')
      },
      {
        path: 'editTable',
        name: 'editTable',
        component: () => import('@views/myComponents/editTable.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
