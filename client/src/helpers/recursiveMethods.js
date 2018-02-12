import shortid from 'shortid'

/**
 * Assigns a new id to the element preceded by the parentId and a dot '.'
 *
 * @param {object} el : Element to register
 * @param {string} [parentId] : Id of the parent element
 *
 * @return {object} : New element (cloned from egglement) with newly assigned ids
 */
export function setElId (el, parentId) {
  let elId = shortid.generate()
  if (parentId) elId = parentId.concat('.', elId)

  let newElement = {...el, id: elId, children: []}

  if (el.children && el.children.length > 0) {
    for (let childEl of el.children) {
      newElement.children.push(setElId(childEl, elId))
    }
  }
  return newElement
}

/**
* Creates an array containing all the global/external components inside.
*
* @param {object} el : Current reviewing element
* @return {object} : An array with the global/external components found inside.
*/
export function getExtGlobComps (el, compList) {
  if (!compList) compList = []
  if (el.global || el.external) compList.push(el)

  if (el.children && el.children.length > 0) {
    for (let childEl of el.children) {
      compList = getExtGlobComps(childEl, compList)
    }
  }
  return compList
}

/**
 * Returns the element identified by targetId, which could be the
 * currentNode itself, one of its children... (and down to any depth)
 *
 * @param {object} currentNode : The element being inspected
 * @param {string} targetId : The id of the element expected
 *
 * @return {object} : The element identified by targetId
 */
export function getChildNode (currentNode, targetId) {
  if (currentNode.id === targetId) return currentNode

  for (let child of currentNode.children) {
    if (targetId.indexOf(child.id) !== -1) {
      return getChildNode(child, targetId)
    }
  }
}

/**
 * Returns the element --identified by targetId-- relative position,
 * based on its parent (and full family depth) position
 * and the current mouse left/top position.
 *
 * This method gives positioning support for elements changing "family".
 *
 * @param {object} currentNode : The element being inspected
 * @param {string} targetId : The id of the element expected
 * @param {number} currentX : Current relative left position
 * @param {number} currentY : Current relative top position
 *
 * @return {object} : Relative point obtained from the currentX, currentY
 */
export function calcRelativePoint (currentNode, targetId, currentX, currentY) {
  if (currentNode.id === targetId) return {left: currentX, top: currentY}

  if (currentNode.left && currentNode.top) {
    currentX -= currentNode.left
    currentY -= currentNode.top
  }
  for (let child of currentNode.children) {
    if (targetId.indexOf(child.id) !== -1) {
      return calcRelativePoint(child, targetId, currentX, currentY)
    }
  }
}
