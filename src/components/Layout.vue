<template>
  <div class="layout">
    <div class="layout-circles-wrapper">
      <div class="layout-circle"></div>
      <div class="layout-circle small red"></div>
      <div class="layout-circle small yellow"></div>
      <div class="layout-circle small green"></div>
    </div>
    <div class="layout-line"></div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped>
.layout-circles-wrapper {
  background-color: #ff4949;
  height: 45vh;
  display: flex;
  flex-direction: row;
}

.layout-circle {
  margin: 30px 0 0 40px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #5cccf1;
}

.layout-circle.small {
  width: 24px;
  height: 24px;
}

.layout-circle.small.red {
  background-color: red;
}

.layout-circle.small.yellow {
  background-color: yellow;
}

.layout-circle.small.green {
  background-color: yellowgreen;
}

.layout-line {
  background-color: black;
  height: 5vh;
}
</style>
