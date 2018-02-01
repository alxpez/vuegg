var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  CLIENT_ID: '5e8f72ec1e4a789d8632',
  CALLBACK_URL: 'http://localhost:5000/auth'
})
