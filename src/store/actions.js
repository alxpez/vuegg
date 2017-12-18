import shortid from 'shortid'
import types from './types'
import newPage from '@/helpers/page'

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
        pageIndex: getters.getPageIndexById(payload.id),
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
   * (This action assumes that the element is being added to a page)
   *
   * @param {string} payload.pageId : Id of the page where the element is being added
   * @param {object} payload.el : The element that will be added to the page
   *
   * @see {@link [types.createEgglement]}
   */
  [types.registerAndSaveElement]: function ({ getters, commit }, payload) {
    let parent = getters.getPageById(payload.pageId)
    let egglement = registerEgglement(payload.el, payload.pageId)
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
  [types.removeElement]: function ({ commit }, payload) {
    let parentId = payload.elId.substring(0, payload.elId.lastIndexOf('.'))
    let parent = getChildNode(payload.page, parentId)
    let eggIndex = parent.children.findIndex(egg => egg.id === payload.elId)

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

    commit(types.updateEgglement, {
      egglement,
      left: payload.left,
      top: payload.top,
      height: payload.height,
      width: payload.width
    })
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

    if (payload.parentId) {
      dispatch(types.changeElementParent, {...payload, page, egglement})
    } else {
      commit(types.updateEgglement, {egglement, left: payload.left, top: payload.top})
    }
  },

  /**
   * Changes the payoad.egglement to another family:
   * First removes the egglement from the children array of it's current (old) parent.
   * Registers the egglement with the ids of its new family and created as new child
   * on its new parent. After this process, its position gets updated.
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

    // Update relative position of the element
    const relPoint = getRelativePoint(payload.page, payload.egglement.id, payload.mouseX, payload.mouseY)

    const left = relPoint.left - (payload.egglement.width / 2)
    const top = relPoint.top - (payload.egglement.height / 2)

    commit(types.updateEgglement, {egglement: payload.egglement, left, top})
  }
}

// ----- HELPER METHODS ----- //

/**
 * Assigns a new id to the egglement preceded by the parentId and a dot '.'
 *
 * @param {object} egglement : Element to register
 * @param {string} parentId : Id of the parent element
 *
 * @return {object} : New element (cloned from egglement) with newly assigned ids
 */
function registerEgglement (egglement, parentId) {
  let eggId = shortid.generate()
  if (parentId) eggId = parentId.concat('.', eggId)

  let newEgglement = {...egglement, id: eggId, children: []}

  if (egglement.children && egglement.children.length > 0) {
    for (let childEgg of egglement.children) {
      newEgglement.children.push(registerEgglement(childEgg, eggId))
    }
  }
  return newEgglement
}

/**
 * Returns the element identified by targetId, which could be the
 * currentNode itself, one of its children... (and down to any depth)
 *
 * @param {object} currentNode : The element being inspected
 * @param {string} targetId : The id of the element expected
 *
 * @return {object} : The element identified by targetId
 */
function getChildNode (currentNode, targetId) {
  if (currentNode.id === targetId) return currentNode

  for (let child of currentNode.children) {
    if (targetId.indexOf(child.id) !== -1) {
      return getChildNode(child, targetId)
    }
  }
}

/**
 * Returns the element (identified by targetId) position,
 * relative to its parent (and full family depth) position
 * and the current left/top position.
 *
 * @param {object} currentNode : The element being inspected
 * @param {string} targetId : The id of the element expected
 * @param {number} currentX : Current relative left position
 * @param {number} currentY : Current relative top position
 *
 * @return {object} : Relative point obtained from the currentX, currentY
 */
function getRelativePoint (currentNode, targetId, currentX, currentY) {
  if (currentNode.id === targetId) return {left: currentX, top: currentY}

  if (currentNode.left && currentNode.top) {
    currentX -= currentNode.left
    currentY -= currentNode.top
  }
  for (let child of currentNode.children) {
    if (targetId.indexOf(child.id) !== -1) {
      return getRelativePoint(child, targetId, currentX, currentY)
    }
  }
}

export default actions
