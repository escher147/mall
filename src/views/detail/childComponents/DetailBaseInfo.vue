<template>
  <!-- 注意：这里不能通过v-show做判断，带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display。
    v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 -->
  <div v-if="Object.keys(goodsInfo).length !== 0" class="base-info">
    <div class="info-title">{{goodsInfo.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goodsInfo.newPrice}}</span>
      <span class="o-price">{{goodsInfo.oldPrice}}</span>
      <span v-if="goodsInfo.discount" class="discount">{{goodsInfo.discount}}</span>
    </div>
    <div class="info-other">
        <span>{{goodsInfo.columns[0]}}</span>
        <span>{{goodsInfo.columns[1]}}</span>
        <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
      </div>
    <div class="info-service">
      <!-- v-for遍历数字，如v-for="index in 3"会得到1,2,3三项 -->
      <span class="info-service-item" v-for="index in goodsInfo.services.length-1" :key="index">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        <span>{{goodsInfo.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goodsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    }
</script>


<style scoped>
   .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color: #222;
    font-size: 14px;
  }
   .info-price {
    margin-top: 10px;
  }
  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 13px;
    margin-left: 7px;
    text-decoration: line-through;
  }
  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 7px;
    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }
   .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    flex-wrap: wrap;
  }
  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .info-service-item span {
    font-size: 12px;
    color: #666;
    margin-left: 2px;
  }
  
</style>