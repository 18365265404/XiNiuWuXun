<template>
  <div class="register">
      
      <Form class="res-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
        <div class="reg-title">重置密码</div>  
        <FormItem class="form-item"  prop="tel">
            <Input type="text" v-model="formCustom.tel" placeholder="请输入手机号码"/>
        </FormItem>
        <FormItem class="form-item"  prop="code">
            <Row>
                <Col span="17">
                    <Input type="text" v-model="formCustom.code" placeholder="请输入验证码"/>
                </Col>
                <Col span="4" offset="1">
                    <Button class="get-code" type="primary" @click="handleCode()" :disabled="isdisabledFn" >{{time_count}}</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem class="form-item"  prop="passwd">
            <Input type="password" placeholder="请输入新密码" v-model="formCustom.passwd"></Input>
        </FormItem>

        
        <FormItem class="form-item" style="margin-bottom:10px">
            <Button class="form-sub" type="primary" @click="handleSubmit('formCustom')">重置密码</Button>
        </FormItem>
        <FormItem class="form-item ">
            <Button class="form-sub"  @click="handleCancel('formCustom')">取消</Button>
        </FormItem>
        <p style="color:#F83244;font-size:12px">{{hintMessage}}</p>
    </Form>
  </div>
</template>

<script>
import url from '@/utils/url';
import {checkPhone} from '@/utils/mathTool';
import {getRequest,postRequest,putRequest} from '@/utils/ajax';
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
    const validateCode = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入验证码'));
        }else if (!/^([0-9_]{6})+$/.test(value)) {
            callback(new Error('验证码必须数字,长度为6'));    
        }else {
            
            callback();
        }
    };

    const validateTel = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的手机号码'));
        }else if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error('手机号格式不正确'));
        } else {
            
            callback();
        }
    };
    return {
        formCustom: {
            passwd: '',
            code:"",

            tel: '',
            
            
        },
        hintMessage:'',
        time_count:"验证码",
        codeStatus:false,
        ruleCustom: {
 
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],
            code: [
                { validator: validateCode, trigger: 'blur' }
            ],
 
            tel: [
                { validator: validateTel, trigger: 'blur' }
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

        handleCode(){
            
            if(!checkPhone(this.formCustom.tel)){
                
                return
            }
            
            getRequest(url.userLoginGetVerificationCode+`${this.formCustom.tel}`, {
                // string:[this.formCustom.tel].join('/'),

            }).then(data=> {
                
                if(data.status==1){
                    this.$Message.success('验证码发送成功');
                }
                
                console.log("请求返回数据",data)
                

                
            }); 
            
            this.codeStatus=true
            
            const TIME_COUNT = 3;
            if (!this.timer) {
            this.time_count = TIME_COUNT;
            // this.codeStatus = false;
            this.timer = setInterval(() => {
            if (this.time_count > 0 && this.time_count <= TIME_COUNT) {
                this.time_count--;
                } else {
                this.codeStatus = false;
                this.time_count="验证码"
                clearInterval(this.timer);
                this.timer = null;
                }
            }, 1000)
            }
        },
        
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {


                    putRequest(url.userUserUpdatePassword, {
                        newPassword:this.formCustom.passwd,
                        tel:this.formCustom.tel,
                        verificationCode:this.formCustom.code,
 
                    }).then(data=> {
                        
                        console.log("重置返回数据",data.data.data)
                        if(data.data.status!=1){
                            this.$Message.error(data.data.message);
                            return
                        }
                        
                        this.$Message.success('重置成功');
                        this.hintMessage=data.data.data
                        
                        // this.$router.push("/login");
                        
                    }); 




                    
                }
            })
        },
        handleCancel(){
            this.$router.push("/login");
        }

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
    height: 450px;
    padding:60px 60px 0 60px;
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
