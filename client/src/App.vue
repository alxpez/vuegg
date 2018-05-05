<template>
  <div id="app" class="mdc-theme--background">
    <div class="viewport-splash_wrapper">
      <div class="viewport-splash_content">
        <svgicon icon="product/vuegg" width="180" height="180" :original="true"></svgicon>
        <h3>Sorry about that!</h3>
        <p>
          It looks like your screen is too small to use vuegg properly,
          please increase your browser size or visit on a larger device.
        </p>
        <p><b>NOTE</b>: As for today, vuegg does not support touch devices.</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { loadVueggProject } from '@/store/types'
import redoundo from '@/mixins/redoundo'

import '@/assets/icons/product/vuegg'

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

.viewport-splash_wrapper {
  display: none;
}

/* Tweak for mdc-select component to render correctly.
For some reason autoprefixer is not adding the prefix to the
appearance rule on the styles included on the element,
including it as a global style seem to do the job */
.mdc-select__native-control {
  appearance: none;
}

@media screen and (max-width: 1024px) {
  .viewport-splash_wrapper {
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0,0,0,0.87);
  }

  .viewport-splash_content {
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 0 47px;
    width: 100%;
  }
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
