<template>
  <div class="menus-wrapper">
    <menu-toggle :menuHeader="'HTML5 Elements'">
      <div class="el-menu">
        <div class="el" :key="elKey"
          v-for="element in elements"
          draggable="true"
          @dragstart="e => dragstartHandler(e, element)"
          @click="registerElement({pageId: activePage.id, el: element})"
        >
          <svgicon :icon="'system/'+element.name" width="24" height="24" :original="true"></svgicon>
          <span>{{element.name}}</span>
        </div>
      </div>
    </menu-toggle>

    <!-- TODO: v-for components (community/personal) retrieved from GH? -->
    <menu-toggle :menuHeader="'Community Components'" :initClosed="true">
      <div class="el-menu">
        <div class="el" :key="elKey"
          v-for="component in components"
          draggable="true"
          @dragstart="e => dragstartHandler(e, component)"
          @click="addComponent(component)"
        >
          <svgicon icon="system/aspect_ratio" width="24" height="24" :original="true"></svgicon>
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
import MockComponents from '@/assets/MockComponents'
import MenuToggle from '@/components/common/MenuToggle'

import '@/assets/icons/system'

export default {
  name: 'elements-menu',
  components: { MenuToggle },
  data: function () {
    return {
      elements: HTML5Elements,
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
    async addComponent (component) {
      // if (component.dependencies) {
      //   for (let dependency of component.dependencies) {
      //     const src = 'https://unpkg.com/' + dependency.name + '@' + dependency.version
      //
      //     try {
      //       await this.injectScript(src, dependency.name)
      //     } catch (e) {
      //       console.error(e)
      //     }
      //     console.log('finished')
      //   }
      // }

      this.registerElement({pageId: this.activePage.id, el: component})
    },

    injectScript (src, id) {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) return

        let script = document.createElement('script')
        script.id = id
        script.async = true
        script.src = src
        script.addEventListener('load', resolve)
        script.addEventListener('error', () => reject('Error loading script.'))
        script.addEventListener('abort', () => reject('Script loading aborted.'))
        document.head.appendChild(script)
      })
    },

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
  grid-auto-rows: minmax(1px, 75px);
}

.el {
  cursor: pointer;
  padding: 1em;
  color: black;
  text-align: center;
  border-radius: 2px;
  background-color: rgba(0,0,0,0);
  transition: all 0.20s cubic-bezier(0.4, 0, 0.2, 1);
}

.el:hover{
  background-color: rgba(0,0,0,.05);
}

.el span {
  display: block;
  font-size: smaller;
}
</style>
