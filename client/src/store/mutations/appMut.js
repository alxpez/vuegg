import types from '@/store/types'

const internalAppMutations = {
/**
 * Changes the value of "isLoading", to the value passed as payload
 *
 * @param {boolean} isLoading : Whether or not the app is loading
 */
  [types._toggleLoadingStatus]: function (state, isLoading) {
    state.app.isLoading = isLoading
  },

/**
 * Changes the value of "isBlockLoading", to the value passed as payload
 *
 * @param {boolean} isLoading : Whether or not the app is block loading
 */
  [types._toggleLoadingBlockStatus]: function (state, isBlockLoading) {
    state.app.isBlockLoading = isBlockLoading
  },

/**
 * Changes the value of "hasChanges", to the value passed as payload
 *
 * @param {boolean} hasChanges : Whether or not the project has changes
 */
  [types._toggleHasChanges]: function (state, hasChanges) {
    state.app.hasChanges = hasChanges
  }
}

const appMutations = {
  ...internalAppMutations
}

export default appMutations
