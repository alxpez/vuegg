export const toggleSidebar = 'toggleSidebar'
export const toggleMiniSidebar = 'toggleMiniSidebar'
export const togglePageDialog = 'togglePageDialog'

export const addEgglement = 'addEgglement'
export const updateEgglement = 'updateEgglement'
export const removeEgglement = 'removeEgglement'

export const addPage = 'addPage'
export const updatePage = 'updatePage'
export const removePage = 'removePage'

export const savePageAndClose = 'savePageAndClose'
export const registerAndAddEgglement = 'registerAndAddEgglement'
export const resizeEgglement = 'resizeEgglement'
export const moveEgglement = 'moveEgglement'
export const changeEgglementParent = 'changeEgglementParent'

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
  registerAndAddEgglement,
  resizeEgglement,
  moveEgglement,
  changeEgglementParent,
  // MUTATIONS
  toggleSidebar,
  toggleMiniSidebar,
  togglePageDialog,
  addEgglement,
  updateEgglement,
  removeEgglement,
  addPage,
  updatePage,
  removePage
}

export default types
