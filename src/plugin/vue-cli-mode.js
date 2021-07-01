/* 测试编译时启用的模式 https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F */
/* 
 项目在运行时总会选择一个模式，一个模式下可带有多个环境变量，其中一定有：
 NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。
 (
     development 模式用于 vue-cli-service serve
     production 模式用于 vue-cli-service build 和 vue-cli-service test:e2e
     test 模式用于 vue-cli-service test:unit
 )
 BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。

 但是我们可以通过设置自定义模式修改NODE_ENV的值，和新增新的环境变量(需以‘VUE_APP_’开头)，具体做法可以看：.env.hhj 和 package.json
*/
console.log(process.env);