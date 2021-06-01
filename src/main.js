import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from '@/components/common/toast'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 在Vue的prototype挂载bus属性，指向Vue的实例
Vue.prototype.$bus = new Vue()
    // 使用toast插件
Vue.use(Toast)
    // 使用VueLazyload插件
Vue.use(VueLazyload)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')