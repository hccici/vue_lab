<template>
  <div id="nav" v-if="showNav">
    <router-link to="/iconManager">icon</router-link> |
    <router-link to="/myComponents">组件</router-link>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      showNav: true
    }
  },
  watch: {
    $route(nv) {
      if (nv.fullPath.includes('/myComponents')) {
        this.showNav = false
      } else {
        this.showNav = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>