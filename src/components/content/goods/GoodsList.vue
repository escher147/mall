<template>
  <div class="goods-lsit">
    <goods-list-item :goods-item="item" v-for="(item, index) in goods" :key="index">      
    </goods-list-item>
    
  </div>
</template>


<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: '',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
    }
</script>


<style scoped>
  .goods-lsit {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
    padding-top: 8px;
  }
</style>