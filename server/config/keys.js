if (process.env.NODE_ENV === 'production') {
  console.log('Starting server in production mode')
  module.exports = require('./prod')
} else if (process.env.NODE_ENV === 'ci') {
  console.log('Starting server in ci mode')
  module.exports = require('./ci')
} else {
  console.log('Starting server in development mode')
  module.exports = require('./dev')
}