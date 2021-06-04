<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <scroll  class="content" ref="scroll">     
      <cart-list></cart-list>   
    </scroll>
    <cart-bottom @selectNull="selectNull"></cart-bottom>
    <!-- <toast :message="message" :isShow="isShow"></toast> -->

  </div>
</template>


<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import CartList from '@/views/cart/childComponents/CartList'
  import CartBottom from '@/views/cart/childComponents/CartBottom'

  import Scroll from '@/components/common/scroll/Scroll'
  // import Toast from '@/components/common/toast/Toast'
  export default {
    name: 'Cart',
    data() {
      return {
        // message: '',
        // isShow: false
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottom,

      Scroll,
      // Toast
    },
    computed: {
      cartLength() {
        return this.$store.state.cartList.length
      }
    },
    methods: {
      selectNull() {
        // toast普通实现方式
        // this.message = '请选择要购买的商品';
        // this.isShow = true;
        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = '';
        // }, 1500)

        
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    }
    }
</script>


<style scoped>
 .cart {
   position: relative;
   font-size: 16px;
   height: 100vh;
 }
  .cart-nav {
    text-align: center;
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 99px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>