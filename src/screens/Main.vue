<template>
  <div>
    <h1>Build shit with this components</h1>
    <a href="#/edit">Edit</a>

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
