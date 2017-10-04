const state = {
  app: {
    sidebar: {
      isOpen: false,
      isMini: false
    },
    pageDialog: {
      isNew: true,
      isOpen: false
    }
  },
  pages: [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      children: []
    }
  ]
}

export default state
