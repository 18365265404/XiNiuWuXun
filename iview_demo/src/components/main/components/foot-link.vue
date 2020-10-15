<template>
  <div class="foot-link ">
    <ul class="layout link" >
      <li v-for="(item,index) in linkList" :key="index">
        <a style="color:white" target="_blank" :href="item.link">{{item.designation}}</a>
      </li>
      <!-- <li>
        <router-link  tag="a" :to="{path:'aboutUs'}" ><span>我的订单</span></router-link>
      </li> -->
    </ul>
    <div class="foot" >
        <!-- <span>Copyright © 2016-2019 上海手取信息科技有限公司版权所有 沪ICP备16041404号</span> -->
        <span><a style="color:white" :href="recordList.link" target="_blank" rel="noopener noreferrer">{{recordList.designation}}</a></span>
    </div>
  </div>
</template>

<script>
import {getRequest,postRequest,putRequest} from '@/utils/ajax';
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
export default {
  name: 'HelloWorld',
  data () {
    return {
      theme2: 'light',
      linkList:[],
      recordList:''
    }
  },
  computed:{
     userData(){
       return this.$store.state.a.userData;
     },
  },
  // watch:{
  //   isLogin(a,b){
  //     console.log(a)
  //   }
  // },
  methods:{
    goLogin(){
      this.$router.push("/login");
    },
    goReg(){
      this.$router.push("/register");
    },
    loginOut(){
      postRequest(url.userLoginOutLogin, {
           

      }).then(data=> {
          // console.log("商品三级菜单",data.data.data)
          if(data.data.status!=1){
             return
          }
          
          sessionStorage.clear()
          this.$Message.success('退出成功');
          this.$store.commit('userData','')
         
          

          
      });
      
      
      // session_storage.storageDelet('username')
    }
  },
  created(){
    getRequest(url.platformLinksSelectLinksList, {
           

      }).then(data=> {
         
          if(data.data.status!=1){
             return
          }
          this.linkList=data.data.data
          console.log("友情链接",data.data.data)
         
          

          
      });

      getRequest(url.platformRecordInformationGetRecordInformation, {
           

      }).then(data=> {
         
          if(data.data.status!=1){
             return
          }
          this.recordList=data.data.data
          console.log("备案信息",data.data.data)
         
          

          
      });

      
    
  }
}
</script>
<style lang="less">
.foot-link {
  min-height: 100px;
  // padding: 20px;
  color: white;
  background: #333333;
  .link{
    padding: 20px 0;
  }
  ul{
    display: flex;
    li{
      margin-right: 30px;
    }
  }
}
.foot{
    display: flex;
    height: 50px;
    background: black;
    color: white;
    justify-content: center;
    line-height: 50px;
  }
</style>

