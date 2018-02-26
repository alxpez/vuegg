<template>
  <nav class="navigation">
    <div class="tab-bar">
      <a title="Elements" class="tab" @click="toggleTab('elements')">
        <svgicon icon="system/widgets" width="24" height="24"
          :color="showElements ? '#2b6a73' : 'rgba(0,0,0,.38)'">
        </svgicon>
      </a>
      <a title="Settings" class="tab" @click="toggleTab('settings')">
        <svgicon icon="system/settings" width="24" height="24"
          :color="showSettings ? '#2b6a73' : 'rgba(0,0,0,.38)'">
        </svgicon>
      </a>
      <a title="Pages" class="tab" @click="toggleTab('pages')">
        <svgicon icon="system/page" width="24" height="24"
          :color="showPages ? '#2b6a73' : 'rgba(0,0,0,.38)'">
        </svgicon>
      </a>

      <div class="tab-indicator mdc-theme--primary-bg" :style="{'left': indiLeft, 'right': indiRight}"></div>
    </div>

    <div class="tab-content">
      <ElementsMenu v-show="showElements"></ElementsMenu>
      <settings-menu v-show="showSettings"></settings-menu>
      <pages-menu v-show="showPages"></pages-menu>
    </div>
  </nav>
</template>


<script>
import ElementsMenu from './elements/ElementsMenu'
import SettingsMenu from './settings/SettingsMenu'
import PagesMenu from './pages/PagesMenu'

import '@/assets/icons/system/widgets'
import '@/assets/icons/system/settings'
import '@/assets/icons/system/page'

export default {
  name: 'drawegg',
  components: { ElementsMenu, SettingsMenu, PagesMenu },
  data: function () {
    return {
      showElements: true,
      showSettings: true,
      showPages: true,
      activeTabX: 0
    }
  },
  computed: {
    indiLeft () {
      return this.activeTabX + 'px'
    },
    indiRight () {
      return (240 - (this.activeTabX + 80)) + 'px'
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.showElements = true
      this.showSettings = false
      this.showPages = false
    })
  },
  methods: {
    toggleTab (name) {
      if (name === 'elements') {
        this.showElements = true
        this.showSettings = this.showPages = false
        this.activeTabX = 0
      }
      if (name === 'settings') {
        this.showSettings = true
        this.showElements = this.showPages = false
        this.activeTabX = 80
        this.$root.$emit('show-settings')
      }
      if (name === 'pages') {
        this.showPages = true
        this.showElements = this.showSettings = false
        this.activeTabX = 160
      }
    }
  }
}
</script>


<style scoped>
.navigation {
  top: 0;
  right: 0;
  z-index: 1005;
  width: 240px;
  height: 100%;
  max-height: 100%;
  background: #fafafa;
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;
  border-right: 1px solid #e0e0e0;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

/* DRAWER DOES NOT DISPLAY IN DEVICES SMALLER THAN 1024px */
@media screen and (max-width: 1024px) {
  .navigation {
    display: none;
  }
}

.tab {
  padding: 0 28px;
  height: 44px;
  cursor: pointer;
}
.tab-bar {
  display: inline-flex;
  padding-top: 20px;
  z-index: 1;
  /* border-bottom: 1px solid rgba(0,0,0,0.12); */
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
.tab-indicator {
  top: 63px;
  height: 2px;
  position: absolute;
  transition: all .2s cubic-bezier(.4,0,.4,1).01s;
}
.tab-content {
  margin-top: 1px;
}
</style>
