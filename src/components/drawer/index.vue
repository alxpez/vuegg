<template>
    <nav class="mdl-navigation">
      <div class="mdl-tabs mdl-js-tabs">
        <div class="mdl-tabs__tab-bar">
          <a href="#elements" title="Elements" class="mdl-tabs__tab is-active">
            <i class="material-icons">widgets</i>
          </a>
          <a href="#settings" title="Properties" class="mdl-tabs__tab">
            <i class="material-icons">settings</i>
          </a>
          <a href="#pages" title="Pages" class="mdl-tabs__tab">
            <i class="material-icons">insert_drive_file</i>
          </a>
        </div>

        <div class="mdl-tabs__panel is-active" id="elements">
          <ElementsMenu></ElementsMenu>
        </div>
        <div class="mdl-tabs__panel" id="settings">
          <settings-menu></settings-menu>
        </div>
        <div class="mdl-tabs__panel" id="pages">
          <pages-menu></pages-menu>
        </div>
      </div>
    </nav>
</template>


<script>
import ElementsMenu from './ElementsMenu'
import SettingsMenu from './SettingsMenu'
import PagesMenu from './PagesMenu'

export default {
  name: 'drawegg',
  components: { ElementsMenu, SettingsMenu, PagesMenu }
}
</script>


<style scoped>
.mdl-navigation {
    padding-top: 16px;
}

@media screen and (max-width: 1024px) {
  .mdl-navigation {
      padding-top: 8px;
  }
}
.mdl-tabs__tab {
  padding: 0 28px;
  height: 50px;
}

.mdl-tabs.is-upgraded .mdl-tabs__tab.is-active:after {
  -webkit-animation: border-expand .4s cubic-bezier(.4,0,.4,1).01s alternate backwards;
  animation: border-expand .4s cubic-bezier(.4,0,.4,1).01s alternate backwards;
}

.mdl-tabs__panel {
  margin-top: 1px;
}
</style>
