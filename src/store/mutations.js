import types from '@/store/types'

// TODO: Refactor mutations and divide them by context

/**
 * Vuex Store Mutations
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/mutations.html|Vuex Mutations}
 */
const mutations = {
  // ----- APP MUTATIONS ----- //

  /**
   * Changes the Sidebar state to the passed value
   *
   * @param {boolean} status : Status of the sidebar
   */
  [types.toggleSidebar] (state, status) {
    state.app.sidebar.isOpen = status
  },

  /**
   * Toggles the Sidebar mini-mode state
   */
  [types.toggleMiniSidebar] (state) {
    state.app.sidebar.isMini = !state.app.sidebar.isMini
  },

  /**
   * Changes the PageDialog state to the passed value
   *
   * @param {boolean} payload.isOpen : Status of the PageDialog
   * @param {boolean} payload.isNew : Dialog mode (New/Edit)
   */
  [types.togglePageDialog] (state, payload) {
    state.app.pageDialog.isNew = payload.isNew
    state.app.pageDialog.isOpen = payload.isOpen
  },

  // ----- PAGE MUTATIONS ----- //

  /**
   * Adds the passed page to the state.pages array
   *
   * @param {object} page : New page to save
   */
  [types.createPage] (state, page) {
    state.pages.push(page)
  },

  /**
   * Updates the page under the specify index with the new passed values
   *
   * @param {number} payload.pageIndex : Page's index
   * @param {string} payload.name : New page's name
   * @param {string} payload.path : New page's path
   */
  [types.updatePage] (state, payload) {
    state.pages.splice(payload.pageIndex, 1, {
      ...state.pages[payload.pageIndex],
      name: payload.name,
      path: payload.path
    })
  },

  /**
   * Removes the page under the specified index from the state.pages array
   *
   * @param {number} pageIndex : Page's index
   */
  [types.deletePage] (state, pageIndex) {
    state.pages.splice(pageIndex, 1)
  },

  // ----- EGGLEMENT MUTATIONS ----- //

  /**
   * Adds the passed egglement to the parent.children array
   *
   * @param {object} payload.parent : Parent of the new egglement
   * @param {object} payload.egglement : New egglement to save
   */
  [types.createEgglement] (state, payload) {
    payload.parent.children.push(payload.egglement)
  },

  /**
   * Updates the passed egglement with the defined new values
   *
   * @param {object} payload.egglement : Egglement to update
   * @param {object} payload.x : New egglement's x (left) position
   * @param {object} payload.y : New egglement's y (top) position
   * @param {object|null} [payload.height] : New egglement's height
   * @param {object|null} [payload.width] : New egglement's width
   */
  [types.updateEgglement] (state, payload) {
    payload.egglement.x = payload.x
    payload.egglement.y = payload.y
    if (payload.height) payload.egglement.height = payload.height
    if (payload.width) payload.egglement.width = payload.width
  },

  /**
   * Removes the egglement under the specified index
   * from the passed parent egglement (or page)
   *
   * @param {object} payload.parent : Parent container (egglement or page)
   * @param {number} payload.eggIndex : Egglement's index
   */
  [types.deleteEgglement] (state, payload) {
    payload.parent.children.splice(payload.eggIndex, 1)
  }
}

export default mutations
