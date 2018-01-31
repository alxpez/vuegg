import types from '@/store/types'

const commonPageMutations = {
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
    if ((typeof payload.name !== 'undefined') && (payload.name !== null)) payload.page.name = payload.name
    if ((typeof payload.path !== 'undefined') && (payload.path !== null)) payload.page.path = payload.path
    if ((typeof payload.height !== 'undefined') && (payload.height !== null)) payload.page.height = payload.height
    if ((typeof payload.width !== 'undefined') && (payload.width !== null)) payload.page.width = payload.width
    if (payload.styles) payload.page.styles = payload.styles
  },

/**
 * Removes the page under the specified index from the state.project.pages array
 *
 * @param {number} pageIndex : Page's index
 */
  [types.deletePage]: function (state, pageIndex) {
    state.project.pages.splice(pageIndex, 1)
  }
}

/*******************************************************************
 * In VUEGG, internal mutations (starting with "_"),
 * won't be taken into consideration for the Undo/Redo functionality.
 * This is a convenience behaviour for certain vuegg workarounds.
 *******************************************************************/
const internalPageMutations = {
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
  }
}

const pageMutations = {
  ...internalPageMutations,
  ...commonPageMutations
}

export default pageMutations
