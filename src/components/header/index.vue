<template>
  <div id="topBar" class="mdl-layout__header-row">
    <div class="mdl-layout-spacer"></div>
      <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" id="pTitle">
        <label class="mdl-textfield__label" for="pTitle">Project title</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { toggleSidebar } from '@/store/types'

export default {
  name: 'top-bar',
  computed: mapState(['app']),
  methods: mapMutations([toggleSidebar])
}
</script>

<style scoped>
#topBar {
  background: #eeeeee;
  color: rgba(0,0,0,0.66);
}
</style>
