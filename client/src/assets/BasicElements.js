/*
  Basic elements (HTML5 Elements):
  - PARENT -> egglement, [containegg]
 */
const basicElements = [
  // DIV
  {
    'name': 'div',
    'type': 'div',
    'egglement': true,
    'containegg': true,
    'width': 300,
    'height': 300,
    'attrs': {
      'hidden': false
    },
    'classes': {},
    'styles': {
      'overflow': 'hidden',
      'border-color': 'rgba(0, 0, 0, 0.15)',
      'border-style': 'solid',
      'border-width': '1px'
    },
    'children': []
  },

  // TABLE
  {
    'name': 'table',
    'type': 'table',
    'egglement': true,
    'wrappegg': true,
    'width': 550,
    'minWidth': 250,
    'height': 300,
    'minHeight': 85,
    'attrs': {},
    'styles': {
      'background-color': '#ffffff',
      'border-collapse': 'collapse',
      'border': '1px solid #dddddd',
      'text-align': 'left'
    },
    'classes': {},
    'children': [
      {
        'type': 'tr',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': [
          {
            'type': 'th',
            'text': 'head 1',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'th',
            'text': 'head 2',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'th',
            'text': 'head 3',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }
        ]
      }, {
        'type': 'tr',
        'attrs': {},
        'styles': {
          'background-color': 'rgba(0, 0, 0, 0.12)'
        },
        'classes': {},
        'children': [
          {
            'type': 'td',
            'text': 'data 1.1',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'td',
            'text': 'data 2.1',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'td',
            'text': 'data 3.1',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }
        ]
      }, {
        'type': 'tr',
        'attrs': {},
        'styles': {},
        'classes': {},
        'children': [
          {
            'type': 'td',
            'text': 'data 1.2',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'td',
            'text': 'data 2.2',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'td',
            'text': 'data 3.2',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }
        ]
      }, {
        'type': 'tr',
        'attrs': {},
        'styles': {
          'background-color': 'rgba(0, 0, 0, 0.12)'
        },
        'classes': {},
        'children': [
          {
            'type': 'td',
            'text': 'data 3.1',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'td',
            'text': 'data 3.2',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }, {
            'type': 'td',
            'text': 'data 3.3',
            'attrs': {},
            'styles': {
              'padding': '0 8px'
            },
            'classes': {},
            'children': {

            }
          }
        ]
      }
    ]
  },

  // DATE
  {
    'name': 'date',
    'type': 'input',
    'egglement': true,
    'width': 200,
    'height': 40,
    'attrs': {
      'value': '',
      'type': 'date',
      'placeholder': 'MM/DD/YYYY',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'styles': {},
    'classes': {}
  },

  // INPUT
  {
    'name': 'input',
    'type': 'input',
    'egglement': true,
    'width': 300,
    'height': 40,
    'attrs': {
      'value': '',
      'placeholder': 'placeholder',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'styles': {},
    'classes': {}
  },

  // BUTTON
  {
    'name': 'button',
    'type': 'button',
    'text': 'Button',
    'egglement': true,
    'width': 200,
    'height': 40,
    'attrs': {},
    'styles': {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'classes': {}
  },

  // CHECKBOX
  {
    'name': 'checkbox',
    'type': 'input',
    'egglement': true,
    'width': 40,
    'height': 40,
    'attrs': {
      'type': 'checkbox'
    },
    'styles': {},
    'classes': {}
  },

  // RADIO
  {
    'name': 'radio',
    'type': 'input',
    'egglement': true,
    'width': 40,
    'height': 40,
    'attrs': {
      'type': 'radio',
      'name': 'default-group'
    },
    'styles': {},
    'classes': {}
  },

  // SELECT
  {
    'name': 'select',
    'type': 'select',
    'egglement': true,
    'wrappegg': true,
    'width': 200,
    'height': 40,
    'attrs': {},
    'styles': {},
    'classes': {},
    'children': [
      {
        'type': 'option',
        'text': 'Option 1',
        'attrs': {},
        'styles': {},
        'classes': {}
      }, {
        'type': 'option',
        'text': 'Option 2',
        'attrs': {},
        'styles': {},
        'classes': {}
      }, {
        'type': 'option',
        'text': 'Option 3',
        'attrs': {},
        'styles': {},
        'classes': {}
      }
    ]
  },

  // ICON
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

  // LINK
  {
    'name': 'link',
    'type': 'a',
    'text': 'Link',
    'egglement': true,
    'width': 200,
    'height': 40,
    'attrs': {
      'href': '#'
    },
    'styles': {
      'text-align': 'center',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'classes': {}
  },

  // TEXT
  {
    'name': 'text',
    'type': 'span',
    'text': 'Text',
    'egglement': true,
    'width': 150,
    'height': 25,
    'attrs': {},
    'styles': {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'classes': {}
  },

  // IMAGE
  {
    'name': 'image',
    'type': 'img',
    'egglement': true,
    'width': 50,
    'height': 44.44,
    'attrs': {
      'src': '/static/vuegg-fam.svg'
    },
    'styles': {},
    'classes': {}
  }
]

export default basicElements
