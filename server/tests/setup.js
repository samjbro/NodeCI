require('../models/User')
const mongoose = require('mongoose')
const keys = require('../config/keys')
//
jest.setTimeout(40000)
// console.log("hemmmmmm")

beforeAll(() => {
  mongoose.Promise = global.Promise
  mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
// console.log(mongoose)
})

afterAll(() => {
  mongoose.disconnect()
})
