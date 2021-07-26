<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>
<script>
import { login } from '@api/user'
import Nav from '@/components/Nav'
export default {
  name: 'App',
  beforeCreate() {
    login({
      username: 'admin',
      password: '123456'
    })
  },
  components: {
    Nav,
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
