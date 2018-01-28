import authActions from './authAct'
import pageActions from './pageAct'
import elementActions from './elementAct'

/**
 * Vuex Store Actions
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/actions.html|Vuex Actions}
 */
const actions = {
  ...authActions,
  ...pageActions,
  ...elementActions
}

export default actions
