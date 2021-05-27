<template>
  <div class="detail-swiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in topImages" :key="index">       
            <img :src="item">        
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
      topImages:{
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
          // observer:true,
          // // 当Swiper的祖先元素变化时，例如window.resize，Swiper更新
          // observeParents: true,
          // observeSlideChildren:true,
          
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          } 
        },
        
      }
    },
    
  }
</script>


<style scoped>
  @import '../../../../node_modules/swiper/css/swiper.min.css';
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
  .detail-swiper img {
    width: 100%;
  }   
</style>

// 覆盖样式需要写在scope外面
<style>
  /* 加上.detail-swiper防止与首页的swiper样式冲突 */
  .detail-swiper .swiper-pagination {
    top: 266px;
    margin-left: 80%;
    width: 50px;
    height: 20px;
    line-height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    opacity: 0.85;
   }
</style>