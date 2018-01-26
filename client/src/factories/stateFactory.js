import newProject from './projectFactory'

function newState (project) {
  return {
    app: {
      pageDialog: {
        isNew: true,
        isOpen: false
      },
      selectedPage: null,
      selectedElements: []
    },
    project: project || newProject('My vuegg project')
  }
}

export default newState
