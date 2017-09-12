<template>
  <div class="pageContainer">
    <router-link tag="md-button" to="/edit" class="md-accent">Go to edit</router-link>

    <!-- TODO: Add pages/routes to mockdata and implement for each on canvas -->
    <page></page>
  </div>
</template>


<script>
import Page from '@/components/Page'

export default {
  components: { Page }
}
</script>


<style scoped>
.pageContainer {
  align-content: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
