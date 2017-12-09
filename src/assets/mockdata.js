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
      'styles': {},
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
      'styles': {},
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
      'name': 'Comp1',
      'type': 'div',
      'egg': true,
      'componegg': true,
      'width': 400,
      'height': 300,
      'classes': [
        {
          'containegg': true
        }
      ],
      'children': [
        {
          'type': 'button',
          'text': 'Un boton cualquiera',
          'egg': true,
          'x': 50,
          'y': 100,
          'width': 200,
          'minWidth': 32,
          'height': 40,
          'minHeight': 32,
          'props': {},
          'styles': {},
          'classes': []
        }
      ]
    }, {
      'name': 'CompComp',
      'type': 'div',
      'egg': true,
      'componegg': true,
      'width': 500,
      'height': 400,
      'styles': {
        'border-style': 'dashed',
        'background-color': 'blue'
      },
      'classes': [
        {
          'containegg': true
        }
      ],
      'children': [
        {
          'type': 'input',
          'egg': true,
          'x': 10,
          'y': 20,
          'width': 150,
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
          'name': 'Comp1',
          'type': 'div',
          'egg': true,
          'componegg': true,
          'x': 20,
          'y': 60,
          'width': 300,
          'height': 100,
          'classes': [
            {
              'containegg': true
            }
          ],
          'children': [
            {
              'type': 'button',
              'text': 'Un boton cualquiera',
              'egg': true,
              'x': 50,
              'y': 50,
              'width': 55,
              'minWidth': 32,
              'height': 40,
              'minHeight': 32,
              'props': {},
              'styles': {
                'border-style': 'solid',
                'background-color': 'green',
                'color': 'black'
              },
              'classes': []
            }
          ]
        }
      ]
    }
  ]
}

export default MockData
