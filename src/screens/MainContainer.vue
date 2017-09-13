<template>
  <div class="pageContainer">
    <!-- TODO: Add pages/routes to mockdata and implement for each on canvas -->
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'main-container'
}
</script>


<style scoped>
.pageContainer {
  margin-top: 15px;
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
