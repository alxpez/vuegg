const MockData = {
  'components': [
    {
      'id': 1,
      'name': 'button',
      'type': 'md-button',
      'x': 100,
      'y': 150,
      'width': 200,
      'height': 50,
      'colorClass': '',
      'colorClassesOpt': ['', 'md-primary', 'md-accent', 'md-warn'],
      'depthClass': '',
      'depthClassesOpt': ['', 'md-raised']
    }, {
      'id': 2,
      'name': 'input',
      'type': 'md-input',
      'x': 100,
      'y': 150,
      'width': 200,
      'height': 50,
      'parent': {
        'type': 'md-input-container',
        'props': {
          'md-inline': false,
          'md-has-password': true,
          'md-clearable': false
        }
      },
      'props': {
        'placeholder': 'Input'
      }
    }
  ]
}

export default MockData
