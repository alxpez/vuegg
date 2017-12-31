<template>
  <div class="menus-wrapper">
    <menu-toggle :menuHeader="'Dimensions'">
      <div class="el-menu">
        <mdc-textfield v-model="height" @blur="saveChanges" label="Height (px)" class="text-input" dense/>
        <mdc-textfield v-model="width"  @blur="saveChanges" label="Width (px)" class="text-input" dense/>
      </div>
    </menu-toggle>

    <menu-toggle v-if="selectionType === 'page'" :menuHeader="'PAGE settings'">
      <div class="el-menu">
        <input type="color" v-model="styles.background">
      </div>
    </menu-toggle>

    <menu-toggle v-if="selectionType === 'multiple'" :menuHeader="'MULTI settings'">
      <div class="el-menu">
        Settings for multiple selected elements
      </div>
    </menu-toggle>

    <menu-toggle v-if="selectionType === 'single'" :menuHeader="'SINGLE settings'">
      <div class="el-menu">
        Settings for a single element
      </div>
    </menu-toggle>
  </div>
</template>


<script>
import cloneDeep from 'clone-deep'
import { mapState, mapMutations } from 'vuex'
import { updatePage, updateEgglement } from '@/store/types'

import MenuToggle from '@/components/common/MenuToggle'
import '@/assets/icons/system'

export default {
  name: 'settings-menu',
  components: { MenuToggle },
  data: function () {
    return {
      name: null,
      path: null,
      height: null,
      width: null,
      top: null,
      left: null,
      attrs: {},
      styles: {},
      classes: {}
    }
  },
  computed: {
    selectionType () {
      return (this.selectedElements.length === 0)
        ? 'page'
        : (this.selectedElements.length > 1)
          ? 'multiple'
          : 'single'
    },

    selectedItem () {
      return (this.selectedElements.length === 0)
        ? this.activePage
        : (this.selectedElements.length > 1)
          ? this.selectedElements
          : this.selectedElements[0]
    },

    ...mapState({
      activePage: state => state.app.selectedPage,
      selectedElements: state => state.app.selectedElements
    })
  },
  methods: {
    saveChanges (e) {
      // TODO: save setting changes
      console.log(e)
    },

    ...mapMutations([updatePage, updateEgglement])
  },
  watch: {
    'selectedItem': function (val) {
      if (!Array.isArray(val)) {
        this.name = val.name
        this.path = val.path
        if (val.height) this.height = val.height.toString()
        if (val.width) this.width = val.width.toString()
        if (val.top) this.top = val.top.toString()
        if (val.left) this.left = val.left.toString()
        this.attrs = cloneDeep(val.attrs)
        this.styles = cloneDeep(val.styles)
        this.classes = cloneDeep(val.classes)
      } else {
        this.height = null
        this.width = null
        this.top = null
        this.left = null
      }
    }
  }
}
</script>


<style scoped>
.menus-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: calc(100% - 58px);
  width: 100%;
  position: absolute;
  overflow-y: auto;
}

.el-menu {
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.text-input {
  margin: 0 20px;
}

</style>
