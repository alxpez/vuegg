<template>
<div>
  <menu-toggle menuHeader="General">
    <div class="menu menu--double-col">
      <mdc-textfield v-model="t" label="Top (px)" dense
        @input.native="e => emitChanges('top', e.target.value)"/>
      <mdc-textfield v-model="l" label="Left (px)" dense
        @input.native="e => emitChanges('left', e.target.value)"/>
    </div>

    <div class="menu menu--single-col">
      <stack-order :zIndex="z"
        @change="newValue => emitChanges('zIndex', newValue)">
      </stack-order>
    </div>
  </menu-toggle>
</div>
</template>


<script>
import MenuToggle from '@/components/common/MenuToggle'
import StackOrder from './controls/StackOrder'

export default {
  name: 'global-settings',
  components: { MenuToggle, StackOrder },
  props: ['top', 'left', 'zIndex'],
  data: function () {
    return {
      t: this.top,
      l: this.left,
      z: this.zIndex
    }
  },
  watch: {
    'top' (val) { this.t = val.toString() },
    'left' (val) { this.l = val.toString() },
    'zIndex' (val) { this.z = val }
  },
  methods: {
    emitChanges (type, value) {
      this.$emit('propchange', {type, value})
    }
  }
}
</script>


<style scoped>
.menu {
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
}
  .menu--single-col {
    grid-template-columns: repeat(1, 1fr);
  }
  .menu--double-col {
    grid-template-columns: repeat(2, 1fr);
  }
    .menu--double-col * {
      margin: 0 20px;
    }
</style>
