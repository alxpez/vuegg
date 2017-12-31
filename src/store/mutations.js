import types from './types'

// TODO: Refactor mutations and divide them by context

/**
 * Vuex Store Mutations
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/mutations.html|Vuex Mutations}
 */
const mutations = {

  /**
   * Saves the initial state for the redo/undo functionality
   */
  initializeState: function (state) {
    console.debug('State initialized')
  },

  // ----- APP MUTATIONS ----- //

  /**
   * Changes the Sidebar state to the passed value
   *
   * @param {boolean} status : Status of the sidebar
   */
  [types._toggleSidebar]: function (state, status) {
    state.app.sidebar.isOpen = status
  },

  /**
   * Toggles the Sidebar mini-mode state
   */
  [types._toggleMiniSidebar]: function (state) {
    state.app.sidebar.isMini = !state.app.sidebar.isMini
  },

  /**
   * Changes the PageDialog state to the passed value
   *
   * @param {boolean} payload.isOpen : Status of the PageDialog
   * @param {boolean} payload.isNew : Dialog mode (New/Edit)
   */
  [types._togglePageDialog]: function (state, payload) {
    state.app.pageDialog.isNew = payload.isNew
    state.app.pageDialog.isOpen = payload.isOpen
  },

  /**
   * Adds the passed page to the state.app.selectedPage
   *
   * @param {object} page : The page currently selected
   */
  [types._changeActivePage]: function (state, page) {
    state.app.selectedPage = page
  },

  /**
   * Replaces the page on the specified index with the current selectedPage
   *
   * @param {object} pageIndex : Index of the page to get "rebased"
   */
  [types._rebaseActivePage]: function (state, pageIndex) {
    state.project.pages.splice(pageIndex, 1, state.app.selectedPage)
  },

  /**
   * Resets the selectedElements aray
   */
  [types._clearSelectedElements]: function (state) {
    state.app.selectedElements = []
  },

  /**
   * Adds a new element to the selectedElements array
   *
   * @param {object} elem : selected element
   */
  [types._addSelectedElement]: function (state, elem) {
    state.app.selectedElements.push(elem)
  },

  /**
   * Removes an element from the selectedElements array
   *
   * @param {object} elemIndex : Index of the element to remove
   */
  [types._removeSelectedElement]: function (state, elemIndex) {
    state.app.selectedElements.splice(elemIndex, 1)
  },

  // ----- PROJECT MUTATIONS ----- //

  /**
   * Updates the project data
   *
   * @param {string} payload.title : Project title
   */
  [types.updateProject]: function (state, payload) {
    state.project.title = payload.title
  },

  /**
   * Adds a component reference to the state.project.components array
   *
   * @param {object} componentRef : Component reference for the project
   */
  [types.saveComponentRef]: function (state, componentRef) {
    state.project.components.push(componentRef)
  },

  /**
   * Updates the component reference usage count.
   *
   * @param {number} payload.compIndex : Component's index
   * @param {number} payload.newCount : New usage count
   */
  [types.updateComponentRef]: function (state, payload) {
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
  [types.removeComponentRef]: function (state, componentRefIndex) {
    state.project.components.splice(componentRefIndex, 1)
  },

  // ----- PAGE MUTATIONS ----- //

  /**
   * Adds the passed page to the state.project.pages array
   *
   * @param {object} page : New page to save
   */
  [types.createPage]: function (state, page) {
    state.project.pages.push(page)
  },

  /**
   * Updates the page under the specify index with the new passed values
   *
   * @param {number} payload.page : Page to update
   * @param {string|null} [payload.name] : New page's name
   * @param {string|null} [payload.path] : New page's path
   * @param {number|string|null} [payload.height] : New page's height
   * @param {number|string|null} [payload.width] : New page's width
   * @param {object|null} [payload.styles] : New page's styles
   */
  [types.updatePage]: function (state, payload) {
    if (payload.name) payload.page.name = payload.name
    if (payload.path) payload.page.path = payload.path
    if (payload.height) payload.page.height = parseInt(payload.height)
    if (payload.width) payload.page.width = parseInt(payload.width)
    if (payload.styles) payload.page.styles = payload.styles
  },

  /**
   * Removes the page under the specified index from the state.project.pages array
   *
   * @param {number} pageIndex : Page's index
   */
  [types.deletePage]: function (state, pageIndex) {
    state.project.pages.splice(pageIndex, 1)
  },

  // ----- EGGLEMENT MUTATIONS ----- //

  /**
   * Adds the passed egglement to the parent.children array
   *
   * @param {object} payload.parent : Parent of the new egglement
   * @param {object} payload.egglement : New egglement to save
   */
  [types.createEgglement]: function (state, payload) {
    payload.parent.children.push(payload.egglement)
  },

  /**
   * Updates the passed egglement with the defined new values
   *
   * @param {object} payload.egglement : Egglement to update
   * @param {number|string|null} [payload.left] : New egglement's left position
   * @param {number|string|null} [payload.top] : New egglement's top position
   * @param {number|string|null} [payload.height] : New egglement's height
   * @param {number|string|null} [payload.width] : New egglement's width
   * @param {string|null} [payload.text] : New egglement's text child
   * @param {object|null} [payload.classes] : New egglement's classes
   * @param {object|null} [payload.styles] : New egglement's styles
   * @param {object|null} [payload.attrs] : New egglement's attributes
   */
  [types.updateEgglement]: function (state, payload) {
    if (payload.left) payload.egglement.left = parseInt(payload.left)
    if (payload.top) payload.egglement.top = parseInt(payload.top)
    if (payload.height) payload.egglement.height = parseInt(payload.height)
    if (payload.width) payload.egglement.width = parseInt(payload.width)
    if (payload.text) payload.egglement.text = payload.text
    if (payload.classes) payload.egglement.classes = payload.classes
    if (payload.styles) payload.egglement.styles = payload.styles
    if (payload.attrs) payload.egglement.attrs = payload.attrs
  },

  /**
   * Removes the egglement under the specified index
   * from the passed parent egglement (or page)
   *
   * @param {object} payload.parent : Parent container (egglement or page)
   * @param {number} payload.eggIndex : Egglement's index
   */
  [types.deleteEgglement]: function (state, payload) {
    payload.parent.children.splice(payload.eggIndex, 1)
  }
}

export default mutations
