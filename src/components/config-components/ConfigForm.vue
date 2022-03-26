 <!-- 配置型表单组件 -->
<template>
  <el-form v-bind="c_formConfig" :model="value" class="info-form">
    <template v-for="col in cols">
      <el-form-item :key="col.key" :label="$t(col.title)" :prop="`${col.key}`"
        :rules="isEdit ? isFun('rules', col) : undefined">
        <template v-if="isEdit && col.type">
          <!-- 输入框 -->
          <el-input v-if="isFun('type', col) === 'input'" v-bind="getBind(col.config, componentsConfig.input)"
            :value="getValueByPath(value, col.key)"
            @input="setValueByPath(value, col.key, $event);isFun('onInput', col, $event)">
          </el-input>
          <!-- 输入框 -->
          <el-select v-else-if="isFun('type', col) === 'select'" v-bind="getBind(col.config, componentsConfig.select)"
            :value="getValueByPath(value, col.key)"
            @change="isFun('onChange', col, $event);setValueByPath(value, col.key, $event)">
            <el-option v-for="item in isFun('options', col)" v-bind="item" :key="item.value" />
          </el-select>
        </template>
        <!-- 纯文本 -->
        <span v-else>{{ value[col.key] }}</span>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { commonMixin } from './commonMixin.js';
import { cf_formCfg as defaultFormConfig } from './defaultConfig';
export default {
  mixins: [commonMixin],
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultFormConfig,
    };
  },
};
</script>

<style lang="less" scoped>
.info-form {
  /deep/.el-form-item__label {
    font-size: 12px;
    font-weight: bolder;
    color: #333333;
  }
  /deep/.el-form-item {
    margin-bottom: 4px;
  }
  .breakWord {
    word-break: break-word;
  }
}
</style>