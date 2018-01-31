import types from '@/store/types'

const internalComponentMutations = {
/**
 * Adds a component reference to the state.project.components array
 *
 * @param {object} componentRef : Component reference for the project
 */
  [types._saveComponentRef]: function (state, componentRef) {
    state.project.components.push(componentRef)
  },

/**
 * Updates the component reference usage count.
 *
 * @param {number} payload.compIndex : Component's index
 * @param {number} payload.newCount : New usage count
 */
  [types._updateComponentRef]: function (state, payload) {
    state.project.components.splice(payload.compIndex, 1, {
      ...state.project.components[payload.compIndex],
      usageCount: payload.newCount
    })
  },

/**
 * Removes a component reference from the state.project.components array
 *
 * @param {string} componentRefIndex : Index of the component reference to remove
 */
  [types._removeComponentRef]: function (state, componentRefIndex) {
    state.project.components.splice(componentRefIndex, 1)
  }
}

const componentMutations = {
  ...internalComponentMutations
}

export default componentMutations
