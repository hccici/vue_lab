<template>
  <div>
    <el-button @click="addOneData">新增一行</el-button>
    <config-table ref="supplier" :cols="supplierConfig" :isEdit="true" v-on="{'ops-shanchu': delOneData}" />
  </div>
</template>

<script>
import { supplierConfig } from './config';
import ConfigTable from '@components/config-components/ConfigTable'
export default {
  components: {
    ConfigTable
  },
  data() {
    return {
      supplierConfig
    }
  },
  methods: {
    // 选择供应商新增一空条数据
    addOneData() {
      this.$refs.supplier.addOneData();
    },
    // 选择供应商删除一空数据
    delOneData(scope) {
      this.$refs.supplier.delOneData(scope.$index);
    },
  },
}
</script>

<style>
</style>