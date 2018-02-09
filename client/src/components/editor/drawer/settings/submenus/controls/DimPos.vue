<template>
<div class="content-wrapper">
  <div v-if="hasDim" class="element-set element-set__left" :class="{'no-check': !hasPos}">
    <mdc-textfield v-model="h" label="Height" :disabled="(h === 'auto')" dense/>
    <input v-if="hasPos" type="checkbox" :checked="!isNaN(parseInt(h))" @change="onCheckChanges('height')"/>
  </div>

  <div v-if="hasDim" class="element-set element-set__right" :class="{'no-check': !hasPos}">
    <mdc-textfield v-model="w" label="Width" :disabled="(w === 'auto')" dense/>
    <input v-if="hasPos" type="checkbox" :checked="!isNaN(parseInt(w))" @change="onCheckChanges('width')"/>
  </div>


  <div v-if="hasPos" class="element-set element-set__left">
    <mdc-textfield v-model="t" label="Top" :disabled="(t === 'auto')" dense/>
    <input type="checkbox" :checked="!isNaN(parseInt(t))" @change="onCheckChanges('top')"/>
  </div>

  <div v-if="hasPos" class="element-set element-set__right">
    <mdc-textfield v-model="l" label="Left" :disabled="(l === 'auto')" dense/>
    <input type="checkbox" :checked="!isNaN(parseInt(l))" @change="onCheckChanges('left')"/>
  </div>


  <div v-if="hasPos" class="element-set element-set__left">
    <mdc-textfield v-model="b" label="Bottom" :disabled="(b === 'auto')" dense/>
    <input type="checkbox" :checked="!isNaN(parseInt(b))" @change="onCheckChanges('bottom')"/>
  </div>

  <div v-if="hasPos" class="element-set element-set__right">
    <mdc-textfield v-model="r" label="Right" :disabled="(r === 'auto')" dense/>
    <input type="checkbox" :checked="!isNaN(parseInt(r))" @change="onCheckChanges('right')"/>
  </div>
</div>
</template>


<script>
import { mapState } from 'vuex'
import { getComputedProp } from '@/helpers/positionDimension'

export default {
  name: 'dim-pos',
  props: {
    height: {type: [String, Number], default: 'auto'},
    width: {type: [String, Number], default: 'auto'},
    top: {type: [String, Number], default: 'auto'},
    bottom: {type: [String, Number], default: 'auto'},
    left: {type: [String, Number], default: 'auto'},
    right: {type: [String, Number], default: 'auto'},
    hasDim: {type: Boolean, default: true},
    hasPos: {type: Boolean, default: true}
  },
  computed: {
    h: {
      get () { return this.height },
      set (val) { this.emitChanges('height', val) }
    },
    w: {
      get () { return this.width },
      set (val) { this.emitChanges('width', val) }
    },
    t: {
      get () { return this.top },
      set (val) { this.emitChanges('top', val) }
    },
    l: {
      get () { return this.left },
      set (val) { this.emitChanges('left', val) }
    },
    b: {
      get () { return this.bottom },
      set (val) { this.emitChanges('bottom', val) }
    },
    r: {
      get () { return this.right },
      set (val) { this.emitChanges('right', val) }
    },

    ...mapState({
      elementO: state => state.app.selectedElements[0]
    })
  },
  methods: {
    onCheckChanges (prop) {
      this.$emit('change', {
        type: prop,
        value: (this[prop] === 'auto')
          ? getComputedProp(prop, this.elementO)
          : 'auto'
      })

      // If the element has no dimension properties,
      // oposite props (top/bottom and left/right)
      // can not be active at the same time
      if (!this.hasDim) {
        let opositeProp

        switch (prop) {
          case 'top': opositeProp = 'bottom'; break
          case 'bottom': opositeProp = 'top'; break
          case 'left': opositeProp = 'right'; break
          case 'right': opositeProp = 'left'; break
        }

        this.$emit('change', {
          type: opositeProp,
          value: (this[prop] === 'auto')
          ? 'auto'
          : getComputedProp(opositeProp, this.elementO)
        })
      }
    },

    emitChanges (type, value) {
      this.$emit('change', {type, value})
    }
  }
}
</script>


<style scoped>
.content-wrapper {
  width: 100%;
  height: 100%;
  margin: 1px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.element-set {
  display: inline-flex;
}
  .element-set.element-set__right .mdc-textfield-wrapper {
    margin-left: 8px;
  }
  .element-set.element-set__left .mdc-textfield-wrapper {
    margin-left: 20px;
  }
    .element-set.element-set__right.no-check .mdc-textfield-wrapper {
      margin-right: 20px;
      margin-left: 12px;
    }
    .element-set.element-set__left.no-check .mdc-textfield-wrapper {
      margin-right: 12px;
    }

  .element-set input {
    align-self: center;
    margin-top: 28px;
  }
    .element-set.element-set__right input {
      margin-right: 20px;
    }
    .element-set.element-set__left input {
      margin-right: 8px;
    }
</style>
