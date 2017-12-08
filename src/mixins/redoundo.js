import cloneDeep from 'clone-deep'

/**
 * Vue Mixin to control the State history and undo/redo functionality
 *
 * @type {Vue.mixin}
 * @see {@link https://vuejs.org/v2/guide/mixins.html|Vue Mixins}
 */
const redoundo = {
  install (Vue) {
    Vue.mixin({
      data: function () {
        return {
          done: [],
          undone: []
        }
      },
      created: function () {
        this.$store.subscribe((mutation, state) => {
          this.done.push(cloneDeep(state))
          this.undone = []
        })
      },
      computed: {
        canUndo () {
        // There should always be at least one state (initialState)
          return this.done.length > 1
        },
        canRedo () {
          return this.undone.length
        }
      },
      methods: {
        undo () {
          this.undone.push(cloneDeep(this.done.pop()))
          let undoState = this.done[this.done.length - 1]
          this.$store.replaceState(cloneDeep(undoState))
        },
        redo () {
          let redoState = this.undone.pop()
          this.done.push(cloneDeep(redoState))
          this.$store.replaceState(cloneDeep(redoState))
        }
      }
    })
  }
}

export default redoundo
