// GETTERS
export const getPageIndexById = 'getPageIndexById'
export const getPageById = 'getPageById'
export const pageExists = 'pageExists'
export const pathInUse = 'pathInUse'
export const nameInUse = 'nameInUse'

// ACTIONS
export const savePageAndClose = 'savePageAndClose'
export const registerAndSaveEgglement = 'registerAndSaveEgglement'
export const resizeEgglement = 'resizeEgglement'
export const moveEgglement = 'moveEgglement'
export const changeEgglementParent = 'changeEgglementParent'

// MUTATIONS
export const toggleSidebar = 'toggleSidebar'
export const toggleMiniSidebar = 'toggleMiniSidebar'
export const togglePageDialog = 'togglePageDialog'
export const updateProject = 'updateProject'
export const createPage = 'createPage'
export const updatePage = 'updatePage'
export const deletePage = 'deletePage'
export const createEgglement = 'createEgglement'
export const updateEgglement = 'updateEgglement'
export const deleteEgglement = 'deleteEgglement'

const types = {
  // GETTERS
  getPageIndexById,
  getPageById,
  pageExists,
  pathInUse,
  nameInUse,
  // ACTIONS
  savePageAndClose,
  registerAndSaveEgglement,
  resizeEgglement,
  moveEgglement,
  changeEgglementParent,
  // MUTATIONS
  toggleSidebar,
  toggleMiniSidebar,
  togglePageDialog,
  updateProject,
  createPage,
  updatePage,
  deletePage,
  createEgglement,
  updateEgglement,
  deleteEgglement
}

export default types
