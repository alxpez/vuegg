const path = require('path')
const shell = require('shelljs')

/**
 * Remove the target folder for the generated project after this is been archived
 * @constructor
 *
 * @param {string} targetDir : Folder that hosts the generated project (to remove)
 */
async function _cleanup (targetDir) {
  try {
    await shell.rm('-rf', targetDir)
  } catch (e) {
    log.error('\n > Could not remove ' + targetDir)
  }
}

module.exports = _cleanup
