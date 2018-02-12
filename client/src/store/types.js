/**
 * Keeps an index of all the "types" of functions of the store
 * (Getters, Actions, Mutations --internal/external)
 *
 * TODO: it may be smart to granulate this file (either by type or by context)
 */

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

export const downloadProject = 'downloadProject'
export const uploadProjectToGH = 'uploadProjectToGH'
export const downloadVueSources = 'downloadVueSources'
export const uploadVueSourcesToGH = 'uploadVueSourcesToGH'
export const checkLastSaved = 'checkLastSaved'
export const syncLocal = 'syncLocal'
export const loadVueggProject = 'loadVueggProject'
export const clearProject = 'clearProject'

export const savePageAndClose = 'savePageAndClose'
export const duplicatePage = 'duplicatePage'
export const removePage = 'removePage'

export const registerElement = 'registerElement'
export const resizeElement = 'resizeElement'
export const moveElement = 'moveElement'
export const changeElementParent = 'changeElementParent'
export const removeElement = 'removeElement'
export const rebaseSelectedElements = 'rebaseSelectedElements'

// MUTATIONS
export const addProject = 'addProject'
export const updateProject = 'updateProject'
export const deleteProject = 'deleteProject'

export const createPage = 'createPage'
export const updatePage = 'updatePage'
export const deletePage = 'deletePage'

export const createEgglement = 'createEgglement'
export const updateEgglement = 'updateEgglement'
export const deleteEgglement = 'deleteEgglement'

// INTERNAL-MUTATIONS
export const _toggleAuthorizationStatus = '_toggleAuthorizationStatus'
export const _addAuthenticatedUser = '_addAuthenticatedUser'
export const _removeAuthenticatedUser = '_removeAuthenticatedUser'

export const _toggleLoadingStatus = '_toggleLoadingStatus'
export const _toggleBlockLoadingStatus = '_toggleBlockLoadingStatus'
export const _toggleHasChanges = '_toggleHasChanges'
export const _toggleIsSyncing = '_toggleIsSyncing'
export const _toggleCanRedo = '_toggleCanRedo'
export const _toggleCanUndo = '_toggleCanUndo'

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

  downloadVueSources,
  downloadProject,
  uploadVueSourcesToGH,
  uploadProjectToGH,
  checkLastSaved,
  syncLocal,
  loadVueggProject,
  clearProject,

  savePageAndClose,
  duplicatePage,
  removePage,

  registerElement,
  resizeElement,
  moveElement,
  changeElementParent,
  removeElement,
  rebaseSelectedElements,

// MUTATIONS
  addProject,
  updateProject,
  deleteProject,

  createPage,
  updatePage,
  deletePage,

  createEgglement,
  updateEgglement,
  deleteEgglement,

// INTERNAL-MUTATIONS
  _toggleAuthorizationStatus,
  _addAuthenticatedUser,
  _removeAuthenticatedUser,

  _toggleLoadingStatus,
  _toggleBlockLoadingStatus,
  _toggleHasChanges,
  _toggleIsSyncing,
  _toggleCanRedo,
  _toggleCanUndo,

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
