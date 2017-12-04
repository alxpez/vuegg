<template>
  <div id="headegg" class="mdl-layout__header-row">
    <button id="homeBtn" class="mdl-button mdl-js-button mdl-button--icon">
      <i class="material-icons">cloud_circle</i>
    </button>
    <div id="inputTitle" class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="pTitle">
      <label class="mdl-textfield__label" for="pTitle">Project title</label>
    </div>

    <div class="mdl-layout-spacer"></div>
    <div id="tt1" class="icon material-icons">add</div>
    <div class="mdl-tooltip" data-mdl-for="tt1">Follow</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { toggleSidebar } from '@/store/types'

export default {
  name: 'headegg',
  computed: mapState(['app']),
  methods: mapMutations([toggleSidebar])
}
</script>

<style>
#headegg {
  height: 64px;
  background: #eeeeee;
  color: rgba(0,0,0,0.66);
  padding: 0 25px 0 25px;
}

@media screen and (max-width: 1024px) {
  #headegg {
    height: 56px;
    padding: 0 15px 0 15px;
    margin-right: 240px;
  }
}

#homeBtn {
  margin-right: 25px;
}

#inputTitle {
  border: 0;
  width: 45%;
}
</style>
