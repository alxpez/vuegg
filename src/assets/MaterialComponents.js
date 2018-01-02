/*
  Components from external libraries (ie. vue-mdc-adapter):
  - PARENT -> external, componegg, egglement
  - CHILDREN -> (none)
 */
const MockComponents = [
  {
    'name': 'Toolbar',
    'type': 'mdc-toolbar',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.7.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.7.3/dist/vue-mdc-adapter.min.css'
        ]
      }
    ],
    'external': true,
    'componegg': true,
    'egglement': true,
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
  }
]

export default MockComponents
