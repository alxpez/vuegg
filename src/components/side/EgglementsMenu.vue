<template>
  <div id="elMenu" class="list-group">
    <a href="#"
      v-for="element in elements" :key="elKey"
      @click="registerAndSaveEgglement({pageId, el: element})"
      class="list-group-item list-group-item-action"
    >
      {{element.name}}
    </a>
  </div>
</template>


<script>
import shortid from 'shortid'
import { mapActions } from 'vuex'
import { registerAndSaveEgglement } from '@/store/types'
import MockData from '@/assets/mockdata'

export default {
  name: 'egglements-menu',
  methods: mapActions([registerAndSaveEgglement]),
  data: function () {
    return {
      elements: MockData.elements
    }
  },
  computed: {
    elKey () {
      return shortid.generate()
    },
    pageId () {
      return this.$route.query.page
    }
  }
}
</script>
