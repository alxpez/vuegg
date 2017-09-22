export const toggleSidebar = 'toggleSidebar'
export const toggleMiniSidebar = 'toggleMiniSidebar'
export const openPageDialog = 'openPageDialog'
export const closePageDialog = 'closePageDialog'

export const addEgglement = 'addEgglement'
export const removeEgglement = 'removeEgglement'
export const resizeEgglement = 'resizeEgglement'
export const moveEgglement = 'moveEgglement'

export const addPage = 'addPage'
export const updatePage = 'updatePage'
export const removePage = 'removePage'

export const savePageAndClose = 'savePageAndClose'

export const getPageIndexById = 'getPageIndexById'
export const getPageById = 'getPageById'
export const pageExists = 'pageExists'
export const pathInUse = 'pathInUse'
export const nameInUse = 'nameInUse'

const types = {
  // GETTERS
  getPageIndexById,
  getPageById,
  pageExists,
  pathInUse,
  nameInUse,
  // ACTIONS
  savePageAndClose,
  // MUTATIONS
  toggleSidebar,
  toggleMiniSidebar,
  openPageDialog,
  closePageDialog,
  addEgglement,
  removeEgglement,
  resizeEgglement,
  moveEgglement,
  addPage,
  updatePage,
  removePage
}

export default types
