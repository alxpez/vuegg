import pageGetters from './pageGet'
import elementGetters from './elementGet'
import componentGetters from './componentGet'

/**
 * Vuex Store Getters
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/getters.html|Vuex Getters}
 */
const getters = {
  ...pageGetters,
  ...elementGetters,
  ...componentGetters
}

export default getters
