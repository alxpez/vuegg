import axios from 'axios'

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
    return false
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
    return false
  }
}

/**
 * [generateVueSources description]
 * @param  {[type]} project [description]
 * @return {[type]}         [description]
 */
async function generateVueSources (project) {
  try {
    return await axios.post('/api/generate', project, {responseType: 'blob'})
  } catch (e) {
    console.error(e)
    return false
  }
}

const api = {
  saveVueggProject,
  getVueggProject,
  generateVueSources
}

export default api
