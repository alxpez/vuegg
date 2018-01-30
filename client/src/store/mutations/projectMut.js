import types from '@/store/types'

const projectMutations = {
/**
 * Updates the project data
 *
 * @param {string} payload.title : Project title
 */
  [types.updateProject]: function (state, payload) {
    state.project.title = payload.title
  },

/**
 * Empty mutation to mark that a external project has been loaded
 * (It could be loaded from local, github or pc)
 */
  [types.loadProject]: function (state) {
    console.debug('The project has been loaded successfuly')
  }
}

export default projectMutations
