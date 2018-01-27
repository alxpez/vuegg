const octokit = require('@octokit/rest')()
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const rp = require('request-promise-native');

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

/**
 * [saveFile description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
async function saveFile (content) {
  let existentFile = null

  octokit.authenticate({
    type: 'oauth',
    token: content.token
  })

  try {
    existentFile = await octokit.repos.getContent({
      owner: content.owner,
      repo: content.repo,
      path: content.repo.concat('.json')
    })
    console.log(existentFile);
  } catch (e) {
    console.error(e);
  }

  try {
    if (existentFile === null) {
      console.log('creating new file')
      await octokit.repos.createFile({
        owner: content.owner,
        repo: content.repo,
        path: content.repo.concat('.json'),
        message: 'save vuegg project',
        content: Buffer.from(JSON.stringify(content.project)).toString('base64'),
        author: {name: 'vuegger', email: 'vuegger@gmail.com'}
      })
    } else {
      console.log('updating file')
      await octokit.repos.updateFile({
        owner: content.owner,
        repo: content.repo,
        path: content.repo.concat('.json'),
        message: 'update vuegg project',
        content: Buffer.from(JSON.stringify(content.project)).toString('base64'),
        sha: existentFile.data.sha,
        author: {name: 'vuegger', email: 'vuegger@gmail.com'}
      })
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getAccessToken,
  saveFile
}
