const octokit = require('@octokit/rest')()
const qs = require('querystring')
const rp = require('request-promise-native')

/**
 * [getAccessToken description]
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
async function getAccessToken ({code, state}) {
  const options = {
    method: 'POST',
    uri: 'https://github.com/login/oauth/access_token',
    form: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code
    }
  }

  try {
    let resp = await rp(options)
    return qs.parse(resp).access_token
  } catch (e) {
    console.error(e)
  }
}

module.exports = { getAccessToken }
