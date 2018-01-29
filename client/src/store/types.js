// GETTERS
export const getPageIndexById = 'getPageIndexById'
export const getPageById = 'getPageById'
export const pageExists = 'pageExists'
export const pathInUse = 'pathInUse'
export const nameInUse = 'nameInUse'

export const getComponentRefIndexByName = 'getComponentRefIndexByName'
export const getComponentRefByName = 'getComponentRefByName'
export const getComponentRefByIndex = 'getComponentRefByIndex'
export const componentExist = 'componentExist'

export const getSelectedElIndexById = 'getSelectedElIndexById'

// ACTIONS
export const logIn = 'logIn'
export const logOut = 'logOut'
export const checkAuth = 'checkAuth'

export const saveProjectInGH = 'saveProjectInGH'

export const savePageAndClose = 'savePageAndClose'
export const duplicatePage = 'duplicatePage'

export const registerElement = 'registerElement'
export const resizeElement = 'resizeElement'
export const moveElement = 'moveElement'
export const changeElementParent = 'changeElementParent'
export const removeElement = 'removeElement'
export const rebaseSelectedElements = 'rebaseSelectedElements'

// MUTATIONS
export const updateProject = 'updateProject'

export const createPage = 'createPage'
export const updatePage = 'updatePage'
export const deletePage = 'deletePage'

export const createEgglement = 'createEgglement'
export const updateEgglement = 'updateEgglement'
export const deleteEgglement = 'deleteEgglement'

// INTERNAL-MUTATIONS
export const _toggleLoadingStatus = '_toggleLoadingStatus'
export const _toggleLoadingBlockStatus = '_toggleLoadingBlockStatus'
export const _toggleHasChanges = '_toggleHasChanges'

export const _toggleAuthorizationStatus = '_toggleAuthorizationStatus'
export const _addAuthenticatedUser = '_addAuthenticatedUser'
export const _removeAuthenticatedUser = '_removeAuthenticatedUser'

export const _togglePageDialog = '_togglePageDialog'
export const _changeActivePage = '_changeActivePage'
export const _rebaseActivePage = '_rebaseActivePage'

export const _clearSelectedElements = '_clearSelectedElements'
export const _addSelectedElements = '_addSelectedElements'
export const _addSelectedElement = '_addSelectedElement'
export const _removeSelectedElement = '_removeSelectedElement'

export const _saveComponentRef = '_saveComponentRef'
export const _updateComponentRef = '_updateComponentRef'
export const _removeComponentRef = '_removeComponentRef'

const types = {
// GETTERS
  getPageIndexById,
  getPageById,
  pageExists,
  pathInUse,
  nameInUse,
  getComponentRefIndexByName,
  getComponentRefByName,
  getComponentRefByIndex,
  componentExist,
  getSelectedElIndexById,
// ACTIONS
  logIn,
  logOut,
  checkAuth,
  saveProjectInGH,
  savePageAndClose,
  duplicatePage,
  registerElement,
  resizeElement,
  moveElement,
  changeElementParent,
  removeElement,
  rebaseSelectedElements,
// MUTATIONS
  updateProject,
  createPage,
  updatePage,
  deletePage,
  createEgglement,
  updateEgglement,
  deleteEgglement,
// INTERNAL-MUTATIONS
  _toggleLoadingStatus,
  _toggleLoadingBlockStatus,
  _toggleHasChanges,
  _toggleAuthorizationStatus,
  _addAuthenticatedUser,
  _removeAuthenticatedUser,
  _togglePageDialog,
  _changeActivePage,
  _rebaseActivePage,
  _clearSelectedElements,
  _addSelectedElements,
  _addSelectedElement,
  _removeSelectedElement,
  _saveComponentRef,
  _updateComponentRef,
  _removeComponentRef
}

export default types
