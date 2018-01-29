import axios from 'axios'
import * as download from 'downloadjs'

/**
 * [createFile description]
 * @param  {[type]} repoName [description]
 * @return {[type]}          [description]
 */
async function saveVueggProject (project, owner, token) {
  try {
    await axios.post('/api/save-vuegg-project', {
      project: project,
      owner: owner,
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
