<template>
  <v-list>
      <v-list-tile
        v-for="component in components" :key="component.id"
        @click="addEgglement({pageIndex, el: component})"
      >
        <v-list-tile-content>
          <v-list-tile-title v-html="component.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  </v-list>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'
import { addEgglement, getPageIndexById } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'components-menu',
  methods: mapMutations([addEgglement]),
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    ...mapGetters([getPageIndexById])
  },
  data () {
    return {
      components: MockData.components
    }
  }
}
</script>
