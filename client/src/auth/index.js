import open from 'oauth-open'
import axios from 'axios'
import cloneDeep from 'clone-deep'
import shortid from 'shortid'
import state from '@/store/state'

const CLIENT_ID = '116bed3e72c3aab96b76'
const CLIENT_SECRET = '5bdc16b5b384431212053fc8e16eca15cd9ebd00'
const REDIRECT_URL = 'http://localhost:8080/auth/github'
const STATE = shortid.generate()
const SCOPE = 'repo user'

const auth = {
  authorize,
  getAccessToken,
  saveProject,
  isAuthorized: false,
  token: '',
  user: {}
}

function authorize () {
  const authUrl = 'https://github.com/login/oauth/authorize'
    .concat('?client_id=').concat(CLIENT_ID)
    .concat('&redirect_uri=').concat(REDIRECT_URL)
    .concat('&state=').concat(STATE)
    .concat('&scope=').concat(SCOPE)

  open(authUrl, function (err, resp) {
    if (err) { throw err }

    if (resp.state !== STATE) {
      console.error('The states do not match, this request could be compromised')
    } else {
      console.log(resp)
      getAccessToken(resp.code)
    }
  })
}

async function getAccessToken (code) {
  try {
    let data = new URLSearchParams()
    data.append('client_id', CLIENT_ID)
    data.append('client_secret', CLIENT_SECRET)
    data.append('code', code)
    data.append('redirect_uri', REDIRECT_URL)
    data.append('state', STATE)

    let resp = await axios.post('https://github.com/login/oauth/access_token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    console.log(resp)
    auth.isAuthorized = true
    auth.token = resp.data.slice(resp.data.indexOf('=') + 1, resp.data.indexOf('&'))
    console.log(auth.token)
  } catch (error) {
    console.error(error)
  }
}

/**
 * [saveProject description]
 * @return {[type]} [description]
 */
async function saveProject () {
  // ----- Testing ... this should not be here, but for the time being ---------
  await getUser()

  const myRepoName = state.project.title.replace(/[^a-zA-Z0-9-_]+/g, '-')
  let haveRepo = await repoExists(myRepoName)
  if (!haveRepo) {
    await createRepo(myRepoName)
    createFile(myRepoName)
  } else {
    createFile(myRepoName)
  }
}

/**
 * [getUser description]
 * @return {[type]} [description]
 */
async function getUser () {
  try {
    let resp = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': 'bearer '.concat(auth.token)
      }
    })
    console.log(resp)
    console.log('Authenticated user')
    auth.user = resp.data
  } catch (e) {
    console.error(e)
  }
}

/**
 * [repoExists description]
 * @return {[type]} [description]
 */
async function repoExists (repoName) {
  let reqUrl = 'https://api.github.com/repos/'.concat(auth.user.login).concat('/').concat(repoName)

  try {
    let resp = await axios.get(reqUrl, {
      headers: {
        'Authorization': 'bearer '.concat(auth.token)
      }
    })
    console.log(resp)
    console.log(repoName + ' already exists')
    return true
  } catch (e) {
    console.error(e)
    console.log(repoName + ' does not exists')
    return false
  }
}

/**
 * [createTestRepo description]
 * @param  {[type]} repoName [description]
 * @return {[type]}          [description]
*/
async function createRepo (repoName) {
  try {
    let resp = await axios.post('https://api.github.com/user/repos', {
      name: repoName,
      auto_init: true
    }, {
      headers: {
        'Authorization': 'bearer '.concat(auth.token)
      }
    })
    console.log(repoName + ' has been created')
    console.log(resp)
  } catch (e) {
    console.error(e)
  }
}

/**
 * [createFile description]
 * @param  {[type]} repoName [description]
 * @return {[type]}          [description]
 */
async function createFile (repoName) {
  try {
    await axios.post('/api/save-project-def', {
      project: cloneDeep(state.project),
      owner: auth.user.login,
      repo: repoName,
      token: auth.token
    })
    console.log('your project has been saved/updated')
  } catch (e) {
    console.error(e)
  }
}

export default auth
