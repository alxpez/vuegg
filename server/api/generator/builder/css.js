const S = require('string')

/**
 * Given an element definition, extracts the css/styles from that element
 * and its children (by recursive calling) and contatenates them on a sigle String object.
 * If the el is a componegg, its children won't be parsed.
 * @constructor
 *
 * @param {object} el : Element from which the style definitions will be gathered
 *
 * @return {string} : Style definitions for the provided element (and its children)
 */
function _cssBuilder (el, isRoot) {
  if ((!isRoot || !el.egglement) && (!el.styles || Object.keys(el.styles).length === 0)) return ''

  const selector = isRoot ? '#' : '.'
  const className = el.id.substr(el.id.lastIndexOf(".") + 1)

  let styleDef = ''
  let fullStyle = {}

  if (isRoot) {
    fullStyle = buildRoot(el)
  } else {
    fullStyle = buildNested(el)

    if (el.children && el.children.length > 0 && !el.global) {
      for (const child of el.children){
        styleDef += _cssBuilder(child)
      }
    }
  }


  styleDef += '\n' + selector + S(className).replaceAll('.', '-').s + ' '
    + S(JSON.stringify(fullStyle, null, 2)).replaceAll('\n}',';\n}').s + '\n'

  return S(styleDef).replaceAll('\\"', '\'').replaceAll('"', '').replaceAll(',\n', ';\n').s
}

module.exports = _cssBuilder

/**
 * Creates the CSS for the root element
 */
function buildRoot (el) {
  let rootCSS = el.styles

  if (typeof el.width !== 'undefined' && el.width !== null) {
    rootCSS = {...rootCSS, width: isNaN(el.width) ? el.width : (el.width + 'px')}
  }
  if (typeof el.height !== 'undefined' && el.height !== null) {
    rootCSS = {...rootCSS, height: isNaN(el.height) ? el.height : (el.height + 'px')}
  }

  return rootCSS
}

/**
 * Creates the CSS definition for a nested element
 */
function buildNested (el) {
  let nestedCSS = el.egglement ? {...el.styles, position: 'absolute'} : el.styles

  if (typeof el.width !== 'undefined' && el.width !== null && el.width !== 'auto') {
    nestedCSS = {...nestedCSS, width: isNaN(el.width) ? el.width : (el.width + 'px')}
  }
  if (typeof el.height !== 'undefined' && el.height !== null && el.height !== 'auto') {
    nestedCSS = {...nestedCSS, height: isNaN(el.height) ? el.height : (el.height + 'px')}
  }
  if (typeof el.top !== 'undefined' && el.top !== null && el.top !== 'auto') {
    nestedCSS = {...nestedCSS, top: isNaN(el.top) ? el.top : (el.top + 'px')}
  }
  if (typeof el.left !== 'undefined' && el.left !== null && el.left !== 'auto') {
    nestedCSS = {...nestedCSS, left: isNaN(el.left) ? el.left : (el.left + 'px')}
  }
  if (typeof el.bottom !== 'undefined' && el.bottom !== null && el.bottom !== 'auto') {
    nestedCSS = {...nestedCSS, bottom: isNaN(el.bottom) ? el.bottom : (el.bottom + 'px')}
  }
  if (typeof el.right !== 'undefined' && el.right !== null && el.right !== 'auto') {
    nestedCSS = {...nestedCSS, right: isNaN(el.right) ? el.right : (el.right + 'px')}
  }
  if (typeof el.zIndex !== 'undefined' && el.zIndex !== null && el.zIndex !== 'auto') {
    nestedCSS = {...nestedCSS, 'z-index': el.zIndex}
  }

  /*
  * Tweak to apply the capability of defining the element dimension using
  * left/right (instead of width) for elements other than <div> or <span>**
  *
  * Depending on the browser this is not necessary but it will apply to be safe
  *
  * **(any other text element will take the dimensions properly, but only span is being used in vuegg)
  */
  if (el.type !== 'div' || el.type !== 'span') {
    if (isNaN(el.width) &&
        (typeof el.right !== 'undefined' && el.right !== null && el.right !== 'auto') &&
        (typeof el.left !== 'undefined' && el.left !== null && el.left !== 'auto')) {
      const hHigh = Math.max(parseInt(el.left), parseInt(el.right))
      let left = isNaN(el.left) ? el.left : (el.left + 'px')
      let right = isNaN(el.right) ? el.right : (el.right + 'px')
      nestedCSS = {...nestedCSS, width: 'calc(100% - ' + left + ' - ' + right + ')'}
      nestedCSS = (hHigh === parseInt(el.left))
        ? {...nestedCSS, left, right: 'auto'}
        : {...nestedCSS, right, left: 'auto'}
    }
  }

  /*
  * Tweak to apply the capability of defining the element dimension using
  * top/bottom (instead of height), for <img> elements (there may be others)
  *
  * Depending on the browser this is not necessary but it will apply to be safe
  */
  if (el.type === 'img') {
    if (isNaN(el.height) &&
        (typeof el.top !== 'undefined' && el.top !== null && el.top !== 'auto') &&
        (typeof el.bottom !== 'undefined' && el.bottom !== null && el.bottom !== 'auto')) {
      const vHigh = Math.max(parseInt(el.top), parseInt(el.bottom))
      let top = isNaN(el.top) ? el.top : (el.top + 'px')
      let bottom = isNaN(el.bottom) ? el.bottom : (el.bottom + 'px')
      nestedCSS = {...nestedCSS, height: 'calc(100% - ' + top + ' - ' + bottom + ')'}
      nestedCSS = (vHigh === parseInt(el.top))
        ? {...nestedCSS, top, bottom: 'auto'}
        : {...nestedCSS, bottom, top: 'auto'}
    }
  }

  return el.global ? nestedCSS : {...nestedCSS, ...el.styles}
}
