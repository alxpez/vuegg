/**
 * Fixes the properties (top, left, height, width) of an element,
 * based on the parent container
 *
 * @param {object} element : The element to which fix its props
 * @param {object} parent : Parent element of the 'element'
 * @return {object} : Object with clean/fixed top, left, height, width properties for the element
 */
export function fixElementToParentBounds (element, parent) {
  const parentH = getComputedProp('height', parent)
  const parentW = getComputedProp('width', parent)

  let height = getComputedProp('height', element, parent)
  let width = getComputedProp('width', element, parent)
  let top = element.top
  let left = element.left

  // Checks if position + size gets out-of-bounds (TOO FAR), if so, reposition...
  if ((top + height) > parentH) {
    top -= (top + height) - parentH
  }
  if ((left + width) > parentW) {
    left -= (left + width) - parentW
  }

  // Checks if position is out-of-bounds (NEGATIVE), if so reposition...
  if (top <= 0) top = 0
  if (left <= 0) left = 0

  // Checks if, with a 0 position, the element is still out-of-bounds (TOO BIG), if so, resize
  if (top === 0 && (height > parentH)) height = parentH
  if (left === 0 && (width > parentW)) width = parentW

  return {left, top, height, width}
}

/**
 * Calculates the computed prop of an element,
 * based on its own props and the parent props.
 *
 * (Specially created to deal with percentage dimensions)
 *
 * @param {object} element : The element to get the dimension for
 * @param {object} parent : The parent element of the 'element'
 * @param {string} prop : Property for which to extract the dimension (height/width)
 * @return {number} : The real dimension for the element (height/width)
 */
export function getComputedProp (prop, element, parent) {
  if (prop === 'left' || prop === 'right' || prop === 'top' || prop === 'bottom') {
    return parseInt(window.getComputedStyle(document.getElementById(element.id).parentNode)[prop])
  } else {
    return (
      (!parent)
        ? parseInt(window.getComputedStyle(document.getElementById(element.id))[prop])
        : (typeof element[prop] !== 'string')
          ? element[prop]
          : (typeof parent[prop] !== 'string')
            ? parent[prop] * parseInt(element[prop]) / 100
            : parseInt(window.getComputedStyle(document.getElementById(parent.id))[prop]) * parseInt(element[prop]) / 100
    )
  }
}
