import axios from 'axios'

/**
 * Saves the current vuegg project definition in the specify repository
 *
 * @param  {object} project : Project definition to be saved in the repository (as vue.gg)
 * @param  {string} owner : Repository owner
 * @param  {string} repo : Repository where to save the project definition
 * @param  {string} token : Authentication token
 * @return {object|false} : returns a JSON of the created file of false is something goes wrong
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
 * Retrieves the base64 vue.gg project definition from the especified repository.
 *
 * @param  {string} owner : owner of the repository
 * @param  {string} repo : repository to get the vue.gg project definition from
 * @param  {string} [token] : oauth2 token (for access private repos) [unused for now]
 * @return {string} : base64 string of the vue.gg file of the repository
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
 * Generated vuejs sources from a vuegg project definition
 *
 * @param  {object} project : current project
 * @return {blob} : A zip file containing the vuejs sources of the passed project
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
