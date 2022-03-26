<template>
  <el-table-column :prop="col.key" :edit="col.pencil && isEdit" :label="$t(col.title)" show-overflow-tooltip
    :width="col.width">
    <template v-if="col.type" v-slot:default="scope">
      <slot v-bind="{...scope}" />
    </template>
    <template v-if="col.children">
      <recursion-column v-for="subCol in col.children" :key="subCol.key" :col="subCol">
        <slot />
      </recursion-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'RecursionColumn',
  props: {
    col: {
      type: Object,
      required: true,
    },
  },
};
</script>