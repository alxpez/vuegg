/**
 * Returns an array of HTML elements located under the point specified by x, y.
 * If the native elementsFromPoint function does not exist, a polyfill will be used.
 *
 * @param  {number} x : X position
 * @param  {number} y : Y position
 * @return {array} : Array of the elements under the point (x, y)
 */
export default function elementsFromPoint (x, y) {
  return (document.elementsFromPoint) ? document.elementsFromPoint(x, y) : elementsFromPointPolyfill(x, y)
}

/**
 * Polyfill that covers the functionality of the native document.elementsFromPoint
 * function, in case that the browser does not support it.
 *
 * @param  {number} x : X position
 * @param  {number} y : Y position
 * @return {array} : Array of the elements under the point (x, y)
 */
function elementsFromPointPolyfill (x, y) {
  var parents = []
  var parent = void 0
  do {
    if (parent !== document.elementFromPoint(x, y)) {
      parent = document.elementFromPoint(x, y)
      parents.push(parent)
      parent.style.pointerEvents = 'none'
    } else {
      parent = false
    }
  } while (parent)
  parents.forEach(function (parent) {
    return (parent.style.pointerEvents = 'all')
  })
  return parents
}
