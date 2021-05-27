<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- 利用另一个tabControl组件完成吸顶效果 -->
    <tab-control 
            class="tab-control-fixed"
            :titles="['流行', '新款', '精选']" 
            @tabClick="tabClick" 
            v-show="isShowFixed"
            ref="tabControlFixed"></tab-control>
    <scroll class="home-content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            > 
      <home-swiper 
              :banners="banners"
              @swImgLoad="swImgLoad" ></home-swiper>

      <home-recommend :recommends="recommends"></home-recommend>

      <feature-view></feature-view>

      <tab-control 
            :titles="['流行', '新款', '精选']" 
            @tabClick="tabClick"
            ref="tabControl"></tab-control>
    
      <goods-list :goods="goods[currentType].list"></goods-list>

      <!-- 组件绑定事件需要.native修饰 -->
    </scroll>
    <back-top 
          @click.native="backClick"
          v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
  // 导入网络请求模块
  import { getHomeMultiData, getHomeGdata } from 'network/home'

  // 导入子组件
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from '@/views/home/childComponents/HomeSwiper'
  import HomeRecommend from '@/views/home/childComponents/HomeRecommend'
  import FeatureView from '@/views/home/childComponents/FeatureView'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import BackTop from '@/components/content/backTop/BackTop'
  import Scroll from '@/components/common/scroll/Scroll'
  
  // 导入其他
  import { debounce } from '@/common/utils'
  import { backTopMixin } from '@/common/mixin'
  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowbt: false,
        tabOffsetTop: 0,
        isShowFixed: false,
        saveY: 0

      }
    },
    mixins: [backTopMixin],
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop,

      Scroll
    },

    created() {
      // 获取首页数据
      this.getMultiData()
      this.getGdata('pop')
      this.getGdata('new')
      this.getGdata('sell')
      
    },
    mounted() {
      // 防抖动函数debounce，防止调用过于频繁
      const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 200)
      // 监听goodsListItem组件发射的图片加载事件
      this.$bus.$on('HometemImgLoad', () => {
        // this.$refs.scroll保证能拿到scroll对象 
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
      })
    },
    activated() {
      // 当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      this.$refs.scroll.refresh()
      // 滚动到saveY处
      this.$refs.scroll.scrollTo(0,this.saveY,1)
    },
    deactivated() {
      // 因轮播图和better-scroll都使用transform会存在冲突，需要离开首页时记录滚动距离，回到首页时又瞬间滚动记录的距离处
     this.saveY = this.$refs.scroll.getScrollY();
    },
    methods:{
      /* 
        网络请求
      */
      //  请求轮播图等数据
      getMultiData() {
        getHomeMultiData().then(res => {
          // console.log(res);
          const data = res.data.data;
          this.banners = data.banner.list;
          this.recommends = data.recommend.list;
        })
      },
      // 请求商品数据
      getGdata(type) {
        const page = this.goods[type].page + 1;
        getHomeGdata(type,page).then(res => {
          // console.log(res);
          const data = res.data.data;
          this.goods[type].list.push(...data.list);
          this.goods[type].page += 1;
          // 调用Scroll的finishPullUp方法才能多次上拉加载
          this.$refs.scroll && this.$refs.scroll.finishPullUp();
        })
      },
      /* 
        事件监听
      */
      // 商品栏切换
      tabClick(index){
        switch(index) {
          case 0: 
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
          default:
            break;
        }
        // 两个tabControl点击后状态保持一致
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControlFixed.currentIndex = index;
      },
      // 返回顶部,使用混入mixin
      // backTopClick(){
      //   this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 500)
      // },
      // 页面滚动
      contentScroll(position) {
        // -position.y > 1500 ? this.isShowbt = true : this.isShowbt = false
        // 是否显示返回顶部按钮
        this.isShowBackTop = (-position.y) > 1500;
        // 吸顶效果
        this.isShowFixed = (-position.y) >= this.tabOffsetTop;

      },
      // 上拉加载更多
      loadMore() {
        this.getGdata(this.currentType)
      },
      // 轮播图加载完毕
      swImgLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        // 利用$el获取组件中的标签元素并保存tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;

      }
    }
  }
</script>

<style scoped>
  #home {
   height: 100vh;
   position: relative; 
  }
  .nav-bar {
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
    font-weight: 700;
  }
  .home-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
  
  .tab-control-fixed {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }
</style>
