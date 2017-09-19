const MockData = {
  'components': [
    {
      'id': 10,
      'name': 'Toolbar',
      'type': 'md-toolbar',
      'x': 0,
      'y': 0,
      'width': 600,
      'minWidth': 400,
      'height': 64,
      'minHeight': 48,
      'props': {},
      'classes': [
        {
          'yolk': true
        }, {
          'md-dense': true
        }
      ],
      'children': [
        {
          'id': 0,
          'type': 'md-button',
          'classes': [
            {
              'md-icon-button': true
            }
          ],
          'children': [
            {
              'id': 0,
              'type': 'md-icon',
              'children': [
                {
                  'id': 0,
                  'text': 'menu'
                }
              ]
            }
          ]
        }, {
          'id': 1,
          'type': 'h2',
          'styles': {
            'flex': 1
          },
          'classes': [
            {
              'md-title': true
            }
          ],
          'children': [
            {
              'id': 0,
              'text': 'Title'
            }
          ]
        }
      ]
    },
    {
      'id': 11,
      'name': 'whiteframe',
      'type': 'md-whiteframe',
      'width': 150,
      'minWidth': 32,
      'height': 150,
      'minHeight': 32,
      'props': {},
      'classes': [
        {
          'yolk': true
        }
      ]
    },
    {
      'id': 0,
      'name': 'Button',
      'type': 'md-button',
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
          'md-primary': true,
          'md-secondary': false
        }, {
          'md-raised': true
        }, {
          'md-dense': true
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
      'name': 'Input',
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
      'id': 12,
      'name': '(Vuetify) Button',
      'type': 'v-btn',
      'width': 150,
      'minWidth': 88,
      'height': 36,
      'minHeight': 32,
      'props': {},
      'classes': [
        {
          'yolk': true
        }
      ]
    }, {
      'id': 0,
      'name': '(Vuetify) Input',
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
