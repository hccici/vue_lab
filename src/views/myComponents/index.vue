<template>
  <div>
    <div>
      组件：
      <router-link to="/myComponents/myForm">表单</router-link> |
      <router-link to="/myComponents/searchSelect">输入框</router-link>
      <router-link to="/myComponents/editTable">编辑表格</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'myComponents'
}
</script>

<style>
</style>