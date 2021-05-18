<template>
  <div id="tab-bar-item" @click="active">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="active-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    
  </div>
</template>


<script>
export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isActive() {
      // 判断当前页面是否处于活跃
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : ''
    }
  },
  methods: {
    active() {
      this.$router.replace(this.path).catch(() => {})
      // console.log(this.$router);
    }
  }
  }
</script>


<style scoped>
  #tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  #tab-bar-item img {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    margin-bottom: 2px;
  }
</style>