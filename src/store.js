import Vue from 'vue'
import Vuex from 'vuex'
import uuid4 from 'uuid/v4'
import { ADD_ELEMENT, MOVE_ELEMENT, RESIZE_ELEMENT } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    elements: []
  },
  mutations: {
    [ADD_ELEMENT] (state, element) {
      element = {...element, id: uuid4()}
      state.elements = [...state.elements, element]
    },
    [MOVE_ELEMENT] (state, payload) {
      let index = state.elements.findIndex(el => el.id === payload.id)
      state.elements[index] = {
        ...state.elements[index],
        x: payload.x,
        y: payload.y
      }
    },
    [RESIZE_ELEMENT] (state, payload) {
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
