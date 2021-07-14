<template>
  <div>
    <router-link to="/aboutMe">a</router-link> |
    <router-link to="/register">r</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log('app实例被创建')
  },
  updated() {
    console.log('app更新')
  },
}
</script>

<style>
</style>