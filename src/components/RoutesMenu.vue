<template>
  <v-flex xs3>
    <v-select
      :items="pages"
      v-model="activePage"
      item-text="name"
      item-value="id"
      append-icon="insert_drive_file"
      single-line
      hide-details
      return-object
      persistent-hint
      :hint="activePage.path"
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
      activePage: {}
    }
  },
  mounted () {
    this.activePage = this.pages[0]
  }
}
</script>
