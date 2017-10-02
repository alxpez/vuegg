<template>
  <v-list>
      <v-list-tile
        v-for="component in components" :key="component.id"
        @click="registerAndAddEgglement({parentId: pageId, el: component})"
      >
        <v-list-tile-content>
          <v-list-tile-title v-html="component.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  </v-list>
</template>


<script>
import { mapActions } from 'vuex'
import { registerAndAddEgglement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'components-menu',
  methods: mapActions([registerAndAddEgglement]),
  computed: {
    pageId () {
      return this.$route.query.page
    }
  },
  data () {
    return {
      components: MockData.components
    }
  }
}
</script>
