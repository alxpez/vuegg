// TODO: change x, y props for left, top (to be more accurate on location)... or not, think about it
const MockData = {
  'elements': [
    {
      'name': 'Div',
      'type': 'div',
      'egg': true,
      'classes': [
        {
          'containegg': true
        }
      ],
      'children': []
    }, {
      'name': 'Link',
      'type': 'a',
      'text': 'Link',
      'egg': true,
      'width': 200,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'props': {},
      'styles': {
        'color': 'inherited',
        'text-decoration': 'underline',
        'cursor': 'auto'
      },
      'classes': []
    }, {
      'name': 'Input',
      'type': 'input',
      'egg': true,
      'width': 300,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'props': {
        'placeholder': 'Input prompt'
      },
      'styles': {
        'border-style': 'inset',
        'background-color': 'white',
        'color': 'initial'
      },
      'classes': []
    }, {
      'name': 'Button',
      'type': 'button',
      'text': 'Button',
      'egg': true,
      'width': 200,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'props': {},
      'styles': {},
      'classes': []
    }
  ],
  'components': [
    {
      'name': '(VM) Whiteframe',
      'type': 'md-whiteframe',
      'egg': true,
      'width': 300,
      'minWidth': 32,
      'height': 300,
      'minHeight': 32,
      'props': {},
      'styles': {
        'zIndex': 'auto'
      },
      'classes': [
        {
          'containegg': true
        }
      ],
      'children': []
    }, {
      'name': '(VM) Toolbar',
      'type': 'md-toolbar',
      'egg': true,
      'x': 0,
      'y': 0,
      'width': 1024,
      'minWidth': 150,
      'height': 48,
      'minHeight': 48,
      'props': {},
      'classes': [
        {
          'containegg': true
        }, {
          'md-dense': true
        }
      ],
      'children': [
        {
          'type': 'md-button',
          'egg': true,
          'x': 10,
          'y': 2,
          'width': 40,
          'minWidth': 40,
          'height': 40,
          'minHeight': 40,
          'classes': [
            {
              'md-icon-button': true
            }
          ],
          'children': [
            {
              'type': 'md-icon',
              'text': 'menu'
            }
          ]
        }, {
          'type': 'h2',
          'egg': true,
          'text': 'Title',
          'x': 60,
          'y': 12,
          'width': 60,
          'minWidth': 60,
          'height': 24,
          'minHeight': 24,
          'styles': {
            'flex': 1
          },
          'classes': [
            {
              'md-title': true
            }
          ]
        }
      ]
    }, {
      'name': '(VM) Button',
      'type': 'md-button',
      'text': 'Button',
      'egg': true,
      'x': 100,
      'y': 150,
      'width': 150,
      'minWidth': 88,
      'height': 36,
      'minHeight': 32,
      'props': {},
      'classes': [
        {
          'md-primary': true
        }, {
          'md-raised': true
        }, {
          'md-dense': true
        }
      ]
    }, {
      'name': '(VM) Input',
      'type': 'md-input-container',
      'egg': true,
      'x': 100,
      'y': 150,
      'width': 150,
      'minWidth': 110,
      'height': 48,
      'minHeight': 48,
      'props': {},
      'classes': [],
      'children': [
        {
          'type': 'label',
          'text': 'Placeholder',
          'classes': []
        }, {
          'type': 'md-input',
          'props': {
            'value': 'Input'
          },
          'classes': []
        }
      ]
    }, {
      'name': '(VM) Chip',
      'type': 'md-chip',
      'egg': true,
      'text': 'Single chip',
      'width': 150,
      'minWidth': 32,
      'height': 32,
      'minHeight': 32,
      'props': {
        'md-deletable': true
      },
      'styles': {},
      'classes': []
    }, {
      'name': 'TEST whiteframe',
      'type': 'md-whiteframe',
      'egg': true,
      'width': 300,
      'minWidth': 32,
      'height': 300,
      'minHeight': 32,
      'props': {},
      'styles': {
        'zIndex': 'auto'
      },
      'classes': [
        {
          'containegg': true
        }
      ],
      'children': [
        {
          'type': 'md-whiteframe',
          'egg': true,
          'width': 200,
          'minWidth': 32,
          'height': 200,
          'minHeight': 32,
          'props': {},
          'styles': {
            'zIndex': 'auto'
          },
          'classes': [
            {
              'containegg': true
            }
          ],
          'children': [
            {
              'type': 'md-whiteframe',
              'egg': true,
              'width': 150,
              'minWidth': 32,
              'height': 150,
              'minHeight': 32,
              'props': {},
              'styles': {
                'zIndex': 'auto'
              },
              'classes': [
                {
                  'containegg': true
                }
              ],
              'children': [
                {
                  'name': 'Button',
                  'type': 'md-button',
                  'text': 'Button',
                  'egg': true,
                  'width': 150,
                  'minWidth': 88,
                  'height': 36,
                  'minHeight': 32,
                  'props': {},
                  'classes': [
                    {
                      'md-primary': true
                    }, {
                      'md-raised': true
                    }, {
                      'md-dense': true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }, {
      'name': '(VTF) Button',
      'type': 'v-btn',
      'text': 'V Button',
      'egg': true,
      'width': 150,
      'minWidth': 88,
      'height': 36,
      'minHeight': 32,
      'props': {},
      'classes': []
    }, {
      'name': '(VTF) Input',
      'type': 'v-text-field',
      'egg': true,
      'x': 100,
      'y': 150,
      'width': 150,
      'minWidth': 90,
      'height': 50,
      'minHeight': 50,
      'props': {
        'label': 'Placeholder',
        'value': 'V Input',
        'light': true
      },
      'classes': []
    }
  ]
}

export default MockData
