var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  CLIENT_ID: '"116bed3e72c3aab96b76"',
  CALLBACK_URL: '"http://localhost:8080/auth"'
})
