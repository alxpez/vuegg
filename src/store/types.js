export const toggleSidebar = 'toggleSidebar'
export const openNewPageDialog = 'openNewPageDialog'
export const closeNewPageDialog = 'closeNewPageDialog'

export const addEgglement = 'addEgglement'
export const removeEgglement = 'removeEgglement'
export const resizeEgglement = 'resizeEgglement'
export const moveEgglement = 'moveEgglement'

export const addPage = 'addPage'
export const removePage = 'removePage'
export const editPage = 'editPage'

export const discardPageAndClose = 'discardPageAndClose'
export const savePageAndClose = 'savePageAndClose'

export const getPageIndexById = 'getPageIndexById'
export const getPageById = 'getPageById'
export const pageExists = 'pageExists'
export const pathInUse = 'pathInUse'

const types = {
  // GETTERS
  getPageIndexById,
  getPageById,
  pageExists,
  pathInUse,
  // ACTIONS
  savePageAndClose,
  discardPageAndClose,
  // MUTATIONS
  toggleSidebar,
  openNewPageDialog,
  closeNewPageDialog,
  addEgglement,
  removeEgglement,
  resizeEgglement,
  moveEgglement,
  addPage,
  removePage,
  editPage
}

export default types
