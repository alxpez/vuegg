/*
  Components from external libraries (ie. vue-mdc-adapter):
  - PARENT -> external, componegg, egglement
  - CHILDREN -> (none)
 */
const MockComponents = [

  // --- DRAWER --- //
  {
    'displayName': 'Drawer',
    'iconName': 'mdcDrawer',
    'name': 'mdcDrawerComp',
    'type': 'mdc-drawer',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- TOOLBAR --- //
  {
    'displayName': 'Toolbar',
    'iconName': 'mdcToolbar',
    'name': 'mdcToolbarComp',
    'type': 'mdc-toolbar',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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
  },

  // --- SELECT --- //
  {
    'displayName': 'Select',
    'iconName': 'mdcSelect',
    'name': 'mdcSelectComp',
    'type': 'mdc-select',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- BUTTON --- //
  {
    'displayName': 'Button',
    'iconName': 'mdcButton',
    'name': 'mdcButtonComp',
    'type': 'mdc-button',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- TEXTFIELD --- //
  {
    'displayName': 'Textfield',
    'iconName': 'mdcTextfield',
    'name': 'mdcTextfieldComp',
    'type': 'mdc-textfield',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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
      'label': 'Label',
      'value': 'Textfield',
      'box': false,
      'outline': false,
      'fullwidth': false,
      'multiline': false,
      'dense': false,
      'disabled': false
    },
    'styles': {},
    'classes': {},
    'children': []
  },

  // --- RADIO --- //
  {
    'displayName': 'Radio',
    'iconName': 'mdcRadio',
    'name': 'mdcRadioComp',
    'type': 'mdc-radio',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- CHECKBOX --- //
  {
    'displayName': 'Checkbox',
    'iconName': 'mdcCheckbox',
    'name': 'mdcCheckboxComp',
    'type': 'mdc-checkbox',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- FLOATING ACTION BUTTON --- //
  {
    'displayName': 'FAB',
    'iconName': 'mdcButton',
    'name': 'mdcFABComp',
    'type': 'mdc-fab',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- LIST --- //
  {
    'displayName': 'List',
    'iconName': 'mdcList',
    'name': 'mdcListComp',
    'type': 'mdc-list',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- ICON --- //
  // This is not really a MDC (not even a component),
  // but it uses Material Design Icons...
  // and the elementsMenu looks much better
  {
    'displayName': 'Icon',
    'iconName': 'icon',
    'name': 'icon',
    'type': 'i',
    'egglement': true,
    'text': 'insert_emoticon',
    'width': 32,
    'height': 32,
    'attrs': {},
    'styles': {
      'font-family': '"Material Icons"',
      'font-size': 32,
      'text-align': 'center'
    },
    'classes': {
      'material-icons': true
    }
  },

  // --- SWITCH --- //
  {
    'displayName': 'Switch',
    'iconName': 'mdcSwitch',
    'name': 'mdcSwitchComp',
    'type': 'mdc-switch',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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

  // --- LINEAR PROGRESS --- //
  {
    'displayName': 'Progress',
    'iconName': 'mdcProgress',
    'name': 'mdcLinearProgressComp',
    'type': 'mdc-linear-progress',
    'dependencies': [
      {
        'name': 'vue-mdc-adapter',
        'version': '^0.8.3',
        'imports': [
          ['VueMDCAdapter', 'vue-mdc-adapter'],
          'https://unpkg.com/vue-mdc-adapter@^0.8.3/dist/vue-mdc-adapter.min.css'
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
  }
]

export default MockComponents
