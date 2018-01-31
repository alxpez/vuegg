import types from '@/store/types'

const pageGetters = {
/**
 * Finds a page's index by a given pageId
 *
 * @param {string} id : Page's id
 * @return {number} : Page's index
 */
  [types.getPageIndexById]: (state) => (id) => {
    return state.project.pages.findIndex(page => page.id === id)
  },

/**
 * Finds a page by a given pageId
 *
 * @param {string} id : Page's id
 * @return {object} : Page identified by id param
 *
 * @see {@link [types.getPageIndexById]}
 */
  [types.getPageById]: (state, getters) => (id) => {
    let pageIndex = getters.getPageIndexById(id)
    return state.project.pages[pageIndex]
  },

/**
 * Returns a boolean value based on the existence of the identified page
 *
 * @param {string} id : Page's id
 * @return {boolean} : Whether the page already exists or not
 *
 * @see {@link [types.getPageIndexById]}
 */
  [types.pageExists]: (state, getters) => (id) => {
    let pageIndex = getters.getPageIndexById(id)
    return (pageIndex > -1)
  },

/**
 * Returns a boolean value as result of checking if the page's path is in use
 *
 * @param {string} pagePath : Page's path
 * @return {boolean} : Whether the given pagePath already exists or not
 */
  [types.pathInUse]: (state) => (pagePath) => {
    let pageIndex = state.project.pages.findIndex(page => page.path === pagePath)
    return (pageIndex > -1)
  },

/**
 * Returns a boolean value as result of checking if the page's name is in use
 *
 * @param {string} pageName : Page's name
 * @return {boolean} : Whether the given pageName already exists or not
 */
  [types.nameInUse]: (state) => (pageName) => {
    let pageIndex = state.project.pages.findIndex(page => page.name === pageName)
    return (pageIndex > -1)
  }
}

export default pageGetters
