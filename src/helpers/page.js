import shortid from 'shortid'

// TODO: width and height should come dynamically
function newPage (id, name, path) {
  return {
    id: id || shortid.generate(),
    name: name,
    path: path,
    styles: {
      'width': '1024px',
      'height': '1000px',
      'overflow': 'hidden',
      'position': 'relative',
      'margin': 'auto',
      'background-color': '#fff'
    },
    classes: [],
    children: []
  }
}

export default newPage
