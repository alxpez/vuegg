const path = require('path')
const shell = require('shelljs')
const S = require('string')

const htmlBuilder = require('./html')
const cssBuilder = require('./css')

/**
 * Given a file definition (page or component), copies the vue file template,
 * and replaces the placeholders with the information of the file.
 *
 * Generates nested components by recursive calls to the constructor function.
 * @constructor
 *
 * @param {object} file : Definition of vue file to be generated
 * @param {object} componentRefs : Array of global componentReferences used in the project
 * @param {string} targetDir : Folder to host the generated project for the given content
 */
async function _vueBuilder (file, componentRefs, targetDir) {
  const fileName = S(file.name).stripPunctuation().camelize().titleCase().s
  const fileType = file.componegg ? 'components' : 'pages'

  const templateFile = path.resolve(targetDir,'templates','vue','default.vue')
  const targetFile = path.resolve(targetDir,'src', fileType, fileName + '.vue')

  try {
    await shell.cp(templateFile, targetFile)
  } catch (e) {
    log.error('\n > Could not copy ' + targetFile);
  }

  let children = ""
  let styles = ""
  let imports = ""
  let declarations = ""

  if (file.text) children += file.text
  styles += cssBuilder(file, true)

  for (const childEl of file.children) {
    children += htmlBuilder(childEl, 1)
    styles += cssBuilder(childEl)
  }

  for (const component of _getAllGlobalComponents(file, [])) {
    let compName = S(component.name).stripPunctuation().camelize().titleCase().s
    let compImport = "\nimport " + compName + " from '@/components/" + compName + "'"

    if(!S(imports).contains(compImport)) {
      let compPath = path.resolve(targetDir,'src/components/', compName + '.vue')
      let componentRef = _getComponentRef(componentRefs, component.name)

      if(!shell.test('-e', compPath)) {
        _vueBuilder({...component, ...componentRef, id: component.id}, componentRefs, targetDir)
      }

      imports += compImport
      declarations += compName + ", "
    }
  }

  if (declarations !== ''){
    imports += '\n'
    declarations = S(declarations).ensureLeft(',\n  components: { ').stripRight(', ').ensureRight(' }').s
  }

  shell.sed('-i', '{{PARENT_TAG}}', file.type || 'div', targetFile)
  shell.sed('-i', '{{VUEGG_ID}}', S(file.id).replaceAll('.', '-').s, targetFile)
  shell.sed('-i', '{{VUEGG_ATTRS}}', _getFormattedAttrs(file.attrs), targetFile)
  shell.sed('-i', '{{VUEGG_NAME}}', S(file.name).humanize().slugify().s, targetFile)
  shell.sed('-i', '{{VUEGG_CHILDREN}}', children, targetFile)
  shell.sed('-i', '{{COMPONENTS_IMPORTS}}', imports, targetFile)
  shell.sed('-i', '{{COMPONENTS_DECLARATIONS}}', declarations, targetFile)
  shell.sed('-i', '{{VUEGG_STYLES}}', styles, targetFile)
}

module.exports = _vueBuilder

// ------------------------ //
// --- HELPER FUNCTIONS --- //
// ------------------------ //

function _getAllGlobalComponents (file, collection) {
  if (file.children && file.children.length > 0) {
    for (let el of file.children) {
      if (el.componegg && el.global && (collection.indexOf(comp => comp.name === el.name) === -1)) {
        collection.push(el)
      }
      collection = _getAllGlobalComponents (el, collection)
    }
  }
  return collection
}

function _getComponentRef (components, componentName) {
  return components[components.findIndex(comp => comp.name === componentName)]
}

function _getFormattedAttrs (attrs) {
  let formattedAttrs = ''
  if (attrs) {
    for (attr in attrs) {
      if ((typeof attrs[attr] !== 'boolean')) {
        formattedAttrs += ' ' + attr + '=' + attrs[attr]
      } else if ((typeof attrs[attr] === 'boolean') && (attrs[attr] === true)) {
        formattedAttrs += ' ' + attr
      }
    }
  }
  return formattedAttrs
}
