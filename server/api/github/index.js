const octokit = require('@octokit/rest')()
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')


async function saveProjectDef (content) {
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
  saveProjectDef
}
