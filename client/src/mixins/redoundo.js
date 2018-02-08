import cloneDeep from 'clone-deep'
import { checkLastSaved, _toggleCanUndo, _toggleCanRedo } from '@/store/types'

const MAX_HISTORY = 250

/**
 * Vue Mixin to control the State history and undo/redo functionality
 *
 * @type {Vue.mixin}
 * @see {@link https://vuejs.org/v2/guide/mixins.html|Vue Mixins}
 */
const redoundo = {
  data: function () {
    return {
      done: [],
      undone: []
    }
  },

  created: function () {
    this.$store.subscribe((mutation, state) => {
      // If the history size is reached, the eldest state will be removed
      if (this.done.length === MAX_HISTORY) this.done.shift()

      // It won't save the state of mutations leaded by '_'
      if (mutation.type.charAt(0) !== '_') {
        this.done.push(cloneDeep(state))
        this.undone = []

        // To display if changes had happened to the project
        this.updateCanRedoUndo()
        this.$store.dispatch(checkLastSaved)
      }
    })

    this.$root.$on('undo', this.undo)
    this.$root.$on('redo', this.redo)
  },

  beforeDestroy: function () {
    this.$root.$off('undo', this.undo)
    this.$root.$off('redo', this.redo)
  },

  computed: {
    canUndo () {
    // There should always be at least one state (initializeState)
      return this.done.length > 1
    },
    canRedo () {
      return this.undone.length > 0
    }
  },

  methods: {
    undo () {
      if (this.canUndo) {
        this.undone.push(this.done.pop())
        let undoState = this.done[this.done.length - 1]
        this.$store.replaceState(cloneDeep(undoState))
        this.$root.$emit('rebaseState')
        this.updateCanRedoUndo()
      }
    },

    redo () {
      if (this.canRedo) {
        let redoState = this.undone.pop()
        this.done.push(redoState)
        this.$store.replaceState(cloneDeep(redoState))
        this.$root.$emit('rebaseState')
        this.updateCanRedoUndo()
      }
    },

    updateCanRedoUndo () {
      this.$store.commit(_toggleCanUndo, this.canUndo)
      this.$store.commit(_toggleCanRedo, this.canRedo)
    }
  }
}

export default redoundo
