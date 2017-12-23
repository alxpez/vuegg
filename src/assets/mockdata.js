const MockData = {
  'elements': [
    {
      'name': 'div',
      'type': 'div',
      'egglement': true,
      'containegg': true,
      'width': 300,
      'height': 300,
      'classes': {},
      'styles': {
        'border': '1px solid rgba(0, 0, 0, 0.15)'
      },
      'children': []
    }, {
      'name': 'text',
      'type': 'span',
      'text': 'random sample text',
      'egglement': true,
      'width': 150,
      'height': 32,
      'attrs': {},
      'styles': {},
      'classes': {}
    }, {
      'name': 'link',
      'type': 'a',
      'text': 'Link',
      'egglement': true,
      'width': 200,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {
        'href': '#'
      },
      'styles': {
        'text-align': 'center'
      },
      'classes': {}
    }, {
      'name': 'button',
      'type': 'button',
      'text': 'Button',
      'egglement': true,
      'width': 200,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {},
      'styles': {},
      'classes': {}
    }, {
      'name': 'input',
      'type': 'input',
      'egglement': true,
      'width': 300,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {
        'placeholder': 'Input prompt'
      },
      'styles': {},
      'classes': {}
    }, {
      'name': 'radio',
      'type': 'input',
      'egglement': true,
      'width': 40,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {
        'type': 'radio',
        'name': 'default-group'
      },
      'styles': {},
      'classes': {}
    }, {
      'name': 'checkbox',
      'type': 'input',
      'egglement': true,
      'width': 40,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {
        'type': 'checkbox'
      },
      'styles': {},
      'classes': {}
    }, {
      'name': 'date',
      'type': 'input',
      'egglement': true,
      'width': 200,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {
        'type': 'date'
      },
      'styles': {},
      'classes': {}
    }, {
      'name': 'image',
      'type': 'img',
      'egglement': true,
      'width': 50,
      'minWidth': 32,
      'height': 44.44,
      'minHeight': 32,
      'attrs': {
        'src': '/static/vuegg-fam.svg'
      },
      'styles': {},
      'classes': {}
    }, {
      'name': 'color',
      'type': 'input',
      'egglement': true,
      'width': 25,
      'minWidth': 20,
      'height': 25,
      'minHeight': 20,
      'attrs': {
        'type': 'color'
      },
      'styles': {},
      'classes': {}
    }
  ],
  'components': [
    {
      'name': 'MDC Toolbar',
      'type': 'mdc-toolbar',
      'componegg': true,
      'height': 64,
      'width': '100%',
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
      'name': 'Search Box',
      'type': 'div',
      'egglement': true,
      'componegg': true,
      'containegg': true,
      'width': 400,
      'height': 40,
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
}

export default MockData
