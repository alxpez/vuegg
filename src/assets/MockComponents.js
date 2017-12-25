const MockComponents = [
  {
    'name': 'Material Toolbar',
    'type': 'mdc-toolbar',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.6.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'vue-mdc-adapter/dist/vue-mdc-adapter.css'
        ]
      }
    ],
    'componegg': true,
    'height': 64,
    'width': '100%',
    'styles': {},
    'classes': {},
    'children': [
      {
        'type': 'mdc-toolbar-row',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': [
          {
            'type': 'mdc-toolbar-section',
            'attrs': {
              'align-start': true
            },
            'styles': {},
            'classes': {},
            'children': [
              {
                'type': 'mdc-toolbar-menu-icon',
                'attrs': {},
                'styles': {},
                'classes': {}
              }, {
                'type': 'mdc-toolbar-title',
                'text': 'Sweet mother of fuck',
                'attrs': {},
                'styles': {},
                'classes': {}
              }
            ]
          }, {
            'type': 'mdc-toolbar-section',
            'attrs': {
              'align-end': true
            },
            'styles': {},
            'classes': {},
            'children': [
              {
                'type': 'mdc-toolbar-icon',
                'attrs': {
                  'icon': 'help'
                },
                'styles': {},
                'classes': {}
              }
            ]
          }
        ]
      }
    ]
  },
  {
    'name': 'Search Bar',
    'type': 'div',
    'egglement': true,
    'componegg': true,
    'containegg': true,
    'width': 400,
    'height': 40,
    'styles': {},
    'classes': {},
    'children': [
      {
        'type': 'input',
        'egglement': true,
        'width': '65%',
        'minWidth': 32,
        'height': '100%',
        'minHeight': 32,
        'attrs': {
          'placeholder': 'Type your search...'
        },
        'styles': {
          'padding': 0,
          'border': 0,
          'border-bottom': '1px solid #eee',
          'background-color': 'transparent'
        },
        'classes': {}
      }, {
        'type': 'button',
        'text': 'Search',
        'egglement': true,
        'width': '30%',
        'minWidth': 32,
        'height': '100%',
        'minHeight': 32,
        'attrs': {},
        'styles': {
          'right': 0
        },
        'classes': {}
      }
    ]
  }
]

export default MockComponents
