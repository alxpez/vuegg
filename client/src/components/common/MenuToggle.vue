<template>
  <div class="menu-toggle" v-show="!hidden">
    <div class="menu-toggle__header" @click="toggleMenu()">
      <span>{{menuHeader}}</span>
      <svgicon v-if="isClosed" icon="system/expand" width="14" height="14" color="#737373"></svgicon>
      <svgicon v-else icon="system/collapse" width="14" height="14" color="#737373"></svgicon>
    </div>
    <div ref="content" class="menu-toggle__content" :class="{'is-closed': isClosed}" :style="elStyle">
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
      maxHeight: 'auto'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.maxHeight = window.getComputedStyle(this.$refs.content)['height']
      this.isClosed = this.startClosed
    })
  },
  computed: {
    elStyle () {
      return this.isClosed ? {'max-height': 0} : {'max-height': this.maxHeight}
    }
  },
  methods: {
    toggleMenu () {
      if (!this.isClosed) {
        this.maxHeight = window.getComputedStyle(this.$refs.content)['height']
      }

      this.isClosed = !this.isClosed
      this.isClosed ? this.$emit('closed') : this.$emit('opened')
    }
  }
}
</script>

<style scoped>
.menu-toggle {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.menu-toggle__header {
  padding: 10px 25px;
  font-size: small;
  font-weight: bold;
  cursor: pointer;
  color: rgba(0,0,0,.54)
}

.menu-toggle__header:hover {
  color: rgba(0,0,0,.87)
}

.menu-toggle__header span {
  display: inline-block;
  width: calc(100% - 20px);
  user-select: none;
}

.menu-toggle__header .svg-icon {
  display: inline-block;
}

.menu-toggle__content {
  overflow: hidden;
  max-height: auto;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-toggle__content.is-closed {
  max-height: 0;
}
</style>
