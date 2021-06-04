<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: 'GridView',
    props: {
      // 显示列数
      cols: {
        type: Number,
        default: 2
      },
      // 上下(vertical)margin
      hMargin: {
        type: Number,
        default: 8
      },
      // 左右(horizontal)margin
      vMargin: {
        type: Number,
        default: 8
      },
      // item间距
      itemSpace: {
        type: Number,
        default: 8
      },
      // 每行间距
      lineSpace: {
        type: Number,
        default: 8
      }
    },
    mounted() {
      setTimeout(this.autoLayout, 20)
    },
    updated() {
      this.autoLayout()
    },
    methods: {
      autoLayout() {
        // 获取gridView的DOM元素和所有子元素
        let gridEl = this.$refs.gridView;
        let children = gridEl.children;
        // 设置gridEl的padding
        gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`;
        // 计算每个item的width 
        let itemWidth = (gridEl.clientWidth - 2 * this.hMargin - (this.cols - 1) * this.itemSpace) / this.cols;
        // 设置item的width、margin-right和margin-top
        for (let i = 0;i < children.length;i++) {
          let item = children[i];
          item.style.width = itemWidth + 'px';
          // 给除了每一行最后一个item设置margin-right
          if ((i + 1) % this.cols !== 0) {
            item.style.marginRight = this.itemSpace + 'px';
          }
          // 给除了第一行的item设置margin-top
          if (i >= this.cols) {
            item.style.marginTop = this.lineSpace + 'px';
          }
        }
      }
    },
    }
</script>


<style scoped>
  .grid-view {
    display: flex;
    flex-wrap: wrap;
  }
</style>