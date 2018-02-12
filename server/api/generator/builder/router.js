const path = require('path')
const shell = require('shelljs')
const S = require('string')

/**
 * Given the project's content definition, copies the router file template,
 * and replaces the placeholders with the information of the project's pages.
 * @constructor
 *
 * @param {object} content : Definition of the project to be generated
 * @param {string} targetDir : Folder to host the generated project for the given content
 */
async function _routerBuilder (content, targetDir) {
  const templateFile = path.resolve(targetDir,'templates','router','index.js')
  const targetFile = path.resolve(targetDir,'src','router','index.js')

  try {
    await shell.cp(templateFile, targetFile)
  } catch (e) {
    log.error('\n > Could not copy ' + targetFile);
  }

  let imports = ""
  let declarations = ""

  for (const page of content.pages) {
    const pageName = S(page.name).stripPunctuation().camelize().titleCase().s

    imports += "\nimport " + pageName + " from '@/pages/" + pageName + "'"

    declarations += "\n" + S(' ').times(4).s
      + "{ path: '" + page.path
      + "', name: '" + page.name
      + "', component: " + pageName + " },"
  }
  declarations = S(declarations).stripRight(',').s

  shell.sed('-i', '{{PAGES_IMPORTS}}', imports, targetFile)
  shell.sed('-i', '{{ROUTES_DECLARATIONS}}', declarations, targetFile)
}

module.exports = _routerBuilder
