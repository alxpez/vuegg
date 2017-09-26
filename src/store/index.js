import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid/v4'
import types from '@/store/types'

Vue.use(Vuex)

const state = {
  app: {
    sidebar: {
      isOpen: false,
      isMini: false
    },
    pageDialog: {
      isNew: true,
      isOpen: false
    }
  },
  pages: [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      elements: []
    }
  ]
}

const getters = {
  [types.getPageIndexById]: (state) => (id) => {
    return state.pages.findIndex(page => page.id === id)
  },
  [types.getPageById]: (state, getters) => (id) => {
    let pageIndex = getters.getPageIndexById(id)
    return state.pages[pageIndex]
  },
  [types.pageExists]: (state, getters) => (id) => {
    let pageIndex = getters.getPageIndexById(id)
    return (pageIndex > -1)
  },
  [types.pathInUse]: (state) => (pagePath) => {
    let pageIndex = state.pages.findIndex(page => page.path === pagePath)
    return (pageIndex > -1)
  },
  [types.nameInUse]: (state) => (pageName) => {
    let pageIndex = state.pages.findIndex(page => page.name === pageName)
    return (pageIndex > -1)
  }
}

/*
  TODO: Since mutations are getting fat, implement code on getters
  These will be called by actions and these will commit the mutations.

  And remove getters from the components.
*/
const actions = {
  [types.savePageAndClose] ({ dispatch, commit, getters }, payload) {
    if (!payload.id) {
      let page = {
        id: uuid4(),
        name: payload.name,
        path: payload.path.toLowerCase(),
        elements: []
      }
      commit(types.addPage, page)
    } else {
      let pagePayload = {
        pageIndex: getters.getPageIndexById(payload.id),
        name: payload.name,
        path: payload.path
      }
      commit(types.updatePage, pagePayload)
    }
    commit(types.closePageDialog)
  }
}

const mutations = {
  // App mutations
  [types.toggleSidebar] (state) {
    state.app.sidebar.isOpen = !state.app.sidebar.isOpen
  },
  [types.toggleMiniSidebar] (state) {
    state.app.sidebar.isMini = !state.app.sidebar.isMini
  },
  [types.openPageDialog] (state, isNew) {
    state.app.pageDialog.isNew = isNew
    state.app.pageDialog.isOpen = true
  },
  [types.closePageDialog] (state) {
    state.app.pageDialog.isOpen = false
  },
  // Page mutations
  [types.addPage] (state, page) {
    state.pages = [...state.pages, page]
  },
  [types.updatePage] (state, payload) {
    state.pages[payload.pageIndex] = {
      ...state.pages[payload.pageIndex],
      name: payload.name,
      path: payload.path
    }
  },
  // Egglement mutations
  [types.addEgglement] (state, payload) {
    let element = {...payload.el, id: uuid4()}
    state.pages[payload.pageIndex].elements = [
      ...state.pages[payload.pageIndex].elements,
      element
    ]
  },
  [types.moveEgglement] (state, payload) {
    let index = state.pages[payload.pageIndex].elements.findIndex(el => el.id === payload.elId)
    state.pages[payload.pageIndex].elements[index] = {
      ...state.pages[payload.pageIndex].elements[index],
      x: payload.x,
      y: payload.y
    }
  },
  [types.resizeEgglement] (state, payload) {
    let index = state.pages[payload.pageIndex].elements.findIndex(el => el.id === payload.elId)
    state.pages[payload.pageIndex].elements[index] = {
      ...state.pages[payload.pageIndex].elements[index],
      x: payload.x,
      y: payload.y,
      height: payload.height,
      width: payload.width
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
