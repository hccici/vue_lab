
<template>
  <div>
    <MyForm :config="config" :render-set="renderSet" :form="form" />
    <ul>
      <li v-for="(item,index) of formList" :key="item.name" @click="handleEdit(index)">
        {{`name: ${item.name} | age: ${item.age} | sex: ${item.sex}`}}
      </li>
    </ul>
    <my-dialog-form ref="dialog" :config="config" :render-set="renderSet" title="添加" @change="handleFormItemChange" />
  </div>

</template>

<script>
import { getAge, getAnimal } from '@api/options'
import MyForm from '@components/MyForm'
import MyDialogForm from '@components/MyForm/dialog'
import { SUCCESS } from '@utils/responseCode'
export default {
  name: 'myForm',
  components: {
    MyForm,
    MyDialogForm
  },
  data() {
    return {
      formIndex: 0,
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
            type: 'select', label: '类型', key: 'type', span: 6,
            getRemoteOptions: (val) => {
              return getAnimal({ key: val }).then(res => {
                if (res.code === SUCCESS) {
                  return res.data
                } else {
                  return []
                }
              })
            }
          },
          {
            type: 'select', label: '年龄', key: 'age', rules: [{ required: true, message: '请输入年龄', trigger: 'change' }],
            getOptionsMethod: function () {
              return getAge().then(res => {
                if (res.code === SUCCESS) {
                  return res.data
                } else {
                  return []
                }
              })
            }
          },
        ]
      ],
      form: {
        name: 'hhj',
        age: '18',
        sex: 'boy',
      },
      formList: [
        {
          name: 'hhj',
          age: '17',
          sex: 'boy',
        },
        {
          name: 'hzh',
          age: '18',
          sex: 'boy',
        },
        {
          name: 'ljw',
          age: '18',
          sex: 'boy',
        }
      ]
    }
  },
  methods: {
    handleEdit(index) {
      this.formIndex = index
      this.$refs.dialog.show(this.formList[index])
    },
    handleFormItemChange(form) {
      this.$set(this.formList, this.formIndex, form);
    }
  }
}
</script>

<style>
</style>