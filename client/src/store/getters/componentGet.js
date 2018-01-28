import types from '@/store/types'

const componentGetters = {
/**
 * Returns the index, of the component with the passed name, in the state.project.components array
 *
 * @param {string} componentName : Component's name
 * @return {number} : The component index in the array
 */
  [types.getComponentRefIndexByName]: (state) => (componentName) => {
    return state.project.components.findIndex(page => page.name === componentName)
  },

/**
 * Returns the component with the passed name in the state.project.components array
 *
 * @param {string} componentName : Component's name
 * @return {object} : The component under the specified name
 */
  [types.getComponentRefByName]: (state, getters) => (componentName) => {
    let compIndex = getters.getComponentRefIndexByName(componentName)
    return state.project.components[compIndex]
  },

/**
 * Returns the component, from the index passed, in the state.project.components array
 *
 * @param {string} componentIndex : Component's index in the array
 * @return {object} : The component under the specified index
 */
  [types.getComponentRefByIndex]: (state, getters) => (compIndex) => {
    return state.project.components[compIndex]
  },

/**
 * Returns a boolean value as result of checking if
 * the component name already exists in the state.project.components array
 *
 * @param {string} componentName : Component's name
 * @return {boolean} : Whether the given component already exists or not
 */
  [types.componentExist]: (state, getters) => (componentName) => {
    let compIndex = getters.getComponentRefIndexByName(componentName)
    return (compIndex > -1)
  }
}

export default componentGetters
