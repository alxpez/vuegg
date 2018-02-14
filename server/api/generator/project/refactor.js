const path = require('path')
const shell = require('shelljs')
const S = require('string')

/**
 * Finishes the replacement of the project title in README.md, package.json, index.html
 * and removes the /templates folder from the generated project folder.
 * @constructor
 *
 * @param {object} content : Definition of the project generated
 * @param {string} targetDir : Folder that hosts the generated project for the given content
 */
async function _refactor (content, targetDir) {
  const readmeFile = path.resolve(targetDir, 'README.md')
  const indexFile = path.resolve(targetDir, 'index.html')
  const packageFile = path.resolve(targetDir, 'package.json')
  const mainFile = path.resolve(targetDir, 'src', 'main.js')

  shell.sed('-i', '{{PROJECT_TITLE}}', content.title, readmeFile)
  shell.sed('-i', '{{PROJECT_TITLE}}', content.title, indexFile)
  shell.sed('-i', '{{PROJECT_NAME}}', S(content.title).slugify().s, packageFile)

  let dependencies = ''
  let packagesImports = ''
  let indexStyleImports = ''
  let indexScriptImports = ''
  let packagesUse = ''

  let uniqueDependencies = []
  for (let component of content.components) {
    if (component.dependencies) {
      for (let dependency of component.dependencies) {
        if (uniqueDependencies.findIndex(dep => dep.name === dependency.name) === -1) {
          uniqueDependencies.push(dependency)
        }
      }
    }
  }

  for (let dependency of uniqueDependencies) {
    dependencies += '\n' + S(' ').times(4).s + '"' + dependency.name + '": "' + dependency.version + '",'

    for (let packImport of dependency.imports) {
      if (typeof packImport === 'string') {
        if (packImport.indexOf('//') !== -1){
          packImport.indexOf('css')
            ? indexStyleImports += '\n' + S(' ').times(4).s + '<link rel="stylesheet" href="' + packImport + '" type="text/css">'
            : indexScriptImports += '\n' + S(' ').times(4).s + '<script src="' + packImport + '"></script>'
        } else {
          packagesImports += "import '" + packImport + "'\n"
        }
      } else {
        packagesImports += "import " + packImport[0] + " from '" + packImport[1] + "'\n"
        packagesUse += "Vue.use(" + packImport[0] + ")\n"
      }
    }
  }

  shell.sed('-i', '{{STYLE_IMPORTS}}', indexStyleImports, indexFile)
  shell.sed('-i', '{{SCRIPT_IMPORTS}}', indexScriptImports, indexFile)
  shell.sed('-i', '{{DEPENDENCIES}}', dependencies, packageFile)
  shell.sed('-i', '{{PACKAGES_IMPORTS}}', packagesImports, mainFile)
  shell.sed('-i', '{{PACKAGES_USE}}', packagesUse, mainFile)

  try {
    await shell.rm('-rf', path.resolve(targetDir, '.git'))
  } catch (e) {
    log.error('\n > Could not remove ' + path.resolve(targetDir, '.git'))
  }

  try {
    await shell.rm('-rf', path.resolve(targetDir,'templates'))
  } catch (e) {
    log.error('\n > Could not remove ' + path.resolve(targetDir,'templates'))
  }
}

module.exports = _refactor
