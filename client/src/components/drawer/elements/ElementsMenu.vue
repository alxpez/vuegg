<template>
  <div class="menus-wrapper">
    <menu-toggle :menuHeader="'HTML5 Elements'">
      <div class="el-menu">
        <div class="el" :key="elKey"
          v-for="element in elements"
          :title="element.name"
          draggable="true"
          @dragstart="e => dragstartHandler(e, element)"
          @click="registerElement({pageId: activePage.id, el: element})"
        >
          <svgicon :icon="'system/elements/'+element.name" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
          <span>{{element.name}}</span>
        </div>
      </div>
    </menu-toggle>

    <menu-toggle :menuHeader="'Material Components'" :startClosed="true">
      <div class="el-menu">
        <div class="el" :key="elKey"
          v-for="mdComp in mdComponents"
          :title="mdComp.name"
          draggable="true"
          @dragstart="e => dragstartHandler(e, mdComp)"
          @click="registerElement({pageId: activePage.id, el: mdComp})"
        >
          <svgicon icon="system/elements/aspect_ratio" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
          <span>{{mdComp.name}}</span>
        </div>
      </div>
    </menu-toggle>

    <!-- TODO: v-for components (community/personal) retrieved from GH? -->
    <menu-toggle :menuHeader="'Community Components'" :startClosed="true">
      <div class="el-menu">
        <div class="el" :key="elKey"
          v-for="component in components"
          :title="component.name"
          draggable="true"
          @dragstart="e => dragstartHandler(e, component)"
          @click="registerElement({pageId: activePage.id, el: component})"
        >
          <svgicon icon="system/elements/earth" width="24" height="24" color="rgba(0,0,0,.87)"></svgicon>
          <span>{{component.name}}</span>
        </div>
      </div>
    </menu-toggle>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapState, mapActions } from 'vuex'
import { registerElement } from '@/store/types'

import HTML5Elements from '@/assets/HTML5Elements'
import MaterialComponents from '@/assets/MaterialComponents'
import MockComponents from '@/assets/MockComponents'
import MenuToggle from '@/components/common/MenuToggle'

import '@/assets/icons/system/elements/'

export default {
  name: 'elements-menu',
  components: { MenuToggle },
  data: function () {
    return {
      elements: HTML5Elements,
      mdComponents: MaterialComponents,
      components: MockComponents
    }
  },
  computed: {
    elKey () {
      return shortid.generate()
    },
    ...mapState({
      activePage: state => state.app.selectedPage
    })
  },
  methods: {
    dragstartHandler (e, element) {
      e.dataTransfer.dropEffect = 'copy'
      e.dataTransfer.effectAllowed = 'all'
      e.dataTransfer.setData('text/plain', JSON.stringify(element))
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

.el {
  width: 79px;
  cursor: pointer;
  padding-top: 1em;
  color: rgba(0,0,0,.87);
  text-align: center;
  border-radius: 2px;
  background-color: transparent;
  transition: all 0.20s cubic-bezier(0.4, 0, 0.2, 1);
}

.el:hover{
  background-color: rgba(0,0,0,.08);
}

.el span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: smaller;
  padding: 0 8px;
}
</style>
