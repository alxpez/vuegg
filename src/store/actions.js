import types from './types'
import newPage from '@/helpers/pageBuilder'
import { registerEgglement, getChildNode, getRelativePoint } from '@/helpers/recursiveMethods'

// TODO: Refactor actions and divide them by context

/**
 * Vuex Store Actions
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/actions.html|Vuex Actions}
 */
const actions = {
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
   * Register the element (and any childElement contained on it),
   * under the pageId and saves it as a new child on the page.
   *
   * If the element is a componegg the "component reference" will be saved
   * in the state.project.components array (global component references),
   * and a "component instance" will be registered and saved.
   *
   * (This action assumes that the element is being added to a page)
   *
   * @param {string} payload.pageId : Id of the page where the element is being added
   * @param {object} payload.el : The element that will be added to the page
   *
   * @see {@link [types.createEgglement]}
   */
  [types.registerElement]: function ({ getters, commit }, payload) {
    let parent = getters.getPageById(payload.pageId)
    let el = payload.el

    if (payload.el.componegg) {
      // Component instance (local params: position)
      el = {
        name: payload.el.name,
        top: payload.el.top,
        left: payload.el.left,
        componegg: payload.el.componegg,
        egglement: payload.el.egglement,
        containegg: payload.el.containegg
      }

      if (!getters.componentExist(payload.el.name)) {
        // Component reference (global params)
        let componentRef = {
          name: payload.el.name,
          usageCount: 1,
          dependencies: payload.el.dependencies || [],
          height: payload.el.height,
          width: payload.el.width,
          type: payload.el.type,
          styles: payload.el.styles,
          classes: payload.el.classes,
          children: payload.el.children
        }
        commit(types.saveComponentRef, registerEgglement(componentRef))
      } else {
        let compIndex = getters.getComponentRefIndexByName(el.name)
        let newCount = getters.getComponentRefByIndex(compIndex).usageCount + 1
        commit(types.updateComponentRef, {compIndex, newCount})
      }
    }

    let egglement = registerEgglement(el, payload.pageId)
    commit(types.createEgglement, {parent, egglement})
  },

  /**
   * Removes the egglement identified by payload.elId from the
   * page (payload.pageId). Notice that the element to remove
   * may not necessarily be a direct children of the page, but sub-(n)-children.
   *
   * @param {string} payload.page : The page where the element exist
   * @param {string} payload.elId : Id of the element to be updated
   * @see {@link [types.deleteEgglement]}
   */
  [types.removeElement]: function ({ getters, commit, state }, payload) {
    commit(types._clearSelectedElements)

    let parentId = payload.elId.substring(0, payload.elId.lastIndexOf('.'))
    let parent = getChildNode(payload.page, parentId)
    let eggIndex = parent.children.findIndex(egg => egg.id === payload.elId)

    let element = parent.children[eggIndex]
    if (element.componegg) {
      let compIndex = getters.getComponentRefIndexByName(element.name)
      let count = getters.getComponentRefByIndex(compIndex).usageCount

      count > 1
        ? commit(types.updateComponentRef, {compIndex, newCount: count - 1})
        : commit(types.removeComponentRef, compIndex)
    }

    commit(types.deleteEgglement, {parent, eggIndex})
  },

  /**
   * Updates the element identified by payload.elId with the payload values
   *
   * @param {string} payload.pageId : Id of the page where the element reside
   * @param {string} payload.elId : Id of the element to be updated
   * @param {number} payload.left : New value for the element's left prop
   * @param {number} payload.top : New value for the element's top prop
   * @param {number} payload.height : New value for the element's height
   * @param {number} payload.width : New value for the element's width
   *
   * @see {@link [types.updateEgglement]}
   */
  [types.resizeElement]: function ({ getters, commit }, payload) {
    let page = getters.getPageById(payload.pageId)
    let egglement = getChildNode(page, payload.elId)

    if (
      payload.left !== egglement.left || payload.top !== egglement.top ||
      payload.height !== egglement.height || payload.width !== egglement.width
    ) {
      commit(types.updateEgglement, {
        egglement,
        left: payload.left,
        top: payload.top,
        height: payload.height,
        width: payload.width
      })

      // Remove old selected element and add the updated one
      commit(types._removeSelectedElement, getters.getSelectedElIndexById(payload.elId))
      commit(types._addSelectedElement, egglement)
    }
  },

  /**
   * If payload.parentId != null, meaning that the moved element
   * has been dropped in a new container, the element will change its family.
   *
   * If payload.parentId == null the position of the element
   * identified by payload.elId will be updated.
   *
   * @param {string} payload.pageId : Id of the page where the element exits
   * @param {string} payload.elId : Id of the element to be updated
   * @param {number} payload.left : New value for the element's left prop
   * @param {number} payload.top : New value for the element's top prop
   * @param {number} payload.mouseX : Global mouse position for left axis
   * @param {number} payload.mouseY : Global mouse position for top axis
   * @param {string|null} [payload.parentId] : Id of the container where the element has been dropped
   *
   * @see {@link [types.changeElementParent]}
   * @see {@link [types.updateEgglement]}
   */
  [types.moveElement]: function ({ getters, dispatch, commit }, payload) {
    let page = getters.getPageById(payload.pageId)
    let egglement = getChildNode(page, payload.elId)

    if (payload.left !== egglement.left || payload.top !== egglement.top) {
      if (payload.parentId) {
        dispatch(types.changeElementParent, {...payload, page, egglement})
      } else {
        commit(types.updateEgglement, {egglement, left: payload.left, top: payload.top})

        // Remove old selected element and add the updated one
        commit(types._removeSelectedElement, getters.getSelectedElIndexById(payload.elId))
        commit(types._addSelectedElement, egglement)
      }
    }
  },

  /**
   * Changes the payload.egglement to another family:
   * First removes the egglement from the children array of it's current (old) parent.
   * Registers the egglement with the ids of its new family and created as new child
   * on its new parent. After this process, its position/size gets updated.
   *
   * @param {string} payload.pageId : Id of the page where the element exist
   * @param {string} payload.elId : Id of the element to be updated
   * @param {number} payload.left : New value for the element's left prop
   * @param {number} payload.top : New value for the element's top prop
   * @param {number} payload.mouseX : Global mouse position for left axis
   * @param {number} payload.mouseY : Global mouse position for top axis
   * @param {string} payload.parentId : Id of the container where the element has been dropped
   *
   * @see {@link [types.deleteEgglement]}
   * @see {@link [types.createEgglement]}
   * @see {@link [types.updateEgglement]}
   */
  [types.changeElementParent]: function ({ getters, commit }, payload) {
    // To avoid reference problems (the oldSelected element will be different)
    commit(types._clearSelectedElements)

    // OLD FAMILY business
    let oldParentId = payload.elId.substring(0, payload.elId.lastIndexOf('.'))
    let oldParent = getChildNode(payload.page, oldParentId)
    let childEggIndex = oldParent.children.findIndex(egg => egg.id === payload.egglement.id)

    commit(types.deleteEgglement, {parent: oldParent, eggIndex: childEggIndex})

    // NEW FAMILY business
    let newParent = getChildNode(payload.page, payload.parentId)
    payload.egglement = registerEgglement(payload.egglement, payload.parentId)

    commit(types.createEgglement, {parent: newParent, egglement: payload.egglement})

    // Update relative position and dimensions of the element
    const relPoint = getRelativePoint(payload.page, payload.egglement.id, payload.mouseX, payload.mouseY)

    // TODO: extract logic to helper and add support for percentages in dimensions (stage.vue same)
    let left = relPoint.left - (payload.egglement.width / 2)
    let top = relPoint.top - (payload.egglement.height / 2)
    let height = null
    let width = null

    // Checks if position + size gets out-of-bounds, if so, reposition...
    if ((top + payload.egglement.height) > newParent.height) {
      top -= (top + payload.egglement.height) - newParent.height
    }
    if ((left + payload.egglement.width) > newParent.width) {
      left -= (left + payload.egglement.width) - newParent.width
    }

    // Checks if position is out-of-bounds, if so reposition...
    if (top <= 0) top = 0
    if (left <= 0) left = 0

    // Checks if, with a 0 position, the element is still out-of-bounds, if so, resize
    if (top === 0 && (payload.egglement.height > newParent.height)) height = newParent.height
    if (left === 0 && (payload.egglement.width > newParent.width)) width = newParent.width

    commit(types.updateEgglement, {egglement: payload.egglement, left, top, height, width})
  }
}

export default actions
