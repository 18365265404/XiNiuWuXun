<template>
  <div class="aboutUs">
    <div>关于我们</div>
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

</style>

