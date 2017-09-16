<template>
  <md-list>
    <md-list-item
      v-for="component in components" :key="component.id"
      @click="ADD_ELEMENT({pageIndex, el: component})"
    >
      <md-icon>settings</md-icon> <span>{{ component.name }}</span>
    </md-list-item>
  </md-list>
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
