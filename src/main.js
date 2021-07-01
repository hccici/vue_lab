import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vue-cli-mode';
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示。
// 全局注册icon
import '@/icons'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
