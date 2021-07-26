const bodyParser = require('body-parser')
const mocks = require('./index')
function registerRoutes(app, mocks) {
  mocks.forEach(mock => {
    app[mock.method](process.env.VUE_APP_BASE_API + mock.url, (req, resp) => {
      resp.json(mock.response instanceof Function ? mock.response(req) : mock.response)
    })
  })
}
module.exports = app => {
  // 使用bodyparser解析request
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  registerRoutes(app, mocks)
}