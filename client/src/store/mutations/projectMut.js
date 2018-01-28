import types from '@/store/types'

const projectMutations = {
  /**
   * Updates the project data
   *
   * @param {string} payload.title : Project title
   */
  [types.updateProject]: function (state, payload) {
    state.project.title = payload.title
  }
}

export default projectMutations
