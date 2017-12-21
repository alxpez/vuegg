<template>
  <div class="elMenu">
    <div class="el" :key="elKey"
      v-for="element in elements"
      draggable="true"
      @dragstart="e => dragstartHandler(e, element)"
      @click="registerElement({pageId: activePage.id, el: element})"
    >
      {{element.name}}
    </div>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapState, mapActions } from 'vuex'
import { registerElement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'elements-menu',
  data: function () {
    return {
      elements: MockData.elements
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
.elMenu {
  width: 100%;
  height: 100%;
  display: grid;
  margin: 1px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(1px, 75px);
}

.el {
  cursor: pointer;
  border-radius: 2px;
  background-color: rgba(0,0,0,0);
  padding: 1em;
  color: black;
  transition: all 0.15s linear;
}

.el:hover {
  background-color: rgba(0,0,0,.15);
}
</style>
