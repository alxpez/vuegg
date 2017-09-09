import Vue from 'vue'
import Vuex from 'vuex'
import { ADD_ELEMENT, MOVE_ELEMENT, RESIZE_ELEMENT } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    elements: []
  },
  mutations: {
    // ES2015 computed property name feature to use a constant as the function name
    [ADD_ELEMENT] (state, element) {
      // TODO: set element id (hash)
      state.elements = [...state.elements, element]
    },
    [MOVE_ELEMENT] (state, payload) {
      console.log(payload)
    },
    [RESIZE_ELEMENT] (state, payload) {
      console.log(payload)
    }
  }
})
