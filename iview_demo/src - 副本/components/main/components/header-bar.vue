<template>
  <div id="head" class="header-bar">
    <div class="header-bar-box layout">
      <img src="@/assets/images/logo6.png" alt="" style="width:45px;height:45px">
      <p>犀牛物讯供给平台</p>
      <div v-show="!userData.userId" class="header-bar-right header-bar-right-out"> 
        <a>帮助中心</a>
        <a @click="goLogin">登录</a>
        <a @click="goReg">注册</a>
      </div>
      <div v-show="userData.userId" class="header-bar-right header-bar-right1-in">
        <router-link  tag="a" :to="{path:'order'}" ><span>我的订单</span></router-link>
        <a>帮助中心</a>
        <a style="color:#cc3333">{{userData.nickname ? userData.nickname : userData.username}}</a>
        <a @click="loginOut">退出</a>
      </div>
      
    </div>
  </div>
</template>

<script>
import local_storage from '@/utils/local_storage'
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
      localStorage.clear()
      this.$Message.success('退出成功');
      this.$store.commit('userData','')
      
      // local_storage.storageDelet('username')
    }
  },
  created(){
    // let loginStatus = local_storage.storageGet('username')
    // this.isLogin = local_storage.storageGet('loginStatus')
    // console.log(local_storage.storageGet('loginStatus'))
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

