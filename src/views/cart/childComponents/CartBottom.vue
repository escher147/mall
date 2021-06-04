<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button class="check-button"
            :is-selected="isSelectAll"
            @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:￥{{totalPrice}}</div>
    <div class="to-settle" @click="settleClick">
      去结算({{selectLength}})
    </div>
  </div>
</template>


<script>
 import CheckButton from '@/views/cart/childComponents/CheckButton'
  export default {
    name: 'CartBottom',
    components: {
      CheckButton
    },
    methods: {
      selectAllClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        }
      },
      settleClick() {
        if (!this.selectLength) {
          // toast普通实现方式
          // this.$emit('selectNull')

          // toast插件实现方式
          this.$toast.show('请选择要购买的商品', 1500)
        }
      }
    },
    computed: {
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) {
          return false;
        }
        return !this.$store.state.cartList.find(item => !item.checked)
      },
      totalPrice() {
        return this.$store.state.cartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      selectLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      }
    },
    }
</script>


<style scoped>
  .bottom-bar {
   width: 100%;
   height: 50px;
   position: absolute;
   bottom: 49px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #fff;
   border-top: 1px solid #eee;
   border-bottom: 1px solid #ccc;
 }
  .select-all {
    width: 70px;
    display: flex;
    margin-left: 5px;
    font-size: 14px;
  }
  .select-all .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .total-price {
    flex: 1;
    align-items: center;
    margin-left: 10px;
    font-size: 16px;
    color:#333;
  }
  .to-settle {
    width: 90px;
    /* height: 100%; */
    /* display: flex;
    align-items: center;
    justify-content: center; */
    text-align: center;
    line-height: 50px;
    background-color: var(--color-tint);
    color: #fff;
    font-size: 14px;
  }
</style>