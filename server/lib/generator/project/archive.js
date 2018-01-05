const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const S = require('string')

/**
 * Archives the contens of the project located at
 * targetDir into a zip-file (writeStream)
 * @constructor
 *
 * @param {object} content : Definition of the project generated
 * @param {string} targetDir : Folder that hosts the generated project
 */
async function _archive (content, targetDir) {
  const output = fs.createWriteStream(path.resolve(targetDir, '..', content.id + '.zip'))
  const archive = archiver('zip', { zlib: { level: 9 } })

  // output eventHandlers
  output.on('close', () => console.log('> Archived: ' + archive.pointer() + ' total bytes'))
  output.on('end', () => console.log('Data has been drained'))

  // archive eventHandlers
  archive.on('error', (err) => { throw err })
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err)
    } else {
      throw err
    }
  })

  // pipe archive data to the file
  archive.pipe(output)

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(targetDir, false)

  // finalize the archive (done appending files but streams have to finish yet)
  await archive.finalize()
}

module.exports = _archive
