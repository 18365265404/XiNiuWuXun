<template>
  <div class="register">
      
      <Form class="res-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
        <div class="reg-title">账号登录</div>  
        <FormItem class="form-item"  prop="username">
            <Input type="text" v-model="formCustom.username" placeholder="请输入用户名"/>
        </FormItem>

        <FormItem class="form-item"  prop="passwd">
            <Input type="password" placeholder="请输入密码" v-model="formCustom.passwd"/>
        </FormItem>

        
        <FormItem class="form-item" style="margin-bottom:10px">
            <Button class="form-sub" type="primary" @click="handleSubmit('formCustom')">立即登录</Button>
        </FormItem>
        <div style="display: flex;justify-content: space-between">
            <span style="color:#57A3F3;cursor: pointer;font-size:14px;" @click="jumpReset">忘记密码？</span>
            <!-- <span style="color:#57A3F3;cursor: pointer;font-size:14px;" @click="changePw">修改密码</span> -->
            <span style="color:#57A3F3;cursor: pointer;font-size:14px;" @click="jumpResg">立即注册</span>
        </div>
    </Form>
  </div>
</template>

<script>
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
import {checkPhone} from '@/utils/mathTool';
import {getRequest,postRequest} from '@/utils/ajax';

export default {
  name: 'HelloWorld',
  data () {
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的的密码'));
        }else if (!/[A-Za-z0-9]{7,20}/.test(value)) {
            callback(new Error('密码长度不能小于7位'));
            // callback(new Error('密码必须是字母+数字,长度不能小于7位'));
        } else {
            
            callback();
        }
    };

    
        // 

    const validateUsername = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的用户名'));

        // }else if (!/^[a-zA-Z]{6,16}$/.test(value)) {
        //     callback(new Error('用户名必须是大小写字母，长度不能小于6位'));
        }else {
            
            callback();
        }
    };
    return {
        formCustom: {
            passwd: '',
            username: '',
            
            
        },
        time_count:"验证码",
        codeStatus:false,
        ruleCustom: {
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],

            username: [
                { validator: validateUsername, trigger: 'blur' }
            ]
        }
    }
  },
  computed: {
    isdisabledFn() {
  
      return this.codeStatus;
    },
  },
    methods: {

        jumpReset(){
            
            this.$router.push("/reset");
        },
        changePw(){
            this.$router.push("/changepw");
        },
        jumpResg(){
            this.$router.push("/register");
        },
        
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    
                    postRequest(url.userLoginGoLogin, {
                        username:this.formCustom.username,
                        password:this.formCustom.passwd,

                    }).then(data=> {
                        
                        
                        console.log("请求返回数据",data.data.data)
                        if(data.data.status!=1){
                            this.$Message.error(data.data.message);
                            return
                        }
                        
                       
                        sessionStorage.setItem('accessToken',data.data.data.accessToken)
                        sessionStorage.setItem('refreshToken',data.data.data.refreshToken)
                        session_storage.storageSet('userId',data.data.data.user.userId)
                        session_storage.storageSet('userData',data.data.data.user)
                        
                        this.$store.commit('userData',data.data.data.user)
                    
                        this.$Message.success(data.data.message);
                        this.initCarNum(data.data.data.user)
                        console.log("获取url",this.oldUrl)
                        if(this.oldUrl=='/reset'||this.oldUrl=='/changepw'||this.oldUrl=='/register'){
                            this.$router.push("/");
                        }else{
                            this.$router.push("/home")
                        }
                        
                    }); 








                    
                }
            })
        },
        initCarNum(userDate){
            getRequest(url.goodsShoppingCartSelectShoppingCartCount+`${userDate.userId}`, {
                

            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                session_storage.storageSet('carNum',data.data.data)
                this.$store.commit('carNum',data.data.data)
                console.log("购物车商品个数",data.data.data)
                
                
            });
        }

        


    },

    beforeRouteEnter (to, from, next){
     next(vm => {
       // 通过 `vm` 访问组件实例,将值传入oldUrl
       vm.oldUrl = from.path
     })
   },
   mounted(){





     this.$nextTick(()=>{
       // 验证是否获取到了上页的url
       /* eslint-disable no-console */
       console.log(this.oldUrl)
     })
   }

}
</script>

<style lang="less" scoped>
.register{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 580px;
  background: #f9f9f9;
  
  .res-form{

    margin-top: 40px;
    width: 450px;
    height: 477px;
    padding:80px 60px 0 60px;
    background: #fff;
    .reg-title{
      text-align: center;
      color: #333333;
      margin-bottom: 20px;
      font-size: 18px;
    }
    .form-item{
        margin-bottom: 30px;
        .form-sub{
            width: 100%;
        }
        
    }
  }
}
.get-code{
    text-align: center;
    width: 80px;
}
</style>
