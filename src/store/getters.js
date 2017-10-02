import types from '@/store/types'

// TODO: Refactor getters and divide them by context

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

export default getters
