<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>
<script>
// import { login } from '@api/user'
import Nav from '@/components/Nav'
export default {
  name: 'App',
  beforeCreate() {
    const request = new XMLHttpRequest();
    request.open("GET", "demo_get.html", true);
    request.setRequestHeader('xx',11);
    request.setRequestHeader('x-csrf-token',11);
    request.send();
    // login({
    //   username: 'admin',
    //   password: '123456'
    // })
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
