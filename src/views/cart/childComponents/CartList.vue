<template>
  <div>
    <div v-if="cartList.length !== 0" class="product-list">
      <cart-list-item v-for="(item, index) in cartList" :key="index"
            :item-info="item"></cart-list-item>
    </div>
    <div v-else class="empty">购物车空空如也</div>
  </div>
</template>


<script>
  import CartListItem from '@/views/cart/childComponents/CartListItem'
  export default {
    name: 'CartList',
    components: {
      CartListItem
    },
    computed: {
      cartList() {
        return this.$store.state.cartList
      }
    }
    }
</script>


<style scoped>
  
  .empty {
     position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 70px;
    font-size: 18px;
    color: #999;
  }
</style>