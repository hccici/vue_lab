<template>
  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <template v-for="(row, rowIndex) of selfRenderSet">
      <el-row :key="`row-${rowIndex}`" :gutter="selfConfig.gutter">
        <template v-for="col of row">
          <el-col :key="`${col.key}`" :span="col.span">
            <el-form-item :label="col.label" :prop="col.key">
              <template v-if="col.type === 'input'">
                <el-input v-model="form[col.key]"></el-input>
              </template>
              <template v-else-if="col.type === 'radio'">
                <el-radio-group v-model="form[col.key]">
                  <template v-for="opt of col.options">
                    <el-radio :key="opt.value" :label="opt.value">{{opt.label}}</el-radio>
                  </template>
                </el-radio-group>
              </template>
              <template v-else-if="col.type === 'select'">
                <el-select v-model="form[col.key]" :placeholder="col.placeholder"
                  :filterable="typeof col.getRemoteOptions === 'function'"
                  :remote="typeof col.getRemoteOptions === 'function'"
                  :remote-method="typeof col.getRemoteOptions === 'function' ? makeOptions(col): undefined"
                  :loading="col.loading">
                  <template v-for="opt of col.options">
                    <el-option :key="opt.value" :label="opt.label" :value="opt.value">
                    </el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </template>
  </el-form>
</template>

<script>
const defaultConfig = {
  gutter: 20
}
const defaultRenderConfig = {
  placeholder: '请输入',
  options: [],
  loading: false,
}
export default {
  name: 'MyForm',
  props: {
    config: {
      required: true,
      type: Object
    },
    renderSet: {
      required: true,
      type: Array
    },
    form: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      selfConfig: { ...defaultConfig, ...this.config },
      selfRenderSet: (() => {
        const result = []
        this.renderSet.forEach(row => {
          const newRow = []
          // 为每一列分配合适的span
          const defaultSpan = Math.floor(24 / row.length)
          row.forEach(col => {
            const newCol = { span: defaultSpan, ...defaultRenderConfig, ...col }
            // ! 异步，如果传入了getOptionsMethod，初始化选项
            if (typeof col.getOptionsMethod === 'function') {
              col.getOptionsMethod().then((result) => {
                console.log(`设置${newCol.label}的options成功！`)
                newCol.options = result
                this.$forceUpdate()
              })
            }
            newRow.push(newCol)
          })
          result.push(newRow)
        })
        return result
      })(),
      rules: (() => {
        const result = {}
        this.renderSet.forEach(row => {
          row.forEach(col => {
            col.rules && (result[col.key] = col.rules)
          })
        })
        return result
      })()
    }
  },
  methods: {
    makeOptions(col) {
      return async (val) => {
        col.loading = true
        const options = await col.getRemoteOptions(val)
        col.loading = false
        col.options = options
      }
    }
  }
}
</script>

<style>
</style>