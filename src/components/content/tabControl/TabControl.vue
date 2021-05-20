<template>
  <div class="tab-control">
    <div class="tab-control-item"
          v-for="(item, index) in titles" :key="index"
          :class="{active: index === currentIndex}"
          @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: '',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabClick(index) {
      // this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }
  }
</script>


<style scoped>
  .tab-control {
    display: flex;
    
  }
  .tab-control-item {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span {
    padding: 6px;
  }
  .active {
    color: var(--color-tint);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>