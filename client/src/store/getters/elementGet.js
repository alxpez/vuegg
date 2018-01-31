import types from '@/store/types'

const elementGetters = {
/**
 * Finds an element index (from the selected elements array) by a given id
 *
 * @param {string} id : Selected element's id
 * @return {object} : Element index
 */
  [types.getSelectedElIndexById]: (state, getters) => (id) => {
    return state.app.selectedElements.findIndex(el => el.id === id)
  }
}

export default elementGetters
