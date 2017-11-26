<template>
  <div>
    <v-list>
        <v-list-tile
          v-for="element in elements" :key="componentKey"
          @click="registerAndSaveEgglement({pageId, el: element})"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="element.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
    <v-list>
        <v-list-tile
          v-for="component in components" :key="componentKey"
          @click="registerAndSaveEgglement({pageId, el: component})"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="component.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapActions } from 'vuex'
import { registerAndSaveEgglement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'components-menu',
  methods: mapActions([registerAndSaveEgglement]),
  data: function () {
    return {
      components: MockData.components,
      elements: MockData.elements
    }
  },
  computed: {
    componentKey () {
      return shortid.generate()
    },
    pageId () {
      return this.$route.query.page
    }
  }
}
</script>
