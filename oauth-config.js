const inquirer = require('inquirer')
const shell = require('shelljs')
const dotenv = require('dotenv')

const setupQuestions = [
  {
    type: 'list',
    name: 'runScript',
    message: 'What to run, yo?!',
    choices: [
      'client',
      'server',
      new inquirer.Separator(),
      'vuegg:test'
    ]
  }
]

inquirer.prompt(setupQuestions).then(answers => {
  if (answers.runScript === 'vuegg:test') {
    dotenv.config({path: '.env.test'})
  } else {
    dotenv.config({path: '.env.dev'})
  }

  const execCommand = 'CLIENT_ID='.concat(process.env.CLIENT_ID)
    .concat(' CLIENT_SECRET=').concat(process.env.CLIENT_SECRET)
    .concat(' CALLBACK_URL=').concat(process.env.CALLBACK_URL)
    .concat(' npm run ').concat(answers.runScript)

  shell.exec(execCommand)
})
