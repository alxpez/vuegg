<template>
  <div class="icon-bar">
    <svgicon icon="system/editor/bold" width="22" height="22"
      @click.native="onToggleProp('font-weight', 'bold', isBold)"
      :color="isBold ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
    </svgicon>
    <svgicon icon="system/editor/italic" width="22" height="22"
      @click.native="onToggleProp('font-style', 'italic', isItalic)"
      :color="isItalic ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
    </svgicon>
    <svgicon icon="system/editor/underline" width="22" height="22"
      @click.native="onToggleProp('text-decoration', 'underline', isUnderlined)"
      :color="isUnderlined ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
    </svgicon>
    <svgicon icon="system/editor/strikethrough" width="22" height="22"
      @click.native="onToggleProp('text-decoration', 'line-through', isStriked)"
      :color="isStriked ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.38)'">
    </svgicon>
  </div>
</template>


<script>
export default {
  name: 'text-align',
  props: ['fontWeight', 'fontStyle', 'textDecoration'],
  computed: {
    isBold () { return (this.fontWeight === 'bold') },
    isItalic () { return (this.fontStyle === 'italic') },
    isUnderlined () { return (this.textDecoration === 'underline') },
    isStriked () { return (this.textDecoration === 'line-through') }
  },
  methods: {
    onToggleProp (prop, val, isOn) {
      this.$emit('change', {prop, value: (isOn ? 'inherit' : val)})
    }
  }
}
</script>


<style scoped>
.icon-bar {
  margin: 16px 20px 8px;
  user-select: none;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
  .icon-bar svg {
    cursor: pointer;
  }
</style>
