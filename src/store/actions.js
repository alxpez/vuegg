import uuid4 from 'uuid/v4'
import types from '@/store/types'
import state from '@/store/state'

// TODO: Refactor actions and divide them by context

const actions = {
  [types.savePageAndClose] ({ commit, getters }, payload) {
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
      commit(types.addPage, page)
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

  [types.registerAndAddEgglement] ({ commit, getters }, payload) {
    let parent = getters.getPageById(payload.parentId)
    let egglement = registerEgglement(payload.el)
    commit(types.addEgglement, {parent, egglement})
  },

  [types.moveEgglement] ({ dispatch, commit }, payload) {
    // payload = {pageId, elId, parentId=null(if dropped on a containegg), x, y}
    if (payload.parentId) {
      dispatch(types.changeEgglementParent, {elId: payload.elId, parentId: payload.parentId, pageId: payload.pageId})
    } else {
      let ai = prepareActionItems(payload.pageId, payload.elId)
      commit(types.updateEgglement, {egglement: ai.childEgg, x: payload.x, y: payload.y})
    }
  },

  [types.changeEgglementParent] ({ commit }, payload) {
    // payload = { newParentId, elId, pageId }
    let ai = prepareActionItems(payload.pageId, payload.elId)

    // ----- OLD FAMILY business
    let oldParentId = payload.elId.substring(0, payload.elId.lastIndexOf('.'))

    if (oldParentId !== '') {
      let oldParent = getChildNode(ai.rootEgg, oldParentId, ai.familyIds)
      let childEggIndex = oldParent.children.findIndex(egg => egg.id === ai.childEgg.id)
      commit(types.removeEgglement, {parent: oldParent, eggIndex: childEggIndex})
    } else {
      commit(types.removeEgglement, {parent: ai.page, eggIndex: ai.rootEggIndex})
    }

    // ----- NEW FAMILY business
    let newFamilyIds = payload.parentId.split('.')

    let newRootEggIndex = ai.page.children.findIndex(ch => ch.id === newFamilyIds[0])
    let newRootEgg = ai.page.children[newRootEggIndex]

    let newParent = getChildNode(newRootEgg, payload.parentId, newFamilyIds)

    ai.childEgg = registerEgglement({...ai.childEgg}, payload.parentId)
    commit(types.addEgglement, {parent: newParent, egglement: ai.childEgg})

    // TODO: Improve positioning of child when parent change
    let x = 0
    let y = 0

    commit(types.updateEgglement, {egglement: ai.childEgg, x, y})
  },

  [types.resizeEgglement] ({ getters, commit }, payload) {
    // payload = {pageId, elId, x, y, height, width}
    let ai = prepareActionItems(payload.pageId, payload.elId)

    commit(types.updateEgglement, {
      egglement: ai.childEgg,
      x: payload.x,
      y: payload.y,
      height: payload.height,
      width: payload.width
    })
  }
}

// ----- HELPER METHODS ----- //

function prepareActionItems (pageId, elId) {
  let pageIndex = state.pages.findIndex(p => p.id === pageId)
  let page = state.pages[pageIndex]

  let familyIds = elId.split('.')
  let rootEggIndex = page.children.findIndex(ch => ch.id === familyIds[0])
  let rootEgg = page.children[rootEggIndex]

  let childEgg = getChildNode(rootEgg, elId, familyIds)
  return { familyIds, page, pageIndex, rootEgg, rootEggIndex, childEgg }
}

function registerEgglement (egglement, parentId) {
  let eggId = uuid4()
  if (parentId) {
    eggId = parentId.concat('.', eggId)
  }
  egglement = {...egglement, id: eggId}
  if (egglement.children && egglement.children.length > 0) {
    for (let i = 0; i < egglement.children.length; i++) {
      let child = egglement.children[i]
      if (child.egg) {
        egglement.children[i] = registerEgglement(child, eggId)
      }
    }
  }
  return egglement
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
