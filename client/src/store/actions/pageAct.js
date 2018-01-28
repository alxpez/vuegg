import shortid from 'shortid'
import types from '@/store/types'
import newPage from '@/factories/pageFactory'
import { setElId } from '@/helpers/recursiveMethods'

const pageActions = {
/**
 * Creates a new page (if no payload.id) or
 * updates an existing one, and closes the PageDialog.
 *
 * @param {string} payload.name : Page's name
 * @param {string} payload.path : Page's path with a preceding '/'
 * @param {string|null} [payload.id] : Page's id (shortid, randomly generated)
 *
 * @see {@link [types.getPageIndexById]}
 * @see {@link [types.createPage]}
 * @see {@link [types.updatePage]}
 * @see {@link [types._togglePageDialog]}
 */
  [types.savePageAndClose]: function ({ getters, commit }, payload) {
    commit(types._togglePageDialog, {isOpen: false, isNew: !payload.id})

    if (!payload.id) {
      let page = newPage(payload.name, payload.path.toLowerCase())
      commit(types.createPage, page)
      commit(types._clearSelectedElements)
      commit(types._changeActivePage, page)
    } else {
      let pagePayload = {
        page: getters.getPageById(payload.id),
        name: payload.name,
        path: payload.path
      }
      commit(types.updatePage, pagePayload)
    }
  },

/**
 * Creates a new copy of the page provided on the payload
 * and changes the active page afterwards.
 *
 * @param {string} payload.page : The page that will be duplicated
 *
 * @see {@link [types.createPage]}
 * @see {@link [types._changeActivePage]}
 */
  [types.duplicatePage]: function ({ getters, commit }, payload) {
    const copyId = shortid.generate()
    let pageCopy = {
      ...setElId(payload.page),
      name: payload.page.name + copyId,
      path: payload.page.path + copyId
    }
    commit(types.createPage, pageCopy)
    commit(types._changeActivePage, pageCopy)
  }
}

export default pageActions
