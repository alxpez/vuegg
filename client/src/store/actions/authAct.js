import localforage from 'localforage'
import types from '@/store/types'
import auth from '@/auth'

const authActions = {
/**
 * [description]
 * @return {[type]} [description]
 */
  [types.checkAuth]: async function ({ commit }) {
    let user = await localforage.getItem('gh-user')
    let token = await localforage.getItem('gh-token')

    if (!user || !token) {
      localforage.clear()
    } else {
      commit(types._addAuthenticatedUser, user)
      commit(types._toggleAuthorizationStatus, true)
    }
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logIn]: async function ({ commit }) {
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
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logOut]: function ({ commit }) {
    localforage.clear()
    commit(types._removeAuthenticatedUser)
    commit(types._toggleAuthorizationStatus, false)
  }
}

export default authActions
