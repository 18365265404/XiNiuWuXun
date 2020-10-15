<template>
  <div id="head" class="header-bar">
    <div class="header-bar-box layout">
      <img src="@/assets/images/logo6.png" alt="" style="width:45px;height:45px">
      <p>犀牛物讯供给平台</p>
      <div v-show="!userData.userId" class="header-bar-right header-bar-right-out"> 
        <!-- <a>帮助中心</a> -->
        <a @click="goLogin">登录</a>
        <a @click="goReg">注册</a>
      </div>
      <div v-show="userData.userId" class="header-bar-right header-bar-right1-in">
        <router-link  tag="a" :to="{path:'order'}" ><span>我的订单</span></router-link>
        <!-- <a>帮助中心</a> -->
        <a style="color:#cc3333">{{userData.nickname ? userData.nickname : userData.username}}</a>
        <a @click="loginOut">退出</a>
      </div>
      
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
    // let loginStatus = session_storage.storageGet('username')
    // this.isLogin = session_storage.storageGet('loginStatus')
    // console.log(session_storage.storageGet('loginStatus'))
    // if(loginStatus){
    //     this.isLogin = true
    // }
    
  }
}
</script>
<style lang="less">
.header-bar{
  background-color:#767676;
  
  
  .header-bar-box{
    height: 50px;
    display: flex;
    align-items: center;
    
    p{
      color: white;
      margin-left: 370px;
      flex: 1;
      font-size: 15px
    }
    .header-bar-right{
      display: flex;
      a{
        font-size: 15px;
        color: white;
        border-left: 2px solid white;
        padding: 0 10px;
        line-height: 14px;
        &:nth-child(1){
          border: none
        }
      }
    }
  }
}
</style>

