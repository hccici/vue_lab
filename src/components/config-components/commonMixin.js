// 配置型表格和表单公共部分代码
import { getComponentsDefaultCfg } from './defaultConfig';
export const commonMixin = {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    cols: { // 配置项
      type: Array,
      required: true,
    },
    formConfig: { // <el-form>组件上的配置
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      componentsConfig: getComponentsDefaultCfg(this),
    };
  },
  methods: {
    // 是否是方法，是就执行方法返回函数返回值，否返回原来的值
    isFun(type, col, ...relax) {
      if (col[type]) {
        return typeof col[type] === 'function' ? col[type].call(this, ...relax) : col[type];
      }
    },
    // 根据路径向下设置值
    setValueByPath(object, prop, val) {
      let _prop = prop || '';
      let cur = object;
      const paths = _prop.split('.');
      // 递归向下存值
      for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i];
        if (!cur) { break; }
        if (i === j - 1) {
          cur[path] = val;
          break;
        }
        cur = cur[path];
      }
    },
    // 根据路径向下获取值
    getValueByPath(object, prop) {
      let _prop = prop || '';
      let cur = object;
      let result = null;
      const paths = _prop.split('.');
      // 递归向下取值
      for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i];
        if (!cur) { break; }
        if (i === j - 1) {
          result = cur[path];
          break;
        }
        cur = cur[path];
      }
      return result;
    },
    // 绑定配置文件设置的属性和默认的属性
    getBind(setConfig, defaultConfig, ...relax) {
      setConfig = setConfig || {};
      const config = { ...defaultConfig };
      // 把是方法的属性给调用了
      Object.keys(setConfig).forEach(key => {
        config[key] = this.isFun(key, setConfig, ...relax);
      });
      return config;
    },
  },
  computed: {
    c_formConfig() { // 合并默认配置
      return {
        ...this.defaultFormConfig,
        ...this.formConfig,
      };
    },
  },
};