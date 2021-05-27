<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment ref="comment" :comment-info="commentInfo"></detail-comment>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>


<script>
  // 引入子组件
  import DetailNavBar from './childComponents/DetailNavBar'
  import DetailSwiper from './childComponents/DetailSwiper'
  import DetailBaseInfo from '@/views/detail/childComponents/DetailBaseInfo'
  import DetailShopInfo from '@/views/detail/childComponents/DetailShopInfo'
  import DetailGoodsInfo from '@/views/detail/childComponents/DetailGoodsInfo'
  import DetailParamInfo from '@/views/detail/childComponents/DetailParamInfo'
  import DetailComment from '@/views/detail/childComponents/DetailComment'
  import DetailBottomBar from '@/views/detail/childComponents/DetailBottomBar'

  import BackTop from '@/components/content/backTop/BackTop'
  import GoodsList from '@/components/content/goods/GoodsList'
  import Scroll from '@/components/common/scroll/Scroll'

  import { getDetail, getRecommend, GoodsInfo, Shop, GoodsParam } from '@/network/detail'
  import  { backTopMixin } from '@/common/mixin'
  import { debounce } from '@/common/utils'
  export default {
    name: 'Detail',
    data() {
      return {
        topImages:[],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        sectionOffsetTop: [],
        currentIndex: 0
      }
    },
    mixins: [backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      DetailBottomBar,

      BackTop,
      GoodsList,
      Scroll
    },
    created() {
      // this.getGoodsDetail(this.$route.params.iid)
      this.getGoodsDetail(this.$route.query.iid)
      // console.log(this.$route);
    },
    methods: {
      getGoodsDetail(iid) {
        getDetail(iid).then(res => {
          const data = res.data.result;
          // console.log(data);
          // 获取顶部图片
          this.topImages = data.itemInfo.topImages;

          // 获取商品基本信息
          this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
          // console.log(this.goodsInfo);

          // 获取店铺信息
          this.shopInfo = new Shop(data.shopInfo);
          // console.log(this.shopInfo);

          // 获取商品详细信息
          this.detailInfo = data.detailInfo;
          // console.log(this.detailInfo);

          // 获取商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          // console.log(this.paramInfo);

          // 获取评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
            // console.log(this.commentInfo);
          }

          //获取推荐数据
          getRecommend().then(res => {
            this.recommends = res.data.data.list;
            // console.log(this.recommends);
          })
        })
        
      },
      imageLoad() {
        // 监听图片加载让better-scroll重新计算滚动高度
        this.$refs.scroll.refresh()
        // 获取各部分的offsetTop
        this.sectionOffsetTop = [];
        this.sectionOffsetTop.push(0);
        this.sectionOffsetTop.push(this.$refs.param.$el.offsetTop);
        this.sectionOffsetTop.push(this.$refs.comment.$el.offsetTop);
        this.sectionOffsetTop.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.sectionOffsetTop);
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.sectionOffsetTop[index], 500)
      },
      contentScroll (position) {
        const positionY = -position.y;
        for(let i = this.sectionOffsetTop.length - 1;i >= 0;i--){
         
          if (positionY >= this.sectionOffsetTop[i]) {
            
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
            break
          }
        }
        this.isShowBackTop = -(position.y) > 1500
      }
    },
    mounted(){
      // 监听GoodsListItem中图片加载完成
      // $bus默认情况下是undefined，需要给Vue.prototype.$bus赋值一个Vue实例
      const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,300)
      // 每次加载一张图片调用refresh函数，refresh函数执行debounce返回的函数
      this.$bus.$on('detailItemImgLoad', () => {  
        
        refresh()
    })
    
    }
    }
</script>


<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  
  .content {
     position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
</style>