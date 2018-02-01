var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_ID: '116bed3e72c3aab96b76',
  CALLBACK_URL: 'http://localhost:8080/auth'
})
