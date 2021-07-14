import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示。
import router from './router'
window.hhj = new Vue({
  beforeCreate(){
    console.log('vue根实例被创建！挂载到hhj')
  },
  updated(){
    console.log('hhj更新')
  },
  router,
  render: h => h(App)
}).$mount('#app')
