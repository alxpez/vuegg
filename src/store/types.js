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
export const _toggleSidebar = '_toggleSidebar'
export const _toggleMiniSidebar = '_toggleMiniSidebar'
export const _togglePageDialog = '_togglePageDialog'
export const _changeActivePage = '_changeActivePage'
export const _rebaseActivePage = '_rebaseActivePage'

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
  _toggleSidebar,
  _toggleMiniSidebar,
  _togglePageDialog,
  _changeActivePage,
  _rebaseActivePage,

  updateProject,
  createPage,
  updatePage,
  deletePage,
  createEgglement,
  updateEgglement,
  deleteEgglement
}

export default types
