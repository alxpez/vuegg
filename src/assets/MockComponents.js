/*
  vuegg-powered components:
  - PARENT -> componegg, egglement, containegg
  - CHILDREN -> egglement, [componegg], [containegg]
 */
const MockComponents = [
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
