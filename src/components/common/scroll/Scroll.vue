<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    
  </div>
</template>


<script>
  import BSscroll from 'better-scroll'
  export default {
    name: '',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
      
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll(){
        if (!this.$refs.wrapper) {
          return
        }
        // 内部有scroll变量
        this.scroll = new BSscroll(this.$refs.wrapper, {
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad,
          observeDOM: true,
          click: true
        });
        // 实时监听滚动位置坐标
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', position => {
            this.$emit('scroll', position)
          })
        }
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      // 滚动到坐标(x,y)处，time时间内完成动作
      scrollTo(x, y, time=500){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // refresh方法重新计算scrollerHight
      refresh() {
        // console.log('-----');
        this.scroll && this.scroll.refresh()
      }
    }
    }
</script>


<style scoped>

</style>