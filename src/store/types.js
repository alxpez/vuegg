// GETTERS
export const getPageIndexById = 'getPageIndexById'
export const getPageById = 'getPageById'
export const componentExist = 'componentExist'
export const pageExists = 'pageExists'
export const pathInUse = 'pathInUse'
export const nameInUse = 'nameInUse'

// ACTIONS
export const savePageAndClose = 'savePageAndClose'
export const registerElement = 'registerElement'
export const resizeElement = 'resizeElement'
export const moveElement = 'moveElement'
export const changeElementParent = 'changeElementParent'
export const removeElement = 'removeElement'

// MUTATIONS
export const _toggleSidebar = '_toggleSidebar'
export const _toggleMiniSidebar = '_toggleMiniSidebar'
export const _togglePageDialog = '_togglePageDialog'
export const _changeActivePage = '_changeActivePage'
export const _rebaseActivePage = '_rebaseActivePage'
export const _clearSelectedElements = '_clearSelectedElements'
export const _addSelectedElement = '_addSelectedElement'
export const _removeSelectedElement = '_removeSelectedElement'

export const updateProject = 'updateProject'
export const saveComponentRef = 'saveComponentRef'
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
  componentExist,
  pageExists,
  pathInUse,
  nameInUse,
  // ACTIONS
  savePageAndClose,
  registerElement,
  resizeElement,
  moveElement,
  changeElementParent,
  removeElement,
  // MUTATIONS
  _toggleSidebar,
  _toggleMiniSidebar,
  _togglePageDialog,
  _changeActivePage,
  _rebaseActivePage,
  _clearSelectedElements,
  _addSelectedElement,
  _removeSelectedElement,

  updateProject,
  saveComponentRef,
  createPage,
  updatePage,
  deletePage,
  createEgglement,
  updateEgglement,
  deleteEgglement
}

export default types
