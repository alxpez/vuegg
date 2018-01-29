import localforage from 'localforage'
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
      await localforage.clear()

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
    commit(types._toggleLoadingStatus, true)

    let token = await auth.authorizeUser()
    commit(types._toggleAuthorizationStatus, !!token)

    if (token) {
      let user = await auth.getAuthenticatedUser(token)
      localforage.setItem('gh-token', token)
      if (user) {
        commit(types._addAuthenticatedUser, user)
        localforage.setItem('gh-user', user)
      } else {
        // show alert?
        console.error('user error')
      }
    } else {
      // show alert?
      console.error('token error')
    }

    commit(types._toggleLoadingStatus, false)
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logOut]: async function ({ commit }) {
    commit(types._toggleLoadingStatus, true)

    try {
      await localforage.clear()

      commit(types._removeAuthenticatedUser)
      commit(types._toggleAuthorizationStatus, false)

      commit(types._toggleLoadingStatus, false)
    } catch (e) {
      // show alert?
      console.error('token error')
    }
  }
}

export default authActions
