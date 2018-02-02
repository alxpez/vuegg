import localforage from 'localforage'
import showSnackbar from '@/helpers/showSnackbar'
import types from '@/store/types'
import auth from '@/auth'

const authActions = {
/**
 * [description]
 * @return {[type]} [description]
 */
  [types.checkAuth]: async function ({ state, commit }) {
    commit(types._toggleLoadingStatus, true)

    let user = await localforage.getItem('gh-user')
    let token = await localforage.getItem('gh-token')

    if (!user || !token) {
      if (state.oauth.isAuthorized) { commit(types._toggleAuthorizationStatus, false) }
      if (state.oauth.authenticatedUser !== null) { commit(types._removeAuthenticatedUser) }
    } else {
      commit(types._addAuthenticatedUser, user)
      commit(types._toggleAuthorizationStatus, true)
    }

    commit(types._toggleLoadingStatus, false)
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logIn]: async function ({ commit }) {
    let token = await auth.authorizeUser()

    commit(types._toggleLoadingStatus, true)
    commit(types._toggleAuthorizationStatus, !!token)

    if (token) {
      let user = await auth.getAuthenticatedUser(token)
      localforage.setItem('gh-token', token)
      if (user) {
        commit(types._addAuthenticatedUser, user)
        localforage.setItem('gh-user', user)
      } else {
        showSnackbar('Unable to retrieve your GitHub information')
      }
    } else {
      showSnackbar('Could not complete login process')
    }

    commit(types._toggleLoadingStatus, false)
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logOut]: async function ({ commit }) {
    commit(types._toggleLoadingStatus, true)

    await localforage.clear()
    commit(types._removeAuthenticatedUser)
    commit(types._toggleAuthorizationStatus, false)

    commit(types._toggleLoadingStatus, false)
  }
}

export default authActions
