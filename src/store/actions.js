import uuid4 from 'uuid/v4'
import types from '@/store/types'
import state from '@/store/state'

// TODO: Refactor actions and divide them by context

const actions = {
  [types.savePageAndClose]: function ({ commit, getters }, payload) {
    let isNew = false
    if (!payload.id) {
      // Saves new page
      isNew = true
      let page = {
        id: uuid4(),
        name: payload.name,
        path: payload.path.toLowerCase(),
        children: []
      }
      commit(types.createPage, page)
    } else {
      // Updates existing page
      let pagePayload = {
        pageIndex: getters.getPageIndexById(payload.id),
        name: payload.name,
        path: payload.path
      }
      commit(types.updatePage, pagePayload)
    }
    commit(types.togglePageDialog, {isOpen: false, isNew})
  },

  [types.registerAndSaveEgglement]: function ({ commit, getters }, payload) {
    let parent = getters.getPageById(payload.parentId)
    let egglement = registerEgglement(payload.el, payload.parentId)
    commit(types.createEgglement, {parent, egglement})
  },

  [types.moveEgglement]: function ({ dispatch, commit }, payload) {
    // payload = {pageId, elId, parentId=null(if dropped on a containegg), x, y}
    if (payload.parentId) {
      dispatch(types.changeEgglementParent, {elId: payload.elId, parentId: payload.parentId, pageId: payload.pageId})
    } else {
      let family = getFamilyItems(payload.pageId, payload.elId)
      commit(types.updateEgglement, {egglement: family.childEgg, x: payload.x, y: payload.y})
    }
  },

  [types.changeEgglementParent]: function ({ commit }, payload) {
    // payload = { newParentId, elId, pageId }
    let family = getFamilyItems(payload.pageId, payload.elId)

    // ----- OLD FAMILY business
    let oldParentId = payload.elId.substring(0, payload.elId.lastIndexOf('.'))

    let oldParent = getChildNode(family.rootNode, oldParentId, family.familyIds)
    let childEggIndex = oldParent.children.findIndex(egg => egg.id === family.childEgg.id)
    commit(types.deleteEgglement, {parent: oldParent, eggIndex: childEggIndex})

    // ----- NEW FAMILY business
    let newFamily = getFamilyItems(payload.pageId, payload.parentId)
    let newParent = newFamily.childEgg

    family.childEgg = registerEgglement(family.childEgg, payload.parentId)
    commit(types.createEgglement, {parent: newParent, egglement: family.childEgg})

    // TODO: Improve positioning of child when parent change
    let x = 0
    let y = 0

    commit(types.updateEgglement, {egglement: family.childEgg, x, y})
  },

  [types.resizeEgglement]: function ({ getters, commit }, payload) {
    // payload = {pageId, elId, x, y, height, width}
    let family = getFamilyItems(payload.pageId, payload.elId)

    commit(types.updateEgglement, {
      egglement: family.childEgg,
      x: payload.x,
      y: payload.y,
      height: payload.height,
      width: payload.width
    })
  }
}

// ----- HELPER METHODS ----- //

function getFamilyItems (pageId, elId) {
  let pageIndex = state.pages.findIndex(p => p.id === pageId)
  let page = state.pages[pageIndex]

  let familyIds = elId.split('.')

  let rootNodeIndex = pageIndex
  let rootNode = page

  if (familyIds[0] !== pageId) {
    rootNodeIndex = page.children.findIndex(ch => ch.id === familyIds[0])
    rootNode = page.children[rootNodeIndex]
  }

  let childEgg = getChildNode(rootNode, elId, familyIds)
  return { familyIds, page, pageIndex, rootNode, rootNodeIndex, childEgg }
}

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

function getChildNode (currentNode, targetId, familyIds) {
  if (currentNode.id === targetId) {
    return currentNode
  }

  for (let child of currentNode.children) {
    let childIds = child.id.split('.')
    let trimmedChildId = childIds[childIds.length - 1]

    if (familyIds.indexOf(trimmedChildId) !== -1) {
      return getChildNode(child, targetId, familyIds)
    }
  }
}

export default actions
