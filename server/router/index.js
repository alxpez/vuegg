const fs = require('fs')
const router = require('koa-router')({ prefix: '/api' })
const generator = require('../api/generator')

// Routes definition
router.post('/generate', generate)


/**
 * Generates a full vue application from a scaffold project,
 * plus the app definition sent in the ctx.request.body
 *
 * @param {object} ctx : KoaContext object
 * @param {object} ctx.request.body : Body of the POST request
 *
 * @return {zipFile} : A zip file with the generated application should be served
 *
 * @see {@link http://koajs.com/#context|Koa Context}
 */
async function generate (ctx) {
  let zipFile = ''

  try {
    zipFile = await generator(ctx.request.body, ROOT_DIR)
  } catch (e) {
    console.error('\n> Could not complete the project generation...\n' + e)
    process.exit(1)
  }

  console.log('> Download -> ' + zipFile)
  ctx.response.type = 'zip'
  ctx.response.body = fs.createReadStream(zipFile)
}

module.exports = router
