<!-- 配置型表格组件 -->
<template>
  <el-form :model="{t: tableData}" ref="table" v-bind="c_formConfig">
    <el-table :data="tableData" v-bind="tableConfig">
      <el-table-column v-if="index" align="center" type="index" />
      <el-table-column v-if="selection" type="selection" />
      <template v-for="col of cols">
        <recursion-column :key="col.key" :col="col">
          <template v-slot:default="scope">
            <!-- 组件 -->
            <el-form-item v-if="col.type && isEdit" :prop="`t.${scope.$index}.${col.key}`"
              :rules="isEdit ? isFun('rules', col, scope) : undefined" :ref="'row' + scope.$index">
              <!-- 文本框 -->
              <template v-if="isFun('type',col , scope) === 'input'">
                <el-input :type="col.area ? 'textarea' : 'text'"
                  v-bind="getBind(col.config, componentsConfig.input, scope)"
                  :value="getValueByPath(scope.row, col.key)" @input="setValueByPath(scope.row, col.key, $event)">
                </el-input>
              </template>
              <!-- 操作选项 -->
              <div v-else-if="isFun('type',col , scope) === 'operation'" class="operation-box">
                <template v-for="icon of col.icons">
                  <el-tooltip :key="icon.name" :content="isFun('tooltip', icon , scope)" placement="top">
                    <i :class="['ifont', `ifont-${icon.name}`, {active: isFun('active', icon , scope)}]"
                      @click="isFun('active', icon , scope) && $emit(`ops-${icon.name}`, scope)" />
                  </el-tooltip>
                </template>
              </div>
            </el-form-item>
            <!-- 纯文本 -->
            <span v-else>
              {{getValueByPath(scope.row, col.key)}}
            </span>
          </template>
        </recursion-column>
      </template>
    </el-table>
  </el-form>
</template>

<script>
import { commonMixin } from './commonMixin.js';
import { ct_formCfg as defaultFormConfig } from './defaultConfig';
import { createObjByPath } from '../utils/tools';
import RecursionColumn from './RecursionColumn';
export default {
  mixins: [commonMixin],
  components: {
    RecursionColumn,
  },
  props: {
    tableConfig: { // <el-table>组件上的配置
      type: Object,
      default: () => ({}),
    },
    getDataUrl: { // 传入获取数据的URL
      type: String,
    },
    getDataMethod: { // 传入获取数据的方法
      type: Function,
    },
    selection: { // 是否可以选择
      type: Boolean,
      default: false,
    },
    index: { // 是否带索引
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData: [],
      defaultFormConfig,
    };
  },
  methods: {
    // todo 新增一行空数据（实现），复制一行数据（待实现）
    addOneData() {
      const obj = {};
      this.cols.forEach(item => {
        item.key && Object.assign(obj, createObjByPath(item.key));
      });
      this.tableData.push(obj);
    },
    // 删除一行数据
    delOneData(index) {
      this.tableData.splice(index, 1);
    },
  },
};
</script>