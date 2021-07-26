const local = {}
const files = require.context('./', false, /\.js$/)
const reg = /^.\/(.*).js$/
files.keys().forEach(key => {
  const name = reg.exec(key)[1]
  if (name !== 'index') {
    local[name] = files(key).default
  }
})
export default local
