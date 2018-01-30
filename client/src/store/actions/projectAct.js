import localforage from 'localforage'
import showSnackbar from '@/helpers/showSnackbar'
import newState from '@/factories/stateFactory'
import types from '@/store/types'
import store from '@/store'
import api from '@/api'

const projectActions = {
/**
 * Checks if the current project definition (in base64)
 * is the same as the last one saved in GH (also stored in local as base64)
 *
 * As an extra, saves the current b64 project in local as well (as a checkpoint)
 */
  [types.checkLastSaved]: async function ({ state, dispatch, commit }) {
    const currentProjectB64 = btoa(JSON.stringify(state.project))
    let lastSavedProjectB64 = await localforage.getItem('gh-last-saved')

    if (currentProjectB64 === lastSavedProjectB64) {
      commit(types._toggleHasChanges, false)
    } else {
      commit(types._toggleHasChanges, true)
    }

    dispatch(types.syncLocal, currentProjectB64)
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.saveProjectInGH]: async function ({ state, dispatch, commit }) {
    commit(types._toggleLoadingStatus, true)

    const token = await localforage.getItem('gh-token')
    const project = state.project
    const owner = state.oauth.authenticatedUser.login
    const parsedRepoName = project.title.replace(/[^a-zA-Z0-9-_]+/g, '-')

    const projectB64 = btoa(JSON.stringify(project))
    localforage.setItem('gh-last-saved', projectB64)

    await api.saveVueggProject(project, owner, parsedRepoName, token)
    await dispatch(types.checkLastSaved)

    commit(types._toggleLoadingStatus, false)
    showSnackbar('See your project in GitHub', 'Go', 'https://github.com/' + owner + '/' + parsedRepoName)

    dispatch(types.syncLocal, projectB64)
  },

/**
 * Syncronizes the local cache of the project definition
 *
 * @param  {string|null} [projectB64] [description]
 */
  [types.syncLocal]: async function ({ state, commit }, projectB64) {
    commit(types._toggleIsSyncing, true)

    let pB64 = projectB64
    if (!pB64) { pB64 = btoa(JSON.stringify(state.project)) }

    await localforage.setItem('local-checkpoint', pB64)
    commit(types._toggleIsSyncing, false)
  },

/**
 * Loads a previously saved vuegg project.
 * If origin is not passed through, the project will load from local by default
 *
 * @param {string} origin : From where the project is beign loaded (local, pc, github)
 * @param {string|null} [owner] : Github login (username) of the repository
 * @param {string|null} [repo] : Repository name from where to fetch project (vue.gg)
 */
  [types.loadVueggProject]: async function ({ state, dispatch, commit }, { origin, userName, repoName }) {
    commit(types._toggleBlockLoadingStatus, true)

    let project
    switch (origin) {
      case 'local':
        project = await localforage.getItem('local-checkpoint')
        break
      case 'github':
        const token = await localforage.getItem('gh-token')
        const owner = userName || state.oauth.authenticatedUser.login
        const repo = repoName || state.project.title.replace(/[^a-zA-Z0-9-_]+/g, '-')

        let ghFile = await api.getVueggProject(owner, repo, token)

        project = ghFile.data.data.content
        break
      case 'pc':
        console.log('load project from PC')
        break
      default: project = await localforage.getItem('local-checkpoint')
    }

    if (project) {
      store.replaceState(newState(JSON.parse(atob(project))))
      commit(types.loadProject)

      await dispatch(types.checkAuth)
    }
    commit(types._toggleBlockLoadingStatus, false)
  }
}

export default projectActions
