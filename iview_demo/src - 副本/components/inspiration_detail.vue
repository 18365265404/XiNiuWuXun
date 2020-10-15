<template>
  <div class="layout">
      <ul>
          <li v-for="(item,index) in detailList" :key="index">
              <img :src="qiniuHead+item.imgUrl" alt="">
          </li>
      </ul>
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
        msg: 'Welcome to Your Vue.js App',
        qiniuHead:url.qiniuH,
        detailList:[]
        }
    },
    methods:{
        // 初始化查询数据
        initData(params){
            getRequest(url.platformInspirationDetailsSelectInspirationDetailsList+"/"+params,{}).then(data=> {
            
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }

                this.detailList=data.data.data
                console.log("查询商品详情",data.data)
                
            }); 
        }
    },
    created(){
        const paramsObj = this.$route.query
        console.log("传递过来的参数",paramsObj.id)
        this.initData(paramsObj.id)
    }
}
</script>

