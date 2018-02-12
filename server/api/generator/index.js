const path = require('path')
const ora = require('ora')

const prepare = require('./environment/prepare')
const vueBuilder = require('./builder/vue')
const routerBuilder = require('./builder/router')
const projetRefactor = require('./project/refactor')
const projetZip = require('./project/archive')
const cleanup = require('./environment/cleanup')

/**
 * Index of the project generator libraries.
 * @constructor
 *
 * @param {object} content : Definition of the project to be generated
 * @param {string} rootDir : The root folder of vuegg-server
 */
async function _generator (content, rootDir) {
  const spinner = ora({spinner: 'circleHalves'})
  let targetDir = path.resolve(rootDir, 'tmp', content.id)
  let zippedProject = path.resolve(rootDir, 'tmp', content.id + '.zip')

  try {
    spinner.start('> Getting environment ready')
    targetDir = await prepare(content, rootDir)
    spinner.succeed()
  } catch (e) {
    spinner.fail('> Oh! Shit went wrong during the preparations...\n' + e)
    process.exit(1)
  }

  console.log('> Scaffold located at -> ' + targetDir)

  try {
    spinner.start('> Building pages/components (' + content.title + ')')
    for (const page of content.pages) {
      await vueBuilder(page, content.components, targetDir)
    }
    spinner.succeed()
  } catch (e) {
    spinner.fail('> Ups! Pages/components generation failed...\n' + e)
    process.exit(1)
  }

  try {
    spinner.start('> Configuring Router')
    await routerBuilder(content, targetDir)
    spinner.succeed()
  } catch (e) {
    spinner.fail('> Ups! Router generation failed...\n' + e)
    process.exit(1)
  }

  try {
    spinner.start('> Refactoring (' + content.title + ')')
    await projetRefactor(content, targetDir)
    spinner.succeed()
  } catch (e) {
    spinner.fail('> Ups! Somethig broke during the project refactor...\n' + e)
    process.exit(1)
  }

  try {
    spinner.start('> Archiving project')
    await projetZip(content, targetDir)
    spinner.succeed()
  } catch (e) {
    spinner.fail('> Ups! Somethig broke during the zipping up...\n' + e)
    process.exit(1)
  }

  try {
    spinner.start('> Cleaning up the mess')
    await cleanup(targetDir)
    spinner.succeed()
  } catch (e) {
    spinner.fail('> Ups! Somethig broke during the cleanup...\n' + e)
    process.exit(1)
  }

  return zippedProject
}

module.exports = _generator
