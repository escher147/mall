import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCount(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            payload.checked = true;
            state.cartList.push(payload)
        }
    },
    actions: {
        addCart(context, payload) {

            return new Promise((resolve, reject) => {
                let existProduct = context.state.cartList.find(item => item.iid === payload.iid);
                if (existProduct) {
                    context.commit('addCount', existProduct)
                    resolve('商品数量加一')
                } else {
                    payload.count = 1;
                    context.commit('addToCart', payload)
                    resolve('已添加到购物车')
                }
            })
        }
    },
})