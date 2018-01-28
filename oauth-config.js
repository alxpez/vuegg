const inquirer = require('inquirer')
const shell = require('shelljs')

require('dotenv').config()

const setupQuestions = [
  {
    type: 'list',
    name: 'runScript',
    message: 'What to run, yo?!',
    choices: [
      'client',
      'server',
      'start',
      'vuegg'
    ]
  }
]

inquirer.prompt(setupQuestions).then(answers => {
  const execCommand = 'CLIENT_ID='.concat(process.env.CLIENT_ID)
    .concat(' CLIENT_SECRET=').concat(process.env.CLIENT_SECRET)
    .concat(' CALLBACK_URL=').concat(process.env.CALLBACK_URL)
    .concat(' npm run ').concat(answers.runScript)

  shell.exec(execCommand)
})
