import localforage from 'localforage'
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

    let token = await localforage.getItem('gh-token')
    let project = state.project
    let owner = state.oauth.authenticatedUser.login

    const projectB64 = btoa(JSON.stringify(project))
    localforage.setItem('gh-last-saved', projectB64)

    await api.saveVueggProject(project, owner, token)
    await dispatch(types.checkLastSaved)
    commit(types._toggleLoadingStatus, false)

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
 * @param {string|null} [origin] : From where the project is beign loaded (local, pc, github)
 */
  [types.loadVueggProject]: async function ({ state, commit }, origin) {
    commit(types._toggleBlockLoadingStatus, true)

    let loadedProject
    switch (origin) {
      case 'local': loadedProject = await localforage.getItem('local-checkpoint'); break
      case 'github': console.log('load project from GitHub'); break
      case 'pc': console.log('load project from PC'); break
      default: loadedProject = await localforage.getItem('local-checkpoint')
    }

    if (loadedProject) {
      store.replaceState(newState(JSON.parse(atob(loadedProject))))
      commit(types.loadProject)
    }
    commit(types._toggleBlockLoadingStatus, false)
  }
}

export default projectActions
