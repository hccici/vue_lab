import Vue from 'vue'
import Router from '@modules/myRouter'
import aboutMe from '@views2/aboutMe'
import register from '@views2/register'
Vue.use(Router) // 1、让每个vue的实例都能获取到router实例 2、全局注册router-view和router-link组件 3、响应式路由

const routes = [
  {
    path: '/aboutMe',
    name: '/aboutMe',
    component: aboutMe
  },
  {
    path: '/register',
    name: '/register',
    component: register
  }
]
export default new Router({
  mode: 'history',
  base: '/other',
  routes
})