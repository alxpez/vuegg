<template>
  <div id="compMenu" class="list-group">
    <a href="#"
      v-for="component in components" :key="compKey"
      @click="registerAndSaveEgglement({pageId, el: component})"
      class="list-group-item list-group-item-action"
    >
      {{component.name}}
    </a>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapActions } from 'vuex'
import { registerAndSaveEgglement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'componeggs-menu',
  methods: mapActions([registerAndSaveEgglement]),
  data: function () {
    return {
      components: MockData.components
    }
  },
  computed: {
    compKey () {
      return shortid.generate()
    },
    pageId () {
      return this.$route.query.page
    }
  }
}
</script>
