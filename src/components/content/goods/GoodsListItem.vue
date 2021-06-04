<template>
  <div class="goods-item" @click="goodsItemClick">
    <!-- @load监听图片加载用以调用betterscroll的refresh方法 -->
      <img v-lazy="showImg" @load="imgLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">￥{{goodsItem.price}}</span>
        <span class="cfav">{{goodsItem.cfav}}</span>
      </div>
      
  </div>
</template>


<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        // 利用事件总线bus发射事件
        if (this.$route.path.indexOf('/home') !== -1 ) {
          this.$bus.$emit('homeItemImgLoad')
          
        } else if (this.$route.path.indexOf('/detail') !== -1) {
          this.$bus.$emit('detailItemImgLoad')         
        } else if (this.$route.path.indexOf('/category') !== -1) {
          this.$bus.$emit('categoryItemImgLoad')         
        }
      },
      goodsItemClick() {
        // this.$router.push('/detail/' + this.goodsItem.iid)
        this.$router.push({
          path:'/detail',
          query: {
            iid: this.goodsItem.iid
          }
        })
      }
    },
    computed: {
      showImg() {
        // 顺序不能反
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    mounted() {
      // console.log(this.goodsItem);
    },
    }
</script>


<style scoped>
  .goods-item {
    width: 48%;
    position: relative;
    padding-bottom: 40px;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    position: absolute;   
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    padding: 3px;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;

  }
   .goods-info .price {
    color: var(--color-high-text);
    margin-right: 25px;
  }
   .goods-info .cfav {
    position: relative;
  }
   .goods-info .cfav::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>