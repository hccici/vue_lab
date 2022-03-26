// 公用规则配置
// PCB编码在用
export function getR1() {
  const tip = this.$t('请输入完整的8位字符！');
  return [
    {
      validator(rule, value, callback) {
        value = value || '';
        if (value.trim().length !== 8) {
          callback(tip);
        } else {
          callback();
        }
      },
      trigger: ['blur'],
    },
  ];
}