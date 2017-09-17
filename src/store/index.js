import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid/v4'
import types from '@/store/types'

Vue.use(Vuex)

const state = {
  app: {
    sidebar: {
      isOpen: false,
      mini: false
    },
    pageDialog: {
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
  [types.pathInUse]: (state) => (path) => {
    let pageIndex = state.pages.findIndex(page => page.path === path)
    return (pageIndex > -1)
  }
}

/*
  TODO: Since mutations are getting fat, implement code on getters
  These will be called by actions and these will commit the mutations.

  And remove getters from the components.
*/
const actions = {
  [types.savePageAndClose] ({ dispatch, commit }, payload) {
    let page = {...payload, id: uuid4(), path: payload.path.toLowerCase()}
    commit(types.addPage, page)
    dispatch(types.discardPageAndClose, payload)
  },
  [types.discardPageAndClose] ({ commit }, payload) {
    payload.name = ''
    payload.path = ''
    commit(types.closeNewPageDialog)
  }
}

const mutations = {
  [types.toggleSidebar] (state) {
    state.app.sidebar.isOpen = !state.app.sidebar.isOpen
  },
  [types.openNewPageDialog] (state) {
    state.app.pageDialog.isOpen = true
  },
  [types.closeNewPageDialog] (state) {
    state.app.pageDialog.isOpen = false
  },
  [types.addPage] (state, page) {
    state.pages = [...state.pages, page]
  },
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
