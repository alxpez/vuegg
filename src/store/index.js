import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid/v4'
import types from '@/store/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    elements: []
  },
  mutations: {
    [types.ADD_ELEMENT] (state, element) {
      element = {...element, id: uuid4()}
      state.elements = [...state.elements, element]
    },
    [types.MOVE_ELEMENT] (state, payload) {
      let index = state.elements.findIndex(el => el.id === payload.id)
      state.elements[index] = {
        ...state.elements[index],
        x: payload.x,
        y: payload.y
      }
    },
    [types.RESIZE_ELEMENT] (state, payload) {
      let index = state.elements.findIndex(el => el.id === payload.id)
      state.elements[index] = {
        ...state.elements[index],
        x: payload.x,
        y: payload.y,
        height: payload.height,
        width: payload.width
      }
    }
  }
})
