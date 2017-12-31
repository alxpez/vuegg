import shortid from 'shortid'
import newPage from './pageBuilder'

function newProject (title) {
  return {
    id: shortid.generate(),
    title: title,
    components: [],
    pages: [newPage('Home', '/')]
  }
}

export default newProject
