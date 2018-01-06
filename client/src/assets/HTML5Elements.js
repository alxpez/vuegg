/*
  Basic elements (HTML5 Elements):
  - PARENT -> egglement, [containegg]
 */
const HTML5Elements = [
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
      'border': '1px solid rgba(0, 0, 0, 0.15)'
    },
    'children': []
  }, {
    'name': 'text',
    'type': 'span',
    'text': 'random sample text',
    'egglement': true,
    'width': 150,
    'height': 25,
    'attrs': {},
    'styles': {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'classes': {}
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
    'name': 'date',
    'type': 'input',
    'egglement': true,
    'width': 200,
    'height': 40,
    'attrs': {
      'value': '',
      'type': 'date',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    },
    'styles': {},
    'classes': {}
  }, {
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

export default HTML5Elements
