const octokit = require('@octokit/rest')()

/**
 * [saveVueggProject description]
 * @param  {[type]} project [description]
 * @param  {[type]} owner   [description]
 * @param  {[type]} repo    [description]
 * @param  {[type]} token   [description]
 * @return {[type]}         [description]
 */
async function saveVueggProject ({project, owner, token}) {
  const parsedRepoName = project.title.replace(/[^a-zA-Z0-9-_]+/g, '-')

  let existingRepo = await repoExists(owner, parsedRepoName)
  if (!existingRepo) { await createRepo(parsedRepoName, token) }

  await saveFile(project, owner, parsedRepoName, token)

  return parsedRepoName
}

/**
 * [repoExists description]
 * @param  {[type]} owner [description]
 * @param  {[type]} repo  [description]
 * @return {[type]}       [description]
 */
async function repoExists (owner, repo) {
  try {
    await octokit.repos.get({owner, repo})
    return true
  } catch (e) {
    console.log(repo + ' does not exists')
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
    const result = await octokit.repos.create({name, auto_init: true, license_template: 'mit'})
    return result
  } catch (e) {
    console.error(e)
  }
}

/**
 * [saveFile description]
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
async function saveFile (project, owner, repo, token) {
  let existentFile = null
  let ghData = {owner, repo, path: 'vue.gg'}

  try {
    existentFile = await octokit.repos.getContent({...ghData})
    console.log('A ' + ghData.path + ' file already exists on this repo')
  } catch (e) {
    console.error(e)
  }

  ghData = {
    ...ghData,
    content: Buffer.from(JSON.stringify(project)).toString('base64'),
    author: {name: 'vuegger', email: '35027416+vuegger@users.noreply.github.com'}
  }

  octokit.authenticate({type: 'oauth', token})

  try {
    if (existentFile === null) {
      console.log('creating new ' + ghData.path + ' file')
      await octokit.repos.createFile({...ghData, message: 'save vuegg project'})
    } else {
      console.log('updating existing ' + ghData.path + ' file')
      await octokit.repos.updateFile({...ghData, message: 'update vuegg project', sha: existentFile.data.sha})
    }
  } catch (e) {
    console.error(e)
  }

  console.log('SUCCESS!');
}

module.exports = { saveVueggProject }
