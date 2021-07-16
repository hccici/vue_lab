
module.exports = app => {
  app.get(process.env.VUE_APP_BASE_API + '/login', (req, res) => {
    res.json({
      code: 0,
      msg: 'hhj 测试'
    })
  })
}