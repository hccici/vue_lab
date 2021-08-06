<template>
  <div id="nav" v-if="showNav">
    <router-link to="/iconManager">icon</router-link> |
    <router-link to="/myComponents">{{$t('common.component')}}</router-link>
    <el-select v-model="lang" @change="changeLang">
      <el-option v-for="item in langOptions" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      showNav: true,
      langOptions: this.initOptions(),
      lang: this.$i18n.locale,
    }
  },
  watch: {
    // $route(nv) {
    //   if (nv.fullPath.includes('/myComponents')) {
    //     this.showNav = false
    //   } else {
    //     this.showNav = true
    //   }
    // }
  },
  methods: {
    changeLang(newV) {
      this.$i18n.locale = newV
      localStorage.setItem('lang', newV)
      this.langOptions = this.initOptions()
    },
    initOptions() {
      return [
        {
          label: this.$t('common.cn'),
          value: 'cn'
        },
        {
          label: this.$t('common.en'),
          value: 'en'
        }
      ]
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