<template>
  <div id="tab-menu">
    <scroll id="menu-content">
        <div class="menu-list">
          <div class="menu-item" 
              v-for="(item, index) in categories" :key="index"
              :class="{active: index === currentIndex}"
              @click="menuClick(index)">
            {{item.title}}
          </div>
      </div>
    </scroll>
  </div>
</template>


<script>
  import Scroll from '@/components/common/scroll/Scroll'
  export default {
    name: 'TabMenu',
    components: {
      Scroll
    },
    props: {
      categories: {
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
      menuClick(index) {
        this.currentIndex = index;
        this.$emit('menuClick', index)
      }
    },
    }
</script>


<style scoped>
  /* #menu {
    position: relative;
    height: 100vh;
    
  } */
  #menu-content {
    height: 100%;
    
    overflow: hidden;
  }
  .menu-list {
    width: 100px;
    background-color: #fafafa;
    box-sizing: border-box;
  }
  .menu-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>