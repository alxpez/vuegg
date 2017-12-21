<template>
  <div id="compMenu" class="list-group">
    <a id="comp" :key="compKey"
      v-for="component in components"
      @click="registerElement({pageId: activePage.id, el: component})"
      class="list-group-item list-group-item-action"
    >
      {{component.name}}
    </a>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapState, mapActions } from 'vuex'
import { registerElement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'components-menu',
  data: function () {
    return {
      components: MockData.components
    }
  },
  computed: {
    compKey () {
      return shortid.generate()
    },

    ...mapState({
      activePage: state => state.app.selectedPage
    })
  },
  methods: mapActions([registerElement])
}
</script>


<style scoped>
#compMenu {
  width: 100%;
  height: 100%;
}

#comp {
  cursor: pointer;
}
</style>
