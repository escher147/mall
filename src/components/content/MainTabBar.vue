<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="#ff5777">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:active-icon>
          <img src="@/assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <span>首页</span>
        </template>
      </tab-bar-item>

       <tab-bar-item path="/category" activeColor="#ff5777">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:active-icon>
          <img src="@/assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <span>分类</span>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/cart" activeColor="#ff5777">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:active-icon>
          <img src="@/assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <span>购物车</span>
        </template>
      </tab-bar-item>
      
      <tab-bar-item path="/profile" activeColor="#ff5777">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:active-icon>
          <img src="@/assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <span>我的</span>
        </template>
      </tab-bar-item>

    </tab-bar>
  </div>
</template>


<script>
import TabBar from '@/components/common/tabBar/TabBar'
import TabBarItem from '@/components/common/tabBar/TabBarItem'
export default {
  name: 'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
  }
</script>


<style scoped>

</style>