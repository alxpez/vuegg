<template>
  <!-- Drawer always open in large screens. Header is always shown -->
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header v-mdl class="mdl-layout__header">
      <top-bar></top-bar>
    </header>
    <div v-mdl class="mdl-layout__drawer">
      <side-bar></side-bar>
    </div>
    <main v-mdl class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import TopBar from '@/components/header'
import SideBar from '@/components/drawer'

export default {
  name: 'app',
  components: { TopBar, SideBar }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #eeeeee;
}
</style>

<style scoped>
.mdl-layout__header{
  background-color: inherit;
  box-shadow: 0 0 0;
}
</style>
