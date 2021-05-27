<template>
  <div class="size-param" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size" 
           v-for="(table, tableIndex) in paramInfo.sizes" :key="tableIndex">
      <tr v-for="(tr, trIndex) in table" :key="trIndex">
        <td v-for="(td, tdIndex) in tr" :key="tdIndex">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(item, index) in paramInfo.infos" :key="index">
        <td class="param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
    <div class="param-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>


<script>
  export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
    }
</script>


<style scoped>
  .size-param {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .size-param table {
    width: 100%;
    border-collapse: collapse;
  }

  .size-param table tr {
    height: 42px;
  }

  .size-param table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .param-key {
    /*当value的数据比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }
  .param-img img {
    width: 100%;
  }
</style>