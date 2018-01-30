const octokit = require('@octokit/rest')()

/**
 * [saveVueggProject description]
 * @param  {[type]} project [description]
 * @param  {[type]} owner   [description]
 * @param  {[type]} repo    [description]
 * @param  {[type]} token   [description]
 * @return {[type]}         [description]
 */
async function saveVueggProject ({project, owner, repo, token}) {
  let existingRepo = await getRepo(owner, repo)
  if (!existingRepo) { await createRepo(repo, token) }

  return await saveFile(project, owner, repo, 'vue.gg', token)
}

/**
 * [getRepo description]
 * @param  {[type]} owner [description]
 * @param  {[type]} repo  [description]
 * @return {[type]}       [description]
 */
async function getRepo (owner, repo) {
  try {
    return await octokit.repos.get({owner, repo})
  } catch (e) {
    console.log('(REPO) - ' + owner + '/' + repo + '  does not exist')
    return false
  }
}

/**
 * [createRepo description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
async function createRepo (name, token) {
  octokit.authenticate({type: 'oauth', token})

  try {
    return await octokit.repos.create({name, auto_init: true, license_template: 'mit'})
  } catch (e) {
    console.error('(REPO) - Failed to create: ' + owner + '/' + name)
    console.error(e)
    return false
  }
}

async function getContent (owner, repo, path) {
  try {
    return await octokit.repos.getContent({owner, repo, path})
  } catch (e) {
    console.error('(FILE) - ' + owner + '/' + repo + '/' + path + ' does not exist')
    return false
  }
}

/**
 * [saveFile description]
 * @param  {[type]} content [description]
 * @param  {[type]} owner   [description]
 * @param  {[type]} repo    [description]
 * @param  {[type]} token   [description]
 * @return {[type]}         [description]
 */
async function saveFile (content, owner, repo, path, token) {
  let existentFile = await getContent(owner, repo, path)

  let ghData = {
    owner, repo, path,
    content: Buffer.from(JSON.stringify(content)).toString('base64'),
    author: {name: 'vuegger', email: '35027416+vuegger@users.noreply.github.com'}
  }

  octokit.authenticate({type: 'oauth', token})

  try {
    if (!existentFile) {
      console.log('(FILE) - creating: ' + owner + '/' + repo + '/' + path)
      return await octokit.repos.createFile({...ghData, message: 'vuegg save'})
    } else {
      console.log('(FILE) - updating: ' + owner + '/' + repo + '/' + path)
      return await octokit.repos.updateFile({...ghData, message: 'vuegg update', sha: existentFile.data.sha})
    }
  } catch (e) {
    console.error('(FILE) - Failed to save: ' + owner + '/' + repo + '/' + path)
    return false
  }
}

module.exports = { saveVueggProject }
