const MockData = {
  'components': [
    {
      'id': 0,
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
      },
      'children': [
        {
          'id': 0,
          'text': 'Button'
        }
      ]
    }, {
      'id': 1,
      'name': 'input',
      'type': 'md-input',
      'x': 100,
      'y': 150,
      'width': 200,
      'height': 50,
      'props': {
        'value': 'Input data',
        'placeholder': 'Input prompt',
        'disabled': false
      },
      'parent': {
        'type': 'md-input-container',
        'props': {
          'md-inline': false,
          'md-has-password': false,
          'md-clearable': false
        }
      },
      'sibilings': [
        {
          'id': 0,
          'type': 'label',
          'children': [
            {
              'id': 0,
              'text': 'Material placeholder'
            }
          ]
        }
      ]
    }
  ]
}

export default MockData
