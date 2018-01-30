import axios from 'axios'
import * as download from 'downloadjs'

/**
 * [saveVueggProject description]
 * @param  {[type]} project [description]
 * @param  {[type]} owner   [description]
 * @param  {[type]} repo    [description]
 * @param  {[type]} token   [description]
 * @return {[type]}         [description]
 */
async function saveVueggProject (project, owner, repo, token) {
  try {
    return await axios.post('/api/save-vuegg-project', { project, owner, repo, token })
  } catch (e) {
    console.error(e)
  }
}

/**
 * [getVueggProject description]
 * @param  {[type]} owner [description]
 * @param  {[type]} repo  [description]
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
async function getVueggProject (owner, repo, token) {
  try {
    return await axios.get('/api/get-vuegg-project', { params: { owner, repo, token } })
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
  getVueggProject,
  generateVueSources
}

export default api
