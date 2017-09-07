<template>
  <div class="mainView">
    <h1>{{ msg }}</h1>
    <a href="#/edit">Edit</a>
  </div>
</template>

<script>
export default {
  name: 'mainView',
  data () {
    return {
      msg: 'This is the MAIN view'
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
