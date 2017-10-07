import types from '@/store/types'

// TODO: Refactor mutations and divide them by context

const mutations = {
  // App mutations
  [types.toggleSidebar] (state, status) {
    state.app.sidebar.isOpen = status
  },
  [types.toggleMiniSidebar] (state) {
    state.app.sidebar.isMini = !state.app.sidebar.isMini
  },
  [types.togglePageDialog] (state, payload) {
    state.app.pageDialog.isNew = payload.isNew
    state.app.pageDialog.isOpen = payload.isOpen
  },
  // Page mutations
  [types.createPage] (state, page) {
    state.pages.push(page)
  },
  [types.updatePage] (state, payload) {
    state.pages.splice(payload.pageIndex, 1, {
      ...state.pages[payload.pageIndex],
      name: payload.name,
      path: payload.path
    })
  },
  [types.deletePage] (state, payload) {
    state.pages.splice(payload.pageIndex, 1)
  },
  // Egglement mutations
  [types.createEgglement] (state, payload) {
    payload.parent.children.push(payload.egglement)
  },
  [types.updateEgglement] (state, payload) {
    payload.egglement.x = payload.x
    payload.egglement.y = payload.y
    if (payload.height) payload.egglement.height = payload.height
    if (payload.width) payload.egglement.width = payload.width
  },
  [types.deleteEgglement] (state, payload) {
    payload.parent.children.splice(payload.eggIndex, 1)
  }
}

export default mutations
