require('../models/User')
const mongoose = require('mongoose')
const keys = require('../config/keys')

jest.setTimeout(20000)

// beforeAll(() => {
  mongoose.Promise = global.Promise
  mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
// })

// afterAll(() => {
  // mongoose.disconnect()
// })