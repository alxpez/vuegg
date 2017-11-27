<template>
  <div id="app" class="container-fluid">
    <top-bar></top-bar>
    <div class="row">
      <side-bar></side-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/header'
import SideBar from '@/components/side'

export default {
  name: 'app',
  components: { TopBar, SideBar }
}
</script>


<style lang="scss">
@import "./styles/eggstrap.scss";
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fafafa;
}
</style>
