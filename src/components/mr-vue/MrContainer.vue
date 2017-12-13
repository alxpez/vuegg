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
  data: function () {
    return {
      active: false,
      moving: false,
      resizing: false
    }
  },
  methods: {
    mDownHandler (e) {
      if (e.target.attributes.hasOwnProperty('mr-container')) {
        console.log('PAGE!')
        this.active = false
      } else if (e.target.attributes.hasOwnProperty('mr-el-handle')) {
        console.log('ELEMENT RESIZE')
        e.target.setAttribute('active', true)
        this.resizing = true
      } else if (e.target.attributes.hasOwnProperty('mr-el') || e.target.parentNode.attributes.hasOwnProperty('mr-el')) {
        console.log('ELEMENT MOVE')
        e.target.active = true
        this.moving = true
      } else {
        console.log('something else')
      }

      console.log('M-DOWN----------------')
      console.log(e)
      console.log(e.target)

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
