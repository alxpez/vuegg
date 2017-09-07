<template>
  <div class="editView">
    <h1>{{ msg }}</h1>
    <a href="#/">Back to main</a>
  </div>
</template>

<script>
export default {
  name: 'editView',
  data () {
    return {
      msg: 'This is the EDIT view'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
