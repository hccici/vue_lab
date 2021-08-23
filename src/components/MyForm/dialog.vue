<template>
  <el-dialog class="addObj" :title="title" :visible.sync="visible" :close-on-click-modal="false" width="1200px"
    :before-close="handlerCancle">
    <my-form v-bind="$attrs" :form="copyForm" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handlerConfirm">确定</el-button>
      <el-button @click="handlerCancle">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import MyForm from './index';
import { deepclone } from '@utils/common.js'
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    MyForm
  },
  data() {
    return {
      visible: false,
      copyForm: {}
    }
  },
  methods: {
    show(form) {
      this.visible = true
      this.copyForm = deepclone(form)
    },
    handlerConfirm() {
      this.$emit('change', this.copyForm)
      this.handlerCancle()
    },
    handlerCancle() {
      const to = setTimeout(() => {
        this.copyForm = {}
        clearTimeout(to)
      }, 100)
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>