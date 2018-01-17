import shortid from 'shortid'

function newPage (name, path, height, width) {
  return {
    id: shortid.generate(),
    name: name,
    path: path,
    width: width || 1024,
    height: height || 720,
    styles: {
      '--mdc-theme-primary': '#673ab7',
      '--mdc-theme-accent': '#f44336',
      '--mdc-theme-background': '#ffffff',
      'position': 'relative',
      'margin': 'auto',
      'background-color': '#ffffff',
      'overflow': 'hidden'
    },
    classes: [],
    children: []
  }
}

export default newPage
