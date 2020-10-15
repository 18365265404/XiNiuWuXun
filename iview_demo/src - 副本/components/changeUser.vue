<template>
  <div class="register">
      
      <Form class="res-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
        <div class="reg-title">修改用户信息</div>  
        <div style="margin-bottom:25px;font-size:14px">
            <span>用户名</span><span style="margin-left:30px;">{{username}}</span>
        </div>
        <FormItem class="form-item"  prop="tel" label="手机号码">
            <Input class="ipt" type="text" v-model="formCustom.tel" placeholder="请输入手机号码"/>
        </FormItem>

        <FormItem class="form-item"  prop="nickname" label="用户昵称">
            <Input class="ipt" type="text" placeholder="请输入您的昵称" v-model="formCustom.nickname"/>
        </FormItem>




        
        <FormItem class="form-item form-reset">
            <Button class="form-sub" type="primary" @click="handleSubmit('formCustom')">保存用户信息</Button>
        </FormItem>

    </Form>
  </div>
</template>

<script>
import {checkPhone} from '@/utils/mathTool';
import local_storage from '@/utils/local_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest} from '@/utils/ajax';
export default {
  name: 'HelloWorld',
  data () {

    const validateTel = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的手机号码'));
        }else if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error('手机号格式不正确'));
        } else {
            
            callback();
        }
    };


    const validateNickname = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的昵称'));
        } else {
            callback();
        }
    };
    return {
        formCustom: {
            tel: '',
            nickname:""
            
        },
        time_count:"验证码",
        username:'',
        ruleCustom: {
            tel: [
                { validator: validateTel, trigger: 'blur' }
            ],

            
            nickname: [
                { validator: validateNickname, trigger: 'blur' }
            ],
            

        }
    }
  },
  computed: {

  },
    methods: {

        
        handleSubmit (name) {
            console.log("111111111111",local_storage.storageGet('userId') )
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // alert()
                    
                    console.log("local_storage.storageGet('userId')",local_storage.storageGet('userId'))
                    putRequest(url.userUserUpdateUserById, {
                        nickname:this.formCustom.nickname,
                        tel:this.formCustom.tel,
                        userId:local_storage.storageGet('userId')

                    }).then(data=> {
                        
                        if(data.data.status!=1){
                            this.$Message.error(data.data.message);
                            return
                        }
                        let userData=local_storage.storageGet('userData')
                        userData.tel = this.formCustom.tel
                        userData.nickname = this.formCustom.nickname
                        local_storage.storageSet('userData',userData)
                        this.$Message.success('保存信息成功');

                        console.log("请求返回数据",data)
                        
                        
                    }); 
                    






                }
            })
        },
        handleCancel(){
            this.$router.push("/login");
        }

    },
    created(){
        let userData=local_storage.storageGet('userData')
        
        this.username = userData.username
        console.log("用户信息",userData)
        this.formCustom={
            tel:userData.tel,
            nickname:userData.nickname,
        }
 
    }
    
    
}
</script>

<style lang="less" scoped>
.register{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: white;
  
  .res-form{

    margin-top: 40px;
    width: 550px;
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
        
        display: flex;
        .ipt{
            width: 350px;
        }
        .form-sub{
            margin-left:60px;
            width: 350px;
        }
    &.form-reset{
        margin-bottom: 10px;
    }    
    }
  }
}
.get-code{
    text-align: center;
    width: 80px;
}
</style>
