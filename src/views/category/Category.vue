<template>
  <div id="category">
    <nav-bar class="category-nav">
      <template v-slot:center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    
    <div class="content">
      <tab-menu :categories="categories" @menuClick="menuClick"></tab-menu>
      <div class="tab-content">
        <tab-control 
            class="tab-control-fixed"
            :titles="['综合', '新品', '热销']" 
            @tabClick="tabClick" 
            v-show="isShowFixed"
            ref="tabControlFixed"></tab-control>
        <scroll id="tab-content" 
              @scroll="contentScroll"
              :probe-type="3"> 
          <sub-category :sub-categories="showSubCategories" @subImgLoad="subImgLoad"></sub-category>
          <tab-control 
              :titles="['综合', '新品', '热销']" 
              @tabClick="tabClick"
              ref="tabControl"></tab-control>
          <category-detail :category-detail="showCategoryDetail"></category-detail>
        </scroll>
      </div>
      
     
    </div>
  </div>
</template>


<script>
 import NavBar from '@/components/common/navbar/NavBar'
 import TabMenu from '@/views/category/childComponents/TabMenu'
 import SubCategory from '@/views/category/childComponents/SubCategory'
 import CategoryDetail from '@/views/category/childComponents/CategoryDetail'

 import Scroll from '@/components/common/scroll/Scroll'
 import TabControl from '@/components/content/tabControl/TabControl'

 import { getCategory, getSubCategory, getCategoryDetail } from 'network/category'
 import { tabControlMixin } from 'common/mixin'

  export default {
    name: 'Category',
    components: {
      NavBar,
      TabMenu,
      SubCategory,
      CategoryDetail,

      Scroll,
      TabControl
    },
    mixins: [tabControlMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        tabOffsetTop: 0,
        isShowFixed: false,
      }
    },
    created() {
      this.getCategoryData()
    },
    computed: {
      showSubCategories() {
        if (this.currentIndex === -1) {
          return {};
        } 
        return this.categoryData[this.currentIndex].subCategories;       
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) {
          return [];
        } 
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      getCategoryData() {
        getCategory().then(res => {
          // console.log(res);
          const data = res.data.data.category.list;
          this.categories = data;
          // 初始化categoryData         
           /* ** categoryData结构：{
                0: {
                    subCategories,
                    categoryDetail
                    }} 
            ** */
          for (let i = 0;i < this.categories.length;i++) {
            this.categoryData[i] = {
              subCategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 默认显示第一个分类数据
          this._getSubCategory(0)
          // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        })
      },
      _getSubCategory(index) {
        this.currentIndex = index;
        const maitKey = this.categories[index].maitKey;
        getSubCategory(maitKey).then(res => {
          // console.log(res);
          this.categoryData[index].subCategories = res.data.data;
          // console.log(this.categoryData);
          this.categoryData = {...this.categoryData }
          // console.log(this.categoryData);
          
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
          

        })
      },
      _getCategoryDetail(type) {
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res => {
          // console.log(res);
          this.categoryData[this.currentIndex].categoryDetail[type] = res.data;
          this.categoryData = {...this.categoryData }
        })
      },
      menuClick(index) {
        this.$refs.tabControl.currentIndex = 0;
        this.$refs.tabControlFixed.currentIndex = 0;
        this.currentType = 'pop'
        this._getSubCategory(index);
      },
      contentScroll(position) {
        // 吸顶效果
        this.isShowFixed = (-position.y) >= this.tabOffsetTop;
        // console.log(position);
      },
      subImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      }

    },
    activated() {
      // 当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
       this.$refs.scroll && this.$refs.scroll.refresh()
    },
    mounted() {
      // 监听goodsListItem组件发射的图片加载事件
      this.$bus.$on('categoryItemImgLoad', () => {
        // this.$refs.scroll保证能拿到scroll对象 
        this.$refs.scroll && this.$refs.scroll.refresh()      
      })
    },
    }
</script>


<style scoped>
  #category {
    height: 100vh;
  }
  .category-nav {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: var(--color-tint);
  }
  .content {
    position: absolute ;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
  }
  .tab-content {
    flex: 1;
  }
  #tab-content {
    height: 100%;
    /* flex: 1; */
  }
  .tab-control-fixed {
    position: absolute;
    left: 100px;
    right: 0;
    z-index: 2;
    background-color: #fff;
  }
</style>