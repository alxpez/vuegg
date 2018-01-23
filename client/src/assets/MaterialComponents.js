/*
  Components from external libraries (ie. vue-mdc-adapter):
  - PARENT -> external, componegg, egglement
  - CHILDREN -> (none)
 */
const MockComponents = [

  // --- BUTTON --- //
  {
    'name': 'mdcButtonComp',
    'displayName': 'Button',
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
    'minHeight': 32,
    'minWidth': 64,
    'attrs': {
      'baseline': false,
      'raised': true,
      'unelevated': false,
      'stroked': false,
      'disabled': false,
      'accent': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- CHECKBOX --- //
  {
    'name': 'mdcCheckboxComp',
    'displayName': 'Checkbox',
    'type': 'mdc-checkbox',
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
    'height': 40,
    'width': 155,
    'minHeight': 32,
    'minWidth': 32,
    'attrs': {
      'label': 'MDC Checkbox',
      'indeterminate': true,
      'disabled': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- DRAWER --- //
  {
    'name': 'mdcDrawerComp',
    'displayName': 'Drawer',
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
    'top': 0,
    'left': 0,
    'height': '100%',
    'width': 240,
    'attrs': {
      'toolbar-spacer': true,
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
  },

  // --- FLOATING ACTION BUTTON --- //
  {
    'name': 'mdcFABComp',
    'displayName': 'FAB',
    'type': 'mdc-fab',
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
    'height': 56,
    'width': 56,
    'minHeight': 40,
    'minWidth': 40,
    'attrs': {
      'icon': 'add'
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- LINEAR PROGRESS --- //
  {
    'name': 'mdcLinearProgressComp',
    'displayName': 'LProgress',
    'type': 'mdc-linear-progress',
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
    'height': 3,
    'width': '100%',
    'minHeight': 1,
    'minWidth': 100,
    'attrs': {
      'indeterminate': true,
      'accent': false,
      'reverse': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- LIST --- //
  {
    'name': 'mdcListComp',
    'displayName': 'List',
    'type': 'mdc-list',
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
    'height': 163,
    'width': 163,
    'minHeight': 63,
    'minWidth': 120,
    'attrs': {
      'dense': false,
      'bordered': true,
      'two-line': false,
      'avatar-list': false
    },
    'styles': {
      'overflow': 'hidden'
    },
    'classes': {},
    'children': [
      {
        'type': 'mdc-list-item',
        'text': 'List item A',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': []
      }, {
        'type': 'mdc-list-item',
        'text': 'List item B',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': []
      }, {
        'type': 'mdc-list-item',
        'text': 'List item C',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': []
      }
    ]
  },

  // --- RADIO --- //
  {
    'name': 'mdcRadioComp',
    'displayName': 'Radio',
    'type': 'mdc-radio',
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
    'height': 40,
    'width': 155,
    'minHeight': 32,
    'minWidth': 32,
    'attrs': {
      'label': 'MDC Radio',
      'name': 'default-mdc-group',
      'disabled': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- SELECT --- //
  {
    'name': 'mdcSelectComp',
    'displayName': 'Select',
    'type': 'mdc-select',
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
    'height': 56,
    'width': 170,
    'minHeight': 56,
    'minWidth': 120,
    'attrs': {
      'label': 'Select',
      'disabled': false
    },
    'styles': {},
    'classes': {},
    'children': [
      {
        'type': 'mdc-option',
        'text': 'Option A',
        'attrs': {
          'value': '',
          'disabled': false
        },
        'styles': {},
        'classes': {},
        'children': []
      }, {
        'type': 'mdc-option',
        'text': 'Option B',
        'attrs': {
          'value': '',
          'disabled': false
        },
        'styles': {},
        'classes': {},
        'children': []
      }, {
        'type': 'mdc-option',
        'text': 'Option C',
        'attrs': {
          'value': '',
          'disabled': false
        },
        'styles': {},
        'classes': {},
        'children': []
      }
    ]
  },

  // --- SWITCH --- //
  {
    'name': 'mdcSwitchComp',
    'displayName': 'Switch',
    'type': 'mdc-switch',
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
    'height': 46,
    'width': 130,
    'attrs': {
      'label': 'MDC Switch',
      'checked': true,
      'align-end': false,
      'disabled': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- TEXTFIELD --- //
  {
    'name': 'mdcTextfieldComp',
    'displayName': 'Textfield',
    'type': 'mdc-textfield',
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
    'height': 56,
    'width': 120,
    'minHeight': 56,
    'minWidth': 56,
    'attrs': {
      'value': 'Textfield',
      'type': 'text',
      'label': 'Label',
      'fullwidth': false,
      'multiline': false,
      'rows': 100,
      'dense': false,
      'disabled': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- TOOLBAR --- //
  {
    'name': 'mdcToolbarComp',
    'displayName': 'Toolbar',
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
    'minHeight': 56,
    'minWidth': 120,
    'attrs': {},
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
                'text': 'Project title',
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
