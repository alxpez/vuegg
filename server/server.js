const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const body = require('koa-body')
const logger = require('koa-logger')
const historyFallback = require('koa2-history-api-fallback')
const router = require('koa-router')({ prefix: '/api' })
const static = require('koa-static')(path.resolve(__dirname, '..', 'client','dist'))

const auth = require('./auth')
const generator = require('./api/generator')
const github = require('./api/github')

const PORT = process.env.PORT || 5000
const ROOT_DIR = (process.env.NODE_ENV === 'production') ? '/' : __dirname

const app = new Koa()

// Routes definition
router.post('/get-access-token', getAccessToken)
router.post('/save-vuegg-project', saveVueggProject)
router.get('/get-vuegg-project', getVueggProject)
router.post('/generate', generate)

// Middleware
app.use(body())
app.use(logger())
app.use(historyFallback())
app.use(static)
app.use(router.routes())
app.use(router.allowedMethods())

// Start server
app.listen(PORT)
console.log('* vuegg-server started on port %s', PORT)
console.log('* Output directory: %s', ROOT_DIR)


// --------- AUTH METHODS --------- //

/**
 * [getAccessToken description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
async function getAccessToken (ctx) {
  try {
    let resp = await auth.getAccessToken(ctx.request.body)
    ctx.response.status = 200
    ctx.response.type = 'text/plain'
    ctx.response.body = resp
  } catch (e) {
    console.error('\n> Could not obtain token\n' + e)
    process.exit(1)
  }
}

// --------- API METHODS --------- //

/**
 * Saves a vuegg project file in Github
 *
 * @param {object} ctx : KoaContext object
 * @param {object} ctx.request.body : Body of the POST request
 *
 * @see {@link http://koajs.com/#context|Koa Context}
 */
async function saveVueggProject (ctx) {
  try {
    let resp = await github.saveVueggProject(ctx.request.body)
    if (resp) {
      ctx.response.status = 200
      ctx.response.body = resp
      ctx.response.type = 'text/plain'
    }
  } catch (e) {
    console.error('\n> Could not save the project definition\n' + e)
    process.exit(1)
  }
}

/**
 * Retrieves a vuegg project file from Github
 *
 * @param {object} ctx : KoaContext object
 * @param {object} ctx.request.body : Body of the POST request
 *
 * @see {@link http://koajs.com/#context|Koa Context}
 */
async function getVueggProject (ctx) {
  let params = ctx.request.query
  try {
    let resp = await github.getContent(params.owner, params.repo, 'vue.gg', params.token)
    if (resp) {
      ctx.response.status = 200
      ctx.response.body = resp
      ctx.response.type = 'application/json'
    }
  } catch (e) {
    console.error('\n> Could not fetch the project definition\n' + e)
    process.exit(1)
  }
}

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
  try {
    let zipFile = await generator(ctx.request.body, ROOT_DIR)
    if (zipFile) {
      console.log('> Download -> ' + zipFile)
      ctx.response.status = 200
      ctx.response.type = 'zip'
      ctx.response.body = fs.createReadStream(zipFile)
    }
  } catch (e) {
    console.error('\n> Could not complete the project generation...\n' + e)
    process.exit(1)
  }
}
