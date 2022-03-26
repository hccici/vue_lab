// config-form 的默认form配置
export const cf_formCfg = {
  layout: {
    col: 2,
  },
  labelWidth: '100px',
};
// config-table 的默认form配置
export const ct_formCfg = {
  'errorType': 'tooltip',
};

// 渲染的组件的默认配置
export function getComponentsDefaultCfg(vue) {
  return {
    // el-input 默认配置
    input: {
      placeholder: vue.$t('HDP.PUB.PleaseInput'),
    },
    // el-select 默认配置
    select: {
      placeholder: vue.$t('HDD.Bom.Pleaseselect'),
    },
  };
}