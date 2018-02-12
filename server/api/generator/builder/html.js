const S = require('string')

/**
 * Given an egglement definition, creates a single String with the element as
 * a HTML-tag, its properties and nested children (by recursive calling).
 * If the egglement is a componegg, its props and children won't be parsed.
 * @constructor
 *
 * @param {object} el : Element from which tag/props will be gathered
 * @param {number} level : Level of indentation of the element
 *
 * @return {string} : HTML tags definitions for the provided element (and its children)
 */
function _htmlBuilder (el, level) {
  const className = el.id.substr(el.id.lastIndexOf(".") + 1)

  let elDef = ""
  let elTag = el.type
  let elProps = {'class': S(className).replaceAll('.', '-').s + _parseBooleanPropsToString(el.classes)}

  if (el.global) {
    elTag = S(el.name).humanize().slugify().s
  } else {
    if (el.text && !S(el.text).isEmpty()){
      elDef += el.text
    }
    if (el.children && el.children.length > 0) {
      for (const child of el.children){
        elDef += _htmlBuilder(child, level+1) + "\n" + S(' ').times(level*2).s
      }
    }

    for (attr in el.attrs) {
      if ((typeof el.attrs[attr] !== 'boolean') || ((typeof el.attrs[attr] === 'boolean') && (el.attrs[attr] === true))) {
        elProps[attr] = el.attrs[attr]
      }
    }
  }
  return "\n" + S(' ').times((level)*2).s + S(elDef).wrapHTML(elTag, elProps).replaceAll('="true"', '').s
}

module.exports = _htmlBuilder


function _parseBooleanPropsToString (propList) {
  let parsedString = ''
  for (prop in propList) {
    if (propList[prop] === true) parsedString += ' ' + prop
  }
  return parsedString
}
