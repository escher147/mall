import Toast from '@/components/common/toast/Toast'
const toastObj = {};
toastObj.install = function(Vue) {
    // 创建组件构造器
    const toastConstructor = Vue.extend(Toast)
        // 根据组件构造器创建组件对象
    const toast = new toastConstructor()
        // 将组件挂载到某个元素上
    toast.$mount(document.createElement('div'))
        // 将toast.$el添加到页面
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default toastObj