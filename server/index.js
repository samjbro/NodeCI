const express = require('express')
const path = require('path')
const rootPath = require('app-root-path').path
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')

const resolve = file => path.resolve(rootPath, file)

require('./models/User')
require('./models/Blog')
require('./services/passport')
require('./services/cache')

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/blogRoutes')(app)

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static(path.resolve(rootPath, 'node_modules/@node-starter/client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootPath, 'node_modules/@node-starter/client/build/index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})