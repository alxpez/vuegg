<template>
  <v-list>
      <v-list-tile
        v-for="component in components" :key="component.id"
        @click="ADD_ELEMENT({pageIndex, el: component})"
      >
        <v-list-tile-content>
          <v-list-tile-title v-html="component.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  </v-list>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'
import { ADD_ELEMENT } from '@/store/mutation-types'
import MockData from '@/assets/mockdata'

export default {
  name: 'components-menu',
  methods: mapMutations([ADD_ELEMENT]),
  computed: {
    pageIndex () {
      return this.getPageIndexById(this.$route.query.page)
    },
    ...mapGetters(['getPageIndexById'])
  },
  data () {
    return {
      components: MockData.components
    }
  }
}
</script>
