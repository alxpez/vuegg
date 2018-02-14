<template>
  <div class="menus-wrapper">
    <menu-toggle menuHeader="Basic">
      <div class="el-menu">
        <div class="el-menu__el" :key="element.name"
          v-for="element in elements"
          :title="element.name"
          draggable="true"
          @dragstart="e => dragstartHandler(e, element)"
          @click="e => addItemToStage(e, element)"
        >
          <svgicon :icon="'system/elements/'+element.name" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
          <span>{{element.displayName || element.name}}</span>
        </div>
      </div>
    </menu-toggle>

    <menu-toggle menuHeader="Material Design">
      <div class="el-menu">
        <div class="el-menu__el" :key="mdComp.name"
          v-for="mdComp in mdComponents"
          :title="mdComp.name"
          draggable="true"
          @dragstart="e => dragstartHandler(e, mdComp)"
          @click="e => addItemToStage(e, mdComp)"
        >
          <svgicon :icon="'system/elements/'+mdComp.iconName" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
          <span>{{mdComp.displayName || mdComp.name}}</span>
        </div>
      </div>
    </menu-toggle>

    <!-- TODO: v-for components (community/personal) retrieved from GH? -->
    <!-- <menu-toggle menuHeader="Community Components" :startClosed="true">
      <div class="el-menu">
        <div class="el-menu__el" :key="component.name"
          v-for="component in components"
          :title="component.name"
          draggable="true"
          @dragstart="e => dragstartHandler(e, component)"
          @click="e => addItemToStage(e, component)"
        >
          <svgicon icon="system/elements/component" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
          <span>{{component.displayName || component.name}}</span>
        </div>
      </div>
    </menu-toggle> -->
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { registerElement } from '@/store/types'

import basicElements from '@/assets/BasicElements'
import materialComponents from '@/assets/MaterialComponents'
// import mockComponents from '@/assets/MockComponents'
import MenuToggle from '@/components/editor/common/MenuToggle'

import '@/assets/icons/system/elements/'

export default {
  name: 'elements-menu',
  components: { MenuToggle },
  data: function () {
    return {
      elements: basicElements,
      mdComponents: materialComponents
      // components: mockComponents
    }
  },
  computed: {
    ...mapState({
      activePage: state => state.app.selectedPage
    })
  },
  methods: {
    dragstartHandler (e, item) {
      e.dataTransfer.dropEffect = 'copy'
      e.dataTransfer.effectAllowed = 'all'
      e.dataTransfer.setData('text/plain', JSON.stringify(this.initItem(item)))
    },

    addItemToStage (e, item) {
      this.registerElement({pageId: this.activePage.id, el: this.initItem(item), global: e.shiftKey})
    },

    initItem (item) {
      return { zIndex: 'auto', top: 0, left: 0, bottom: 'auto', right: 'auto', ...item }
    },

    ...mapActions([registerElement])
  }
}
</script>


<style scoped>
.menus-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(100% - 58px);
  width: 100%;
  position: absolute;
  overflow-y: auto;
}

.el-menu {
  width: 100%;
  height: 100%;
  display: grid;
  margin: 1px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(1px, 72px);
}

.el-menu__el {
  width: 79px;
  cursor: pointer;
  padding-top: 1em;
  color: rgba(0,0,0,.87);
  text-align: center;
  border-radius: 2px;
  background-color: transparent;
  transition: all 0.20s cubic-bezier(0.4, 0, 0.2, 1);
}
.el-menu__el:hover{
  background-color: rgba(0,0,0,.08);
}
.el-menu__el span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: small;
  padding: 0 8px;
}
</style>
