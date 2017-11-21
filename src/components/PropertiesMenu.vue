<template>
  <button @click='generate()'>Generate</button>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'properties-menu',
  computed: mapState(['project']),
  methods: {
    async generate () {
      try {
        await axios.post('/api/generate', this.project)
        console.log('OK')
        console.log(this.project)
      } catch (error) {
        console.error('CHECK IF THE BACKEND SERVER IS UP AND RUNNING')
        console.error(error)
      }
    }
  }
}
</script>
