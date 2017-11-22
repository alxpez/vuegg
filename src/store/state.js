import shortid from 'shortid'

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
    }
  },
  project: {
    id: shortid.generate(),
    title: 'Vuegg Project',
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        children: []
      }
    ],
    componeggs: []
  }
}

export default state
