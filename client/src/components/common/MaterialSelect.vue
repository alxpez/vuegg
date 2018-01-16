<template>
  <div class="material-select__wrapper">
    <div class="material-select">
      <label class="material-select__label">{{label}}</label>
        <slot></slot>
      <div class="material-select__bottom-line"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'material-select',
  props: ['label']
}
</script>


<style scoped>
.material-select__wrapper {
  display: inline-flex;
  flex-flow: column;
}
.material-select {
  height: 48px;
  display: inline-flex;
  position: relative;
  align-items: flex-end;
  box-sizing: border-box;
  margin-top: 16px;
  margin-bottom: 8px;
}
.material-select__label {
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 0;
  font-size: .76rem;
  color: rgba(0, 0, 0, 0.5);
}
.material-select select {
  outline: none;
  text-transform: none;
  border-radius: 0;
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.04em;
  width: 100%;
  margin-bottom: 6px;
  margin-left: -8px;
  border: none;
  background: none;
  font-size: .813rem;
}
.material-select__bottom-line {
  width: 100%;
  bottom: 0;
  position: absolute;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
