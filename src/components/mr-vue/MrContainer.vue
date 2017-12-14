<template>
  <div mr-container class="mrContainer"
    @mousedown='mDownHandler'
    @mousemove='mMoveHandler'
    @mouseup='mUpHandler'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'mr-container',
  props: ['activeElements'],
  data: function () {
    return {
      moving: false,
      resizing: false
    }
  },
  methods: {
    mDownHandler (e) {
      if (e.target.getAttribute('mr-container') !== null) {
        console.log('PAGE!')
        this.$emit('clearselect')
      } else if (e.target.getAttribute('mr-el-handle') !== null) {
        console.log('HANDLE!')
        this.resizing = true
        this.$emit('resizestart')
      } else if (e.target.getAttribute('mr-el') !== null || e.target.parentNode.getAttribute('mr-el') !== null) {
        console.log('ELEMENT!')
        this.moving = true
        this.$emit('movestart')
      } else {
        console.log('OTRAS COSAS?!?!')
      }

      console.log('M-DOWN----------------')
      console.log(e)
      console.log(e.target)
      console.log(e.target.parentNode)

      // clientX and clientY (aka x and y),
      // shows the location of the mouse on the SCREEN
      // (does not care about scrolls)

      // (DO NOT USE) screenX and screenY work similar to Clients?

      // vvvvvvv USE THIS ! vvvvvvvv

      // pageY and pageX shows the position of the mouse
      // relative to the whole document (page)
      // including scroll positions
      // Does not detect the scroll cause is not in the body, but in the main element

      // BONUS!
      // ClientX + scrollLeft = pageX
      // ClientY + scrollTop = pageY

      // Offset of mouse position relative to cliked element
      // AKA position of the mouse within the element
      // console.log('OffsetY: ' + e.offsetY)
      // console.log('OffsetX: ' + e.offsetX)
    },
    mMoveHandler (e) {
      if (this.resizing) {
        console.log(e)
        this.$emit('resizing')
      }

      if (this.moving) {
        console.log(e)
        this.$emit('moving')
      }
    },
    mUpHandler (e) {
      this.moving = false
      this.resizing = false
      // console.log('M-UP------------------')
      // console.log(e)
      // console.log(e.target)
    }
  }
}
</script>

<style scoped>
.mrContainer {
  position: relative;
}
</style>
