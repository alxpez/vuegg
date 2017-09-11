const MockData = {
  'components': [
    {
      'id': 1,
      'name': 'button',
      'type': 'md-button',
      'x': 100,
      'y': 150,
      'width': 200,
      'minWidth': 88,
      'height': 50,
      'minHeight': 32,
      'colorClass': {
        'md-primary': true,
        'md-accent': false,
        'md-warn': false
      },
      'depthClass': {
        'md-raised': true
      },
      'shapeClass': {
        'md-dense': true
      },
      'props': {
        'disabled': false
      }
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
        'placeholder': 'Input',
        'disabled': true
      }
    }
  ]
}

export default MockData
