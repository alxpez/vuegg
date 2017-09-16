import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid/v4'
import types from '@/store/mutation-types'

Vue.use(Vuex)

/*
  TODO: Have in mind that this is just a brief representation
  of what the state might contain, in th future, menu's states (open/closed),
  or any other parameter of the vuegg functionality (outside of the pages),
  could be managed by the state tree as well.
*/
export default new Vuex.Store({
  state: {
    pages: [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        elements: []
      }, {
        id: 'caca',
        name: 'Caca',
        path: '/ww',
        elements: []
      }
    ]
  },
  getters: {
    getPageIndexById: (state) => (id) => {
      return state.pages.findIndex(page => page.id === id)
    },
    getPageById: (state, getters) => (id) => {
      let pageIndex = getters.getPageIndexById(id)
      return state.pages[pageIndex]
    },
    pageExists: (state, getters) => (id) => {
      let pageIndex = getters.getPageIndexById(id)
      return (pageIndex > -1)
    },
    pathInUse: (state) => (path) => {
      let pageIndex = state.pages.findIndex(page => page.path === path)
      return (pageIndex > -1)
    }
  },
  /*
    TODO: Since mutations are getting fat, implement code on getters
    These will be called by actions and these will commit the mutations.

    And remove getters from the components.
  */
  mutations: {
    [types.ADD_ELEMENT] (state, payload) {
      let element = {...payload.el, id: uuid4()}
      state.pages[payload.pageIndex].elements = [
        ...state.pages[payload.pageIndex].elements,
        element
      ]
    },
    [types.MOVE_ELEMENT] (state, payload) {
      let index = state.pages[payload.pageIndex].elements.findIndex(el => el.id === payload.elId)
      state.pages[payload.pageIndex].elements[index] = {
        ...state.pages[payload.pageIndex].elements[index],
        x: payload.x,
        y: payload.y
      }
    },
    [types.RESIZE_ELEMENT] (state, payload) {
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
})
