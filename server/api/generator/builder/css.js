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
  if (!isRoot && !el.egglement) return ''

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
  let nestedCSS = el.egglement ? {position: 'absolute'} : {}

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
  }

  return el.global ? nestedCSS : {...nestedCSS, ...el.styles}
}

/**
 * Returns the calculated dimension based on the position and size
 */
function calcDimension (size, position) {
  return position ? 'calc(' + size + ' - ' + position + 'px)' : size
}
