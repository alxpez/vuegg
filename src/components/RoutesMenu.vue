<template>
  <v-flex xs12>
    <v-select
      :items="pages"
      v-model="activePage"
      item-text="path"
      item-value="id"
      single-line
      prepend-icon="insert_drive_file"
      hide-details
      @input="changeHandler"
    ></v-select>
  </v-flex>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'routes-menu',
  computed: mapState(['pages']),
  methods: {
    changeHandler (value) {
      this.$router.replace({query: {page: value}})
    }
  },
  data () {
    return {
      activePage: 'home'
    }
  }
}
</script>
