import shortid from 'shortid'

function newPage (name, path, height, width) {
  return {
    id: shortid.generate(),
    name: name,
    path: path,
    width: width || 960,
    height: height || 1000,
    styles: {
      'position': 'relative',
      'margin': 'auto',
      'background': '#ffffff',
      'overflow': 'hidden'
    },
    classes: [],
    children: []
  }
}

export default newPage
