import types from '@/store/types'

const internalAuthMutations = {
/**
 * Changes the value of "isAuthorized", to the value passed as payload
 *
 * @param {boolean} isAuthorized : Wheter or not the user is authorized
 */
  [types._toggleAuthorizationStatus]: function (state, isAuthorized) {
    state.oauth.isAuthorized = isAuthorized
  },

/**
 * Sets the authenticated user to the user passed in the payload
 *
 * @param {object} user : The logged user (authenticated)
 * @see {@link https://developer.github.com/v3/users/#get-the-authenticated-user|Github API v3}
 */
  [types._addAuthenticatedUser]: function (state, user) {
    state.oauth.authenticatedUser = user
  },

/**
 * Removes the authenticatedUser (sets it to NULL)
 */
  [types._removeAuthenticatedUser]: function (state) {
    state.oauth.authenticatedUser = null
  }
}

const authMutations = {
  ...internalAuthMutations
}

export default authMutations
