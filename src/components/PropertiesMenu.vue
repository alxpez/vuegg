<template>
  <button @click='generate()'>Generate</button>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import * as download from 'downloadjs'

export default {
  name: 'properties-menu',
  computed: mapState(['project']),
  methods: {
    async generate () {
      try {
        let resp = await axios.post('/api/generate', this.project, {responseType: 'blob'})
        download(resp.data, this.project.title + '.zip', resp.data.type)
      } catch (error) {
        console.error('CHECK IF THE BACKEND SERVER IS UP AND RUNNING')
        console.error(error)
      }
    }
  }
}
</script>
