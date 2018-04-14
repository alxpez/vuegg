<template>
  <div class="headegg mdc-theme--background" :class="{'not-scrolled': scroll0}">
    <a class="home-btn" href="https://vuegg.github.io/" target="_blank">
      <svgicon icon="product/vuegg" width="40" height="40" :original="true"></svgicon>
    </a>

    <input class="title-input" v-model="tmpProjectTitle" @blur="onTitleBlur"
      title="Project title" placeholder="Project title"/>

    <div class="spacer"></div>
    <action-bar></action-bar>
    <user-menu></user-menu>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import { updateProject } from '@/store/types'

import UserMenu from './UserMenu'
import ActionBar from './ActionBar'

import '@/assets/icons/product/vuegg'

export default {
  name: 'headegg',
  components: { ActionBar, UserMenu },
  props: ['scroll0'],
  data: function () {
    return {
      tmpProjectTitle: ''
    }
  },
  computed: mapState({
    project: state => state ? state.project : {},
    projectTitle: state => state ? state.project.title : ''
  }),
  methods: {
    onTitleBlur () {
      if (this.tmpProjectTitle && (this.tmpProjectTitle !== this.projectTitle)) {
        this.updateProject({title: this.tmpProjectTitle})
      } else {
        this.tmpProjectTitle = this.projectTitle
      }
    },
    ...mapMutations([updateProject])
  },
  created: function () {
    this.tmpProjectTitle = this.projectTitle
  },
  watch: {
    'projectTitle': function (val) {
      this.tmpProjectTitle = val
    }
  }
}
</script>


<style scoped>

.headegg {
  z-index: 1000;
  height: 64px;
  width: calc(100% - 240px);
  color: rgba(0,0,0,0.66);
  padding: 0 25px 0 25px;
  margin-right: 240px;
  border: none;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-self: stretch;
  align-items: center;
  box-sizing: border-box;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);

  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-property: max-height,box-shadow;
}
.not-scrolled {
  box-shadow: none;
}

/* IN DEVICES SMALLER THAN 1024px -> NO DRAWER (so remove margins) */
@media screen and (max-width: 1024px) {
  .headegg {
    margin: 0px;
    width: 100%;
  }
}

.home-btn {
  margin-right: 25px;
  border: none;
  border-radius: 50%;
  padding: 0;
  background-color: transparent;
  outline: none;
}

.spacer {
  width: 12px;
}

.title-input {
  flex-grow: 1;
  border: 0;
  height: 56px;
  background: transparent;
  outline: none;
}
</style>
