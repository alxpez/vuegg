<template>
  <div class="menu-container" v-show="!isHidden">
    <div class="header" @click="toggleMenu()">
      <span>{{menuHeader}}</span>
      <svgicon v-if="isClosed" icon="system/expand" width="14" height="14" color="#737373"></svgicon>
      <svgicon v-else icon="system/collapse" width="14" height="14" color="#737373"></svgicon>
    </div>
    <div class="content-wrapper" :class="{'is-closed': isClosed}" :style="elStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import '@/assets/icons/system/collapse'
import '@/assets/icons/system/expand'

export default {
  name: 'menu-toggle',
  props: {
    menuHeader: { type: String, default: '' },
    startClosed: { type: Boolean, dafault: false },
    hidden: { type: Boolean, dafault: false }
  },
  data: function () {
    return {
      initialized: false,
      isClosed: false,
      isHidden: false,
      maxHeight: 'auto'
    }
  },
  mounted: function () {
    this.maxHeight = this.$el.scrollHeight - 40 + 'px'
  },
  beforeUpdate: function () {
    if (!this.initialized) {
      this.isClosed = this.startClosed
      this.isHidden = this.hidden
      this.initialized = true
    }
  },
  computed: {
    elStyle () {
      return this.isClosed ? {'max-height': 0} : {'max-height': this.maxHeight}
    }
  },
  methods: {
    toggleMenu () {
      this.isClosed = !this.isClosed
      this.isClosed ? this.$emit('closed') : this.$emit('opened')
    }
  },
  watch: {
    'hidden': function (val) {
      this.isHidden = val
    }
  }
}
</script>

<style scoped>
.menu-container {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.header {
  height: 40px;
  padding: 0 25px;
  font-size: smaller;
  cursor: pointer;
}

.header:hover {
  font-weight: bold;
}

.header span {
  display: inline-block;
  padding-top: 10px;
  width: calc(100% - 20px);

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.header .svg-icon {
  display: inline-block;
}

.content-wrapper {
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-wrapper.is-closed {
  max-height: 0;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

</style>
