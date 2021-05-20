<template>
  <div class="home-swiper">
    <swiper :options="swiperOption">
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
          observer:true,
          autoplay: {
            delay: 3000,
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
    }
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
   .swiper-pagination-bullet {
     background-color: #fff;
     opacity: 0.7;
   }
  .my-bullet-active {
    background-color: red;
  }
</style>