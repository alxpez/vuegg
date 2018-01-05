const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const body = require('koa-body')
const logger = require('koa-logger')
const router = require('koa-router')({ prefix: '/api' })
const serve = require('koa-static')(path.resolve(__dirname, '..', 'client','dist'))

const generator = require('./lib/generator')

const PORT = process.env.PORT || 5000
const ROOT_DIR = (process.env.NODE_ENV === 'production') ? '/' : __dirname

const app = new Koa()

// Routes definition
router.post('/generate', generate)

// Middleware
app.use(body())
app.use(logger())
app.use(serve)
app.use(router.routes())

app.listen(PORT)
console.log('* vuegg-server started on port %s', PORT)
console.log('* Output directory: %s', ROOT_DIR);

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
