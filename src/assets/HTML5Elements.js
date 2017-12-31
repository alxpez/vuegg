const HTML5Elements = [
  {
    'name': 'div',
    'type': 'div',
    'egglement': true,
    'containegg': true,
    'width': 300,
    'minWidth': 50,
    'height': 300,
    'minHeight': 50,
    'attrs': {
      'hidden': false
    },
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
    'minWidth': 32,
    'height': 32,
    'minHeight': 32,
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
  }
]

export default HTML5Elements
