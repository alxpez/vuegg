<template>
  <div class="elMenu">
    <div class="el" :key="elKey"
      v-for="element in elements"
      @click="registerAndSaveElement({pageId: activePage.id, el: element})"
    >
      {{element.name}}
    </div>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapState, mapActions } from 'vuex'
import { registerAndSaveElement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'elements-menu',
  methods: mapActions([registerAndSaveElement]),
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
