<template>
  <div class="home-recommend"> 
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  }
</script>


<style scoped>
  .home-recommend {
    display: flex;
    width: 100%;
    padding: 16px 0 20px;
    text-align: center;
    font-size: 12px;
    border-bottom: 5px solid #eee;
  }
  .recommend-item {
    flex: 1;
  } 

  .recommend-item img {
    width: 85%;
    margin-bottom: 10px;
  }
</style>