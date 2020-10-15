<template>
  <div class="register">
      
      <Form class="res-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
        <div class="reg-title">修改密码</div>  
        <FormItem class="form-item"  prop="tel">
            <Input type="text" v-model="formCustom.tel" placeholder="请输入手机号码"></Input>
        </FormItem>

        <FormItem class="form-item"  prop="passwd">
            <Input type="password" placeholder="请输入旧密码" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem class="form-item"  prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="请输入新密码"></Input>
        </FormItem>



        
        <FormItem class="form-item form-reset">
            <Button class="form-sub" type="primary" @click="handleSubmit('formCustom')">立即修改密码</Button>
        </FormItem>
        
        <FormItem class="form-item ">
            <Button class="form-sub"  @click="handleCancel('formCustom')">取消</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import local_storage from '@/utils/local_storage'
import url from '@/utils/url';
import {checkPhone} from '@/utils/mathTool';
import qs from 'qs'
import {getRequest,getRequest2,postRequest,putRequest} from '@/utils/ajax';
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

    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的的旧密码'));
        } else {
            if (this.formCustom.passwdCheck !== '') {
                // 对第二个密码框单独验证
                this.$refs.formCustom.validateField('passwdCheck');
            }
            callback();
        }
    };


    

    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的新密码'));
        } else if (value == this.formCustom.passwd) {
            callback(new Error('新旧密码不能相同'));
        } else {
            callback();
        }
    };
    return {
        formCustom: {
            tel: '',

            passwd:"",
            passwdCheck:"",
            
        },
        time_count:"验证码",
        ruleCustom: {
            tel: [
                { validator: validateTel, trigger: 'blur' }
            ],

            
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],
            passwdCheck: [
                { validator: validatePassCheck, trigger: 'blur' }
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
                    putRequest(url.userUserUpdatePasswordById, {
                        oldPassword:this.formCustom.passwd,
                        newPassword:this.formCustom.passwdCheck,
                        userId:local_storage.storageGet('userId')

                    }).then(data=> {
                        
                        if(data.data.status!=1){
                            this.$Message.error(data.data.message);
                            return
                        }
                        
                        this.$Message.success(data.data.message);
                        this.$router.push("/login");
                        localStorage.clear()
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


 
    }
    
    
}
</script>

<style lang="less" scoped>
.register{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
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
