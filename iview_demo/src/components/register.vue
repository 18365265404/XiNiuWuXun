<template>
  <div class="register">
      
      <Form class="res-form" ref="formCustom" :model="formCustom" :rules="ruleCustom" >
        <div class="reg-title">注册会员</div>  
        <FormItem class="form-item"  prop="username">
            <Input type="text" v-model="formCustom.username" placeholder="请输入用户名"/>
        </FormItem>
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
            <Input type="password" placeholder="请输入密码" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem class="form-item"  prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="请再次输入密码"></Input>
        </FormItem>
        
        <FormItem class="form-item" style="margin-bottom:10px">
            <Button class="form-sub" type="primary" @click="handleSubmit('formCustom')">立即注册</Button>
        </FormItem>
        <FormItem class="form-item ">
            <Button class="form-sub"  @click="handleCancel('formCustom')">取消</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import url from '@/utils/url';
import {checkPhone} from '@/utils/mathTool';
import {getRequest,postRequest} from '@/utils/ajax';
export default {
  name: 'HelloWorld',
  data () {
      
    const validateusername = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入用户名'));
        }else if (!/^[a-zA-Z]{6,16}$/.test(value)) {
            callback(new Error('用户名必须是大小写字母，长度不能小于6位'));
        }else {
            
            callback();
        }
    };

    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的的密码'));
        }else if (!/[A-Za-z0-9]{7,20}/.test(value)) {
            callback(new Error('密码必须是字母+数字,长度不能小于7位'));
        }  else {
            if (this.formCustom.passwdCheck !== '') {
                // 对第二个密码框单独验证
                this.$refs.formCustom.validateField('passwdCheck');
            }
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
    
    const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入您的密码'));
        } else if (value !== this.formCustom.passwd) {
            callback(new Error('两次密码不一致'));
        } else {
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
            username:'',
            passwd: '',
            code:"",
            passwdCheck: '',
            tel: '',
            
            
        },
        time_count:"验证码",
        codeStatus:false,
        ruleCustom: {
            username:[
                { validator: validateusername, trigger: 'blur' }
            ],
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],
            code: [
                { validator: validateCode, trigger: 'blur' }
            ],
            
            passwdCheck: [
                { validator: validatePassCheck, trigger: 'blur' }
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


                    postRequest(url.userLoginRegister, {
                        username:this.formCustom.username,
                        password:this.formCustom.passwd,
                        tel:this.formCustom.tel,
                        verificationCode:this.formCustom.code,
                        type:'0'
                    }).then(data=> {
                        
                        console.log("注册返回数据",data)
                        if(data.data.status!=1){
                            this.$Message.error(data.data.message);
                            return
                        }
                        
                        this.$Message.success(data.data.message);

                        this.$router.push("/login");
                        
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
    height: 520px;
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
