<template>
<div v-show="blockLoading" class="block-loader__modal">
  <div class="spinner">
   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1"
    width="48px" height="48px" viewBox="0 0 28 28"
  >
    <g class="qp-circular-loader">
     <path class="qp-circular-loader-path" fill="none" d="M 14,1.5 A 12.5,12.5 0 1 1 1.5,14" stroke-linecap="round" />
    </g>
   </svg>
  </div>
</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'block-loader',
  computed: mapState({
    blockLoading: state => state.app.isBlockLoading
  })
}
</script>


<style scoped lang="scss">
@import './spinner.css';
</style>

<style scoped>
.block-loader__modal {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.57);
  position: absolute;
  z-index: 1015;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
