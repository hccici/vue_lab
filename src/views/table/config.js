// 表格类组件配置
import { getR1 } from './rules';
// 选择供应商
// todo 后端接口没有写好，到时候在调，国际化
export const supplierConfig = [
  {
    key: 'test',
    title: '测试',
    children: [
      {
        key: 'supplierNo',
        title: '供应商编码',
        type: 'input',
        rules: getR1,
      },
      {
        key: 'supplierName',
        title: '供应商全称',
        type: 'input',
        config: {
          placeholder(scope) {
            if (scope.$index % 2 === 0) {
              return '测试1';
            } else {
              return '测试2';
            }
          },
        },
      },
    ],
  },
  {
    key: 'pcbPoints',
    title: 'PCB工艺难度分值',
  },
  {
    key: 'pcbPointsStandard',
    title: 'PCB工艺难度分值达标值',
  },
  {
    type: 'operation',
    title: '操作',
    icons: [
      {
        name: 'shanchu',
        tooltip: '重新分发',
        active: true,
      },
    ],
  },
];