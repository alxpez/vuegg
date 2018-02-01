<template>
  <div class="wrapper">
    <span class="label">zIndex: {{zIndex}}</span>
    <div class="icon-bar">
      <svgicon icon="system/editor/flip_auto" width="22" height="22"
        @click.native="$emit('change', 'auto')" v-tooltip="'auto'">
      </svgicon>
      <svgicon icon="system/editor/flip_front" width="22" height="22" v-tooltip="'flip front'"
        @click.native="$emit('change', (zIndex !== 'auto') ? (zIndex + 1) : 1)">
      </svgicon>
      <svgicon icon="system/editor/flip_back" width="22" height="22" v-tooltip="'flip back'"
        @click.native="$emit('change', (zIndex !== 'auto' && zIndex > 0) ? (zIndex - 1) : 0)">
      </svgicon>
    </div>
  </div>
</template>


<script>
export default {
  name: 'stack-order',
  props: ['zIndex']
}
</script>


<style scoped>
.wrapper {
  display: inline-flex;
  margin: 16px 20px 8px;
}

.label {
  width: 100%;
  font-size: .813rem;
  color: rgba(0, 0, 0, 0.57);
  text-align: left;
  margin: 4px 0;
}

.icon-bar {
  user-select: none;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
  .icon-bar svg {
    cursor: pointer;
    fill: rgba(0,0,0,.54);
  }
  .icon-bar svg:hover {
    fill: rgba(0,0,0,.87);
  }
</style>
