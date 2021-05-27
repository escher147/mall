<template>
  <div class="home-swiper">
    <!-- 在banners的图片数据请求到后再渲染轮播图，否则会默认显示是最后一张 -->
    <swiper 
          v-if="banners.length"
          :options="swiperOption" 
          ref="homeSwiper">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
            <img :src="item.image" @load="swImgLoad">
        </a>
      </swiper-slide>
    
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>


<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'HomeSwiper',
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          // 当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
          observer:true,
          // 当Swiper的祖先元素变化时，例如window.resize，Swiper更新
          observeParents: true,
          observeSlideChildren:true,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass: 'my-bullet-active',
          } 
        },
        isLoad: true
      }
    },
    methods: {
      swImgLoad(){
        // 只发射一次事件即可
        if (this.isLoad) {
          this.$emit('swImgLoad')
          this.isLoad = false;
        }
      }
    },
    activated() {
      // 在返回首页后调用slideTo，否则自动播放会卡住
     this.banners.length && this.$refs.homeSwiper.$swiper.slideTo(0, 0)

      // console.log(this.$refs.homeSwiper.$swiper);
    },
  }
</script>


<style scoped>
  @import '../../../../node_modules/swiper/css/swiper.min.css';
  .home-swiper img {
    width: 100%;
  }   
</style>

// 覆盖样式需要写在scope外面
<style>
   .home-swiper .swiper-pagination-bullet {
     background-color: #fff;
     opacity: 0.7;
   }
  .home-swiper .my-bullet-active {
    background-color: red;
  }
</style>