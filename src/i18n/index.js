import Vue from "vue";
import VueI18n from "vue-i18n";
import en from './en';
import cn from './cn';
Vue.use(VueI18n)
// 根据localStorage来选择语言
const locale = localStorage.getItem('lang')
export default new VueI18n({
  locale: locale || 'cn',
  messages: {
    cn,
    en
  },
})