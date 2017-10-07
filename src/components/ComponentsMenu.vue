<template>
  <v-list>
      <v-list-tile
        v-for="component in components" :key="componentKey"
        @click="registerAndSaveEgglement({parentId: pageId, el: component})"
      >
        <v-list-tile-content>
          <v-list-tile-title v-html="component.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  </v-list>
</template>


<script>
import uuid4 from 'uuid/v4'
import { mapActions } from 'vuex'
import { registerAndSaveEgglement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'components-menu',
  methods: mapActions([registerAndSaveEgglement]),
  data: function () {
    return {
      components: MockData.components
    }
  },
  computed: {
    componentKey () {
      return uuid4()
    },
    pageId () {
      return this.$route.query.page
    }
  }
}
</script>
