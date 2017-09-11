<template>
  <md-list>
    <md-list-item v-for="component in components" :key="component.id" href="#/" @click="ADD_ELEMENT(component)">
      <md-icon>settings</md-icon> <span>{{ component.name }}</span>
    </md-list-item>
  </md-list>
</template>


<script>
import { mapMutations } from 'vuex'
import { ADD_ELEMENT } from '@/store/mutation-types'
import MockData from '@/assets/mockdata'

export default {
  methods: mapMutations([ADD_ELEMENT]),
  data: function () {
    return {
      components: MockData.components
    }
  }
}
</script>
