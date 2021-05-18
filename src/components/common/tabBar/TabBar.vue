<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'TabBar',
  }
</script>


<style scoped>
  #tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 49px;
    display: flex;
    background-color: #f6f6f6;
    box-shadow: 0 -2px 2px rgba(100,100,100,.2);
  }
</style>