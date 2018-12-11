const mongoose = require('mongoose')
const redis = require('redis')
const promisify = require('util').promisify
const keys = require('../config/keys')
const client = redis.createClient(keys.redisUrl)
client.hget = promisify(client.hget)
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = {}) {
  this._cache = true
  this._hashKey = JSON.stringify(options.key || '')
  return this
}

mongoose.Query.prototype.exec = async function () {
  if (!this._cache) {
    return exec.apply(this, arguments)
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  )
  const cacheValue = await client.hget(this._hashKey, key)

  if (cacheValue) {
    console.log('cache hit')
    const doc = JSON.parse(cacheValue)
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc)
  }
  console.log('no cache value')
  const result = await exec.apply(this, arguments)
  client.hset(this._hashKey, key, JSON.stringify(result), 'EX', 100)
  return result
}

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey))
  }
}