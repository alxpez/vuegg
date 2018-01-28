import axios from 'axios'
import * as download from 'downloadjs'

/**
 * [createFile description]
 * @param  {[type]} repoName [description]
 * @return {[type]}          [description]
 */
async function saveVueggProject (project, owner, repo, token) {
  try {
    await axios.post('/api/save-project-def', {
      project: project,
      owner: owner,
      repo: repo,
      token: token
    })
    console.log('Your vuegg project has been saved!')
  } catch (e) {
    console.error(e)
  }
}

/**
 * [generateVueSources description]
 * @param  {[type]} project [description]
 * @return {[type]}         [description]
 */
async function generateVueSources (project) {
  try {
    let resp = await axios.post('/api/generate', project, {responseType: 'blob'})
    download(resp.data, project.title + '.zip', resp.data.type)
  } catch (e) {
    console.error(e)
    console.error('CHECK IF THE BACKEND SERVER IS UP AND RUNNING')
  }
}

const api = {
  saveVueggProject,
  generateVueSources
}

export default api

// -----------------------------------------------------------------------------
// ----- ALL THIS FOLLOWING METHODS SHOLD PROBABLY BE IN THE SERVER SIDE -------
// -----------------------------------------------------------------------------

// async function saveProject () {
//   // ----- Testing ... this should not be here, but for the time being ---------
//   await getAuthenticatedUser()
//
//   const myRepoName = state.project.title.replace(/[^a-zA-Z0-9-_]+/g, '-')
//   let haveRepo = await repoExists(myRepoName)
//   if (!haveRepo) {
//     await createRepo(myRepoName)
//     saveVueggProject(myRepoName)
//   } else {
//     saveVueggProject(myRepoName)
//   }
// }

// async function repoExists (repoName) {
//   let reqUrl = 'https://api.github.com/repos/'.concat(auth.user.login).concat('/').concat(repoName)
//
//   try {
//     let resp = await axios.get(reqUrl, {
//       headers: {
//         'Authorization': 'bearer '.concat(auth.token)
//       }
//     })
//     console.log(resp)
//     console.log(repoName + ' already exists')
//     return true
//   } catch (e) {
//     console.error(e)
//     console.log(repoName + ' does not exists')
//     return false
//   }
// }
//
// async function createRepo (repoName) {
//   try {
//     let resp = await axios.post('https://api.github.com/user/repos', {
//       name: repoName,
//       auto_init: true
//     }, {
//       headers: {
//         'Authorization': 'bearer '.concat(auth.token)
//       }
//     })
//     console.log(repoName + ' has been created')
//     console.log(resp)
//   } catch (e) {
//     console.error(e)
//   }
// }
