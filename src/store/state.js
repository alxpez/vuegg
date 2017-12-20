import newProject from '@/helpers/project'

/**
 * Vuex Store State
 * (aka. Single State Tree or "single source of truth")
 *
 * (Vuegg initial store's state)
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/state.html|Vuex State}
 */
const state = {
  app: {
    sidebar: {
      isOpen: false,
      isMini: false
    },
    pageDialog: {
      isNew: true,
      isOpen: false
    },
    selectedPage: null,
    selectedElements: []
  },
  project: newProject('Vuegg Project')
}

export default state
