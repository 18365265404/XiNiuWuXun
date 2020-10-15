
<template>
  <div v-html="content" class="layout">
      
  </div>
</template>

<script>
import local_storage from '@/utils/local_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {

  name: 'HelloWorld',
  data () {
    return {
      content:''
    }
  },
  methods:{
    // 初始化查询数据
      initData(params){
          getRequest(url.platformCorporateBankingGetCorporateBanking,params).then(data=> {
          
              if(data.data.status!=1){
                  this.$Message.error(data.data.message);
                  return
              }


              console.log("查询所有商品",data.data.data)
              this.content = data.data.data.imgTex
              
          }); 
      }
  },
  created(){
    this.initData()
  },
  
}
</script>

