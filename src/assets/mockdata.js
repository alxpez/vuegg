const MockData = {
  'elements': [
    {
      'name': 'Div',
      'type': 'div',
      'egglement': true,
      'containegg': true,
      'classes': {},
      'styles': {
        'border': '1px solid rgba(0, 0, 0, 0.15)'
      },
      'children': []
    }, {
      'name': 'Link',
      'type': 'a',
      'text': 'Link',
      'egglement': true,
      'width': 200,
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {},
      'styles': {},
      'classes': {}
    }, {
      'name': 'Input',
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
      'name': 'Button',
      'type': 'button',
      'text': 'Button',
      'egglement': true,
      'width': '50%',
      'minWidth': 32,
      'height': 40,
      'minHeight': 32,
      'attrs': {},
      'styles': {},
      'classes': {}
    }
  ],
  'components': [
    {
      'name': 'MDC-Toolbar',
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
      'name': 'Comp1',
      'type': 'div',
      'egglement': true,
      'componegg': true,
      'containegg': true,
      'width': 400,
      'height': 300,
      'classes': {},
      'children': [
        {
          'type': 'button',
          'text': 'Un boton cualquiera',
          'egglement': true,
          'left': 50,
          'top': 100,
          'width': 200,
          'minWidth': 32,
          'height': 40,
          'minHeight': 32,
          'attrs': {},
          'styles': {},
          'classes': {}
        }
      ]
    }, {
      'name': 'CompComp',
      'type': 'div',
      'egglement': true,
      'componegg': true,
      'containegg': true,
      'width': 500,
      'height': 400,
      'styles': {
        'border-style': 'dashed',
        'background-color': 'blue',
        'margin': '40px'
      },
      'classes': {},
      'children': [
        {
          'type': 'input',
          'egglement': true,
          'left': 10,
          'top': 20,
          'width': 150,
          'minWidth': 32,
          'height': 40,
          'minHeight': 32,
          'attrs': {
            'placeholder': 'Input prompt'
          },
          'styles': {
            'border-style': 'inset',
            'background-color': 'white',
            'color': 'initial'
          },
          'classes': {}
        }, {
          'name': 'Comp1',
          'type': 'div',
          'egglement': true,
          'componegg': true,
          'containegg': true,
          'left': 20,
          'top': 60,
          'width': 300,
          'height': 100,
          'classes': {},
          'children': [
            {
              'type': 'button',
              'text': 'Un boton cualquiera',
              'egglement': true,
              'left': 50,
              'top': 50,
              'width': 55,
              'minWidth': 32,
              'height': 40,
              'minHeight': 32,
              'attrs': {},
              'styles': {
                'border-style': 'solid',
                'background-color': 'green',
                'color': 'black'
              },
              'classes': {}
            }
          ]
        }
      ]
    }
  ]
}

export default MockData
