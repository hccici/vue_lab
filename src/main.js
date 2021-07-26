import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vue-cli-mode';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n';
Vue.use(ElementUI);
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示。
// 全局注册icon
import '@/icons'
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
