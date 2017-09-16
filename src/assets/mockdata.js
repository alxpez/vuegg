const MockData = {
  'components': [
    {
      'id': 0,
      'name': 'button',
      'type': 'v-btn',
      'x': 100,
      'y': 150,
      'width': 150,
      'minWidth': 88,
      'height': 36,
      'minHeight': 32,
      'props': {
        'disabled': false
      },
      'classes': [
        {
          'yolk': true
        }, {
          'primary': true,
          'secondary': false
        }, {
          'raised': true
        }, {
          'dense': true
        }
      ],
      'children': [
        {
          'id': 0,
          'text': 'Button'
        }
      ]
    }, {
      'id': 1,
      'name': 'input',
      'type': 'md-input-container',
      'x': 100,
      'y': 150,
      'width': 150,
      'minWidth': 110,
      'height': 48,
      'minHeight': 48,
      'props': {
        'md-inline': false,
        'md-has-password': false,
        'md-clearable': false
      },
      'classes': [
        {
          'yolk': true
        }
      ],
      'children': [
        {
          'id': 1,
          'type': 'label',
          'classes': [
            {
              'yolk': false
            }
          ],
          'children': [
            {
              'id': 0,
              'text': 'Placeholder'
            }
          ]
        }, {
          'id': 0,
          'type': 'md-input',
          'props': {
            'value': 'Input data',
            'disabled': false
          },
          'classes': [
            {
              'yolk': true
            }
          ]
        }
      ]
    }, {
      'id': 0,
      'name': 'text field',
      'type': 'v-text-field',
      'x': 100,
      'y': 150,
      'width': 150,
      'minWidth': 90,
      'height': 50,
      'minHeight': 50,
      'props': {
        'label': 'Placeholder',
        'value': 'Value',
        'light': true
      },
      'classes': [
        {
          'yolk': true
        }
      ]
    }
  ]
}

export default MockData
