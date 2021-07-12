
<template>
  <MyForm :config="config" :render-set="renderSet" :form="form" />
</template>

<script>
const getSelect = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ value: '18', label: '18' }, { value: '19', label: '19' }])
    }, 3000)
  })
}
import MyForm from '@components/MyForm'
export default {
  name: 'myForm',
  components: {
    MyForm
  },
  data() {
    return {
      config: {
        gutter: 10
      },
      renderSet: [
        [
          { type: 'input', label: '姓名', key: 'name', rules: [{ required: true, message: '请输入姓名', trigger: 'change' }], span: 6 },
          {
            type: 'radio', label: '性别', key: 'sex', rules: [{ required: true, message: '请输入性别', trigger: 'change' }], span: 6,
            options: [{ value: 'boy', label: '男' }, { value: 'girl', label: '女' }]
          },
        ],
        [
          {
            type: 'select', label: '年龄', key: 'age', rules: [{ required: true, message: '请输入年龄', trigger: 'change' }],
            getOptionsMethod: getSelect
          },
        ]
      ],
      form: {
        name: 'hhj',
        age: '18',
        sex: 'boy',
      }
    }
  }
}
</script>

<style>
</style>