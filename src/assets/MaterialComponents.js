/*
  Components from external libraries (ie. vue-mdc-adapter):
  - PARENT -> external, componegg, egglement
  - CHILDREN -> (none)
 */
const MockComponents = [
  {
    'name': 'MDC Button',
    'type': 'mdc-button',
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
    'text': 'mdcButton',
    'height': 36,
    'width': 120,
    'attrs': {
      'raised': true,
      'unelevated': false,
      'stroked': false,
      'dense': false,
      'compact': false,
      'disabled': false
    },
    'classes': {},
    'children': []
  }, {
    'name': 'MDC Toolbar',
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
                'attrs': {
                  'event': 'toggle-drawer'
                },
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
  }, {
    'name': 'MDC Drawer',
    'type': 'mdc-drawer',
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
    'top': 65,
    'left': 0,
    'height': '100%',
    'width': 240,
    'attrs': {
      'toggle-on': 'toggle-drawer'
    },
    'styles': {},
    'classes': {},
    'children': [
      {
        'type': 'mdc-drawer-list',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': [
          {
            'type': 'mdc-drawer-item',
            'text': 'Inbox',
            'attrs': {
              'start-icon': 'inbox'
            },
            'styles': {},
            'classes': {}
          }, {
            'type': 'mdc-drawer-item',
            'text': 'Sent Mail',
            'attrs': {
              'start-icon': 'send'
            },
            'styles': {},
            'classes': {}
          }, {
            'type': 'mdc-drawer-item',
            'text': 'Drafts',
            'attrs': {
              'start-icon': 'drafts'
            },
            'styles': {},
            'classes': {}
          }
        ]
      }
    ]
  }
]

export default MockComponents
