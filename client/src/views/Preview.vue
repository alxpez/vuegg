<template>
  <div class="preview__wrapper" :style="previewStyle">
    <div class="preview">
      <prev-stage v-if="selectedPage" :page="selectedPage"></prev-stage>
    </div>

    <div class="action-bar__wrapper">
      <button v-tooltip="'phone'" class="action-btn" @click="breakpoint='sm'">
        <svgicon icon="system/dev_sm" width="24" height="24"
          :color="(breakpoint === 'sm') ? '#fff' : 'rgba(255,255,255,.5)'">
        </svgicon>
      </button>

      <button v-tooltip="'tablet'" class="action-btn" @click="breakpoint='md'">
        <svgicon icon="system/dev_md" width="24" height="24"
          :color="(breakpoint === 'md') ? '#fff' : 'rgba(255,255,255,.5)'">
        </svgicon>
      </button>

      <button v-tooltip="'full screen'" class="action-btn" @click="breakpoint='lg'">
        <svgicon icon="system/dev_lg" width="24" height="24"
          :color="(breakpoint === 'lg') ? '#fff' : 'rgba(255,255,255,.5)'">
        </svgicon>
      </button>

      <div class="separator"></div>

      <mdc-menu-anchor>
        <button v-tooltip="'Pages'" class="action-btn" @click="showPagesMenu">
          <svgicon icon="system/page" width="24" height="24" color="#fff"></svgicon>
        </button>
        <mdc-menu ref="pagesMenu" @select="({index})=>changePageIfNeeded(pages[index])">
          <mdc-menu-item v-for="page in pages" :key="page.id">{{page.name}}</mdc-menu-item>
        </mdc-menu>
      </mdc-menu-anchor>

      <router-link :to="{name: 'editor'}">
        <button v-tooltip="'Close'" class="action-btn">
          <svgicon icon="system/close" width="24" height="24" color="#fff"></svgicon>
        </button>
      </router-link>
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import { _changeActivePage } from '@/store/types'

import PrevStage from '@/components/preview/PrevStage'

import '@/assets/icons/system/page'
import '@/assets/icons/system/close'
import '@/assets/icons/system/dev_lg'
import '@/assets/icons/system/dev_md'
import '@/assets/icons/system/dev_sm'

export default {
  name: 'preview',
  components: { PrevStage },
  data: function () {
    return {
      breakpoint: 'lg'
    }
  },
  computed: {
    previewStyle () {
      return (this.breakpoint === 'sm')
        ? {height: '640px', width: '360px', paddingTop: '32px'}
        : (this.breakpoint === 'md')
          ? {height: '768px', width: '1024px', paddingTop: '12px'}
          : {height: '100%', width: '100%'}
    },

    ...mapState({
      selectedPage: state => state.app.selectedPage,
      pages: state => state ? state.project.pages : []
    })
  },
  methods: {
    showPagesMenu () {
      this.$refs.pagesMenu.show()
    },

    changePageIfNeeded (page) {
      if (page.id !== this.selectedPage.id) {
        this._changeActivePage(page)
      }
    },

    ...mapMutations([_changeActivePage])
  }
}
</script>


<style scoped>
.preview__wrapper {
  margin: auto;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.preview {
  height: 100%;
  width: 100%;
  overflow: scroll;

  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.action-bar__wrapper {
  height: 48px;
  z-index: 1000;
  bottom: 24px;
  right: 24px;
  padding: 0 6px;
  position: fixed;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.78);
  border-radius: 50px;
  opacity: 0.25;
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.action-bar__wrapper:hover {
  opacity: 1;
}

.action-btn {
  height: 36px;
  width: 36px;
  min-width: 28px;
  min-height: 28px;
  padding: 1px;
  margin: 0 6px;
  border-radius: 100%;

  background-color: transparent;
  border: 0px none;
  user-select: none;
  outline: none;
}
.action-btn:hover {
  background-color: rgba(238, 238, 238, 0.038);
}
.action-btn:active {
  background-color: rgba(238, 238, 238, 0.38);
}
.action-btn * {
  vertical-align: middle;
}

.separator {
  width: 1px;
  height: 16px;
  margin: 0 6px;
  background-color: rgba(255, 255, 255, 0.21);
}

.mdc-menu-item {
  max-width: 250px;
}
</style>
