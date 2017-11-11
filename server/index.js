const fs = require('fs')
// const os = require('os')
const path = require('path')

const Git = require('nodegit')

const Koa = require('koa')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const router = require('koa-router')({ prefix: '/api' })

const app = new Koa()

// Middleware
app.use(logger())
app.use(koaBody())
app.use(router.routes())

// Routes definition
router.get('/', root)
      .post('/generate', generate)

function root (ctx) {
  console.log('Server root')
}

async function generate (ctx) {
  let content = ctx.request.body
  console.log(content)
  console.log(content.body[0].children)

  let tmp = path.join(__dirname, '..', 'tmp/')
  let target

  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp)
  }

  try {
    target = fs.mkdtempSync(tmp)
    console.log(target)
  } catch (e) {
    console.error(e)
  }

  // Clone repository (tweak webpack template)
  Git.Clone('https://github.com/alxpez/jenking-around', target).then(
    () => {
      console.log('Repo cloned!')
      // Create sources from "content" (pages)
    }
  )

  ctx.redirect('/')
}

if (!module.parent) app.listen(3000)
