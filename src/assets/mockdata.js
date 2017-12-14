const MockData = {
  'elements': [
    {
      'name': 'Div',
      'type': 'div',
      'egglement': true,
      'containegg': true,
      'classes': {},
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
      'width': 200,
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
      'name': 'Comp1',
      'type': 'div',
      'egglement': true,
      'componegg': false,
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
