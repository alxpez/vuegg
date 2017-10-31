import uuid4 from 'uuid/v4'
import types from '@/store/types'

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
   * @param {string|null} [payload.id] : Page's id (uuid v4, randomly generated)
   *
   * @see {@link [types.getPageIndexById]}
   * @see {@link [types.createPage]}
   * @see {@link [types.updatePage]}
   * @see {@link [types.togglePageDialog]}
   */
  [types.savePageAndClose]: function ({ getters, commit }, payload) {
    if (!payload.id) {
      let page = {
        id: uuid4(),
        name: payload.name,
        path: payload.path.toLowerCase(),
        children: []
      }
      commit(types.createPage, page)
    } else {
      let pagePayload = {
        pageIndex: getters.getPageIndexById(payload.id),
        name: payload.name,
        path: payload.path
      }
      commit(types.updatePage, pagePayload)
    }
    commit(types.togglePageDialog, {isOpen: false, isNew: !payload.id})
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
  [types.registerAndSaveEgglement]: function ({ getters, commit }, payload) {
    let parent = getters.getPageById(payload.pageId)
    let egglement = registerEgglement(payload.el, payload.pageId)
    commit(types.createEgglement, {parent, egglement})
  },

  /**
   * Updates the element identified by payload.elId with the payload values
   *
   * @param {string} payload.pageId : Id of the page where the element reside
   * @param {string} payload.elId : Id of the element to be updated
   * @param {number} payload.left : New value for the element's X prop
   * @param {number} payload.top : New value for the element's Y prop
   * @param {number} payload.height : New value for the element's height
   * @param {number} payload.width : New value for the element's width
   *
   * @see {@link [types.updateEgglement]}
   */
  [types.resizeEgglement]: function ({ getters, commit }, payload) {
    let page = getters.getPageById(payload.pageId)
    let egglement = getChildNode(page, payload.elId)

    commit(types.updateEgglement, {
      egglement,
      x: payload.left,
      y: payload.top,
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
   * @param {number} payload.left : New value for the element's X prop
   * @param {number} payload.top : New value for the element's Y prop
   * @param {number} payload.mouseX : Global mouse position for X axis
   * @param {number} payload.mouseY : Global mouse position for Y axis
   * @param {string|null} [payload.parentId] : Id of the container where the element has been dropped
   *
   * @see {@link [types.changeEgglementParent]}
   * @see {@link [types.updateEgglement]}
   */
  [types.moveEgglement]: function ({ getters, dispatch, commit }, payload) {
    let page = getters.getPageById(payload.pageId)
    let egglement = getChildNode(page, payload.elId)

    if (payload.parentId) {
      dispatch(types.changeEgglementParent, {...payload, page, egglement})
    } else {
      commit(types.updateEgglement, {egglement, x: payload.left, y: payload.top})
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
   * @param {number} payload.left : New value for the element's X prop
   * @param {number} payload.top : New value for the element's Y prop
   * @param {number} payload.mouseX : Global mouse position for X axis
   * @param {number} payload.mouseY : Global mouse position for Y axis
   * @param {string} payload.parentId : Id of the container where the element has been dropped
   *
   * @see {@link [types.deleteEgglement]}
   * @see {@link [types.createEgglement]}
   * @see {@link [types.updateEgglement]}
   */
  [types.changeEgglementParent]: function ({ getters, commit }, payload) {
    // OLD FAMILY business
    let oldParentId = payload.elId.substring(0, payload.elId.lastIndexOf('.'))
    let oldParent = getChildNode(payload.page, oldParentId)
    let childEggIndex = oldParent.children.findIndex(egg => egg.id === payload.egglement.id)

    commit(types.deleteEgglement, {parent: oldParent, eggIndex: childEggIndex})

    // NEW FAMILY business
    let newParent = getChildNode(payload.page, payload.parentId)
    payload.egglement = registerEgglement(payload.egglement, payload.parentId)

    commit(types.createEgglement, {parent: newParent, egglement: payload.egglement})

    // Update relative position of the element, minus the EggStage offset position
    let relPoint = getRelativePoint(payload.page, payload.egglement.id, payload.mouseX, payload.mouseY)
    let pageEl = document.getElementById(payload.pageId)

    let x = relPoint.x - pageEl.offsetLeft - (payload.egglement.width / 2)
    let y = relPoint.y - pageEl.offsetTop - (payload.egglement.height / 2)

    commit(types.updateEgglement, {egglement: payload.egglement, x, y})
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
  let eggId = uuid4()
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
 * and the current X/Y position.
 *
 * @param {object} currentNode : The element being inspected
 * @param {string} targetId : The id of the element expected
 * @param {number} currentX : Current relative X position
 * @param {number} currentY : Current relative Y position
 *
 * @return {object} : Relative point obtained from the currentX, currentY
 */
function getRelativePoint (currentNode, targetId, currentX, currentY) {
  if (currentNode.id === targetId) return {x: currentX, y: currentY}

  if (currentNode.x && currentNode.y) {
    currentX -= currentNode.x
    currentY -= currentNode.y
  }
  for (let child of currentNode.children) {
    if (targetId.indexOf(child.id) !== -1) {
      return getRelativePoint(child, targetId, currentX, currentY)
    }
  }
}

export default actions
