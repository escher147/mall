<template>
  <div class="sub-category">
    <grid-view v-if="subCategories.list" :cols="3" :line-sapce="15" :v-margin="20" >
      <div class="sub-item" v-for="(item,index) in subCategories.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" class="item-img" @load="subImgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>


<script>
  import GridView from '@/components/common/gridView/GridView'
  export default {
    name: 'SubCategory',
    props: {
      subCategories: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    components: {
      GridView
    },
    data() {
      return {
        isLoad: true
      }
    },
    methods: {
      subImgLoad(){
        // 只发射一次事件即可
        // if (this.isLoad) {
          this.$emit('subImgLoad')
        //   this.isLoad = false;
        // }
      }
    },
    }
</script>


<style scoped>
   .sub-item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>