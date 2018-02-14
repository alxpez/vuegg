/*
  vuegg-powered components:
  - PARENT -> componegg, egglement, containegg
  - CHILDREN -> egglement, [componegg], [containegg]
 */
const mockComponents = [
  {
    'name': 'search',
    'type': 'div',
    'egglement': true,
    'componegg': true,
    'containegg': true,
    'width': 250,
    'minWidth': 150,
    'height': 40,
    'minHeight': 32,
    'attrs': {},
    'styles': {},
    'classes': {},
    'children': [
      {
        'type': 'input',
        'egglement': true,
        'left': 0,
        'width': '70%',
        'height': '100%',
        'attrs': {
          'placeholder': 'Search...'
        },
        'styles': {
          'padding': 0,
          'border': 0,
          'border-bottom': '1px solid #eee',
          'background-color': 'transparent',
          'outline': 'none'
        },
        'classes': {}
      }, {
        'type': 'button',
        'text': 'search',
        'egglement': true,
        'right': 0,
        'width': '30%',
        'height': '100%',
        'attrs': {},
        'styles': {
          'font-family': '"Material Icons"'
        },
        'classes': {}
      }
    ]
  }
]

export default mockComponents
