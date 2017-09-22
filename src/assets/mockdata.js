const MockData = {
  'components': [
    {
      'id': 10,
      'name': 'Toolbar',
      'type': 'md-toolbar',
      'container': true,
      'egg': true,
      'x': 0,
      'y': 0,
      'width': 1024,
      'minWidth': 600,
      'height': 48,
      'minHeight': 48,
      'props': {},
      'classes': [
        {
          'md-dense': true
        }
      ],
      'children': [
        {
          'id': 0,
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
              'id': 0,
              'type': 'md-icon',
              'text': 'menu'
            }
          ]
        }, {
          'id': 1,
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
    },
    {
      'id': 11,
      'name': 'whiteframe',
      'type': 'md-whiteframe',
      'container': true,
      'egg': true,
      'width': 150,
      'minWidth': 32,
      'height': 150,
      'minHeight': 32,
      'props': {},
      'styles': {
        'zIndex': 'auto'
      },
      'classes': []
    },
    {
      'id': 0,
      'name': 'Button',
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
      'id': 1,
      'name': 'Input',
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
          'id': 1,
          'type': 'label',
          'text': 'Placeholder',
          'classes': []
        }, {
          'id': 0,
          'type': 'md-input',
          'props': {
            'value': 'Input'
          },
          'classes': []
        }
      ]
    }, {
      'id': 12,
      'name': '(Vuetify) Button',
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
      'id': 0,
      'name': '(Vuetify) Input',
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
