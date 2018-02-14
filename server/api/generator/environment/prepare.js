const path = require('path')
const shell = require('shelljs')
const Git = require("nodegit");

/**
 * Prepares the environment and clones the scaffold-project for the generation tasks.
 * Checks if the /tmp folder exists on vuegg-server root (creates it if not),
 * adds a new folder for the project that will be generated (based on the content)
 * clones a scaffold project inside the targetDir and returns its full location.
 * @constructor
 *
 * @param {object} content : Definition of the project to be generated
 * @param {string} rootDir : Root folder of vuegg-server
 *
 * @return {string} : Folder that will host the generated app for the given content
 */
async function _prepare (content, rootDir) {
  const tmpDir = path.resolve(rootDir, 'tmp')
  const targetDir = path.resolve(tmpDir, content.id)

  try {
    if (!shell.test('-e', tmpDir)) {
      await shell.mkdir('-p', tmpDir)
    }

    if (shell.test('-e', targetDir)) {
      await shell.rm('-rf', targetDir)
    }
    await shell.mkdir('-p', targetDir)

  } catch (e) {
    console.error('\n> Crap, something crashed during the folder creation...\n' + e)
    process.exit(1)
  }

  let repo = 'https://github.com/vuegg/vuegg-scaffold.git'

  try {
    await Git.Clone(repo, targetDir)
  } catch (e) {
    console.error('\n> Ups! Could not complete the scaffolding...\n' + e)
  }

  return targetDir
}

module.exports = _prepare
