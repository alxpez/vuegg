<template>
    <span v-if="typeless">{{yolk.text}}</span>
    <component v-else :class="yolk.classes" v-bind="yolk.props" :is="yolk.type">
      <yolk
        v-if="hasChildren"
        v-for="child in yolk.children"
        :key="child.id"
        :yolk="child"
      ></yolk>
    </component>
</template>


<script>
export default {
  name: 'yolk',
  props: ['yolk'],
  computed: {
    hasChildren () {
      return (this.yolk.children && this.yolk.children.length > 0)
    },
    typeless () {
      return (typeof this.yolk.type === 'undefined')
    }
  }
}
</script>


<style scoped>
.yolk {
  margin: 0;
  /*padding: 0;*/
  width: 100%;
  height: 100%;
}
</style>
