import BackTop from '@/components/content/backTop/BackTop'
export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        }
    },
}

export const tabControlMixin = {
    data: function() {
        return {
            currentType: 'pop'
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            // 两个tabControl点击后状态保持一致
            this.$refs.tabControl.currentIndex = index;
            this.$refs.tabControlFixed.currentIndex = index;
        }
    }
}