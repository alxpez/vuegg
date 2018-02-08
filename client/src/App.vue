<template>
  <div id="app" class="mdc-theme--background">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { loadVueggProject } from '@/store/types'
import redoundo from '@/mixins/redoundo'

export default {
  name: 'app',
  mixins: [redoundo],
  mounted: function () {
    this.initializeState()
    this.loadVueggProject({origin: 'local'})
  },
  methods: {
    ...mapMutations(['initializeState']),
    ...mapActions([loadVueggProject])
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

.vue-tooltip.tooltip-vuegg {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-size: 12px;
  z-index: 1010;
  border-radius: 3px;
  background-color: #616161;
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 1px 2px rgba(0,0,0,0.24);
}
.vue-tooltip.tooltip-vuegg .tooltip-arrow {
  border-color: #616161 !important;
}
</style>
