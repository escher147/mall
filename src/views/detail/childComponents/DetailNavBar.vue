<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="">
        </div>
      </template>

      <template v-slot:center>
        <div class="title">
          <div class="title-item" 
               v-for="(item, index) in titles" :key="index"
               @click="titleClick(index)"
               :class="{active: currentIndex === index}">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>


<script>
  import NavBar from '@/components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品', '参数', '评论' , '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index)
      }
    },
    }
</script>


<style scoped>
  .nav-bar {
    text-align: center;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 14px;
  }
 .back {
   margin-top: 5px;
 }
 .active {
   color: var(--color-high-text);
 }
</style>