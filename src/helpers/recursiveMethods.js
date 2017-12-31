import shortid from 'shortid'

/**
 * Assigns a new id to the egglement preceded by the parentId and a dot '.'
 *
 * @param {object} egglement : Element to register
 * @param {string} parentId : Id of the parent element
 *
 * @return {object} : New element (cloned from egglement) with newly assigned ids
 */
export function registerEgglement (egglement, parentId) {
  let eggId = shortid.generate()
  if (parentId) eggId = parentId.concat('.', eggId)

  let newEgglement = {...egglement, id: eggId, children: []}

  if (egglement.children && egglement.children.length > 0) {
    for (let childEgg of egglement.children) {
      newEgglement.children.push(registerEgglement(childEgg, eggId))
    }
  }
  return newEgglement
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
 * Returns the element (identified by targetId) position,
 * relative to its parent (and full family depth) position
 * and the current left/top position.
 *
 * @param {object} currentNode : The element being inspected
 * @param {string} targetId : The id of the element expected
 * @param {number} currentX : Current relative left position
 * @param {number} currentY : Current relative top position
 *
 * @return {object} : Relative point obtained from the currentX, currentY
 */
export function getRelativePoint (currentNode, targetId, currentX, currentY) {
  if (currentNode.id === targetId) return {left: currentX, top: currentY}

  if (currentNode.left && currentNode.top) {
    currentX -= currentNode.left
    currentY -= currentNode.top
  }
  for (let child of currentNode.children) {
    if (targetId.indexOf(child.id) !== -1) {
      return getRelativePoint(child, targetId, currentX, currentY)
    }
  }
}
