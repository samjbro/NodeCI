const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  const apiProxy = proxy('/api/**', { target: 'http://localhost:5000' })
  app.use(apiProxy)
  const authProxy = proxy('/auth/**', { target: 'http://localhost:5000' })
  app.use(authProxy)
}