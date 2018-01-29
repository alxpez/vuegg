<template>
<div v-show="blockLoading" class="block-loader__modal">
  <div class="block-loader__wrapper">
    <mdc-linear-progress class="block-loader" accent indeterminate>
    </mdc-linear-progress>
    <span class="block-loader-message">{{loadingMessage}}</span>
    <mdc-linear-progress class="block-loader" accent indeterminate>
    </mdc-linear-progress>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'block-loader',
  computed: {
    ...mapState({
      blockLoading: state => state.app.isBlockLoading,
      loadingMessage: state => state.app.loadingMessage || 'Loading'
    })
  }
}
</script>

<style scoped>
.block-loader__modal {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.57);
  position: absolute;
  z-index: 1010;
  display: flex;
  justify-content: center;
  align-items: center
}

.block-loader__wrapper {
  width: auto;
  min-width: 240px;
  background-color: #fff;
  text-align: center;
  box-shadow:
    0 9px 46px 8px rgba(0,0,0,.14),
    0 11px 15px -7px rgba(0,0,0,.12),
    0 24px 38px 3px rgba(0,0,0,.2);
}
.block-loader {
  height: 2px;
}

.block-loader-message {
  font-size: 24px;
  padding: 25px;
  display: block;
  color: rgba(0, 0, 0, 0.78);
}
</style>
