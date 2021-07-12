import Vue from 'vue'
import App from './App.vue'
import '../plugin/vue-cli-mode';
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示。
new Vue({
  render: h => h(App)
}).$mount('#app')
