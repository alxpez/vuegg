import localforage from 'localforage'
import types from '@/store/types'
import api from '@/api'

const projectActions = {
/**
 * [description]
 * @return {[type]} [description]
 */
  [types.saveProjectInGH]: async function ({ state, commit }) {
    commit(types._toggleLoadingStatus, true)

    let token = await localforage.getItem('gh-token')
    let project = state.project
    let owner = state.oauth.authenticatedUser.login

    await api.saveVueggProject(project, owner, token)

    commit(types._toggleHasChanges, false)
    commit(types._toggleLoadingStatus, false)
  }
}

export default projectActions
