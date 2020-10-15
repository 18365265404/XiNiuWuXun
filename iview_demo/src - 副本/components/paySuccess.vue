<template>
  <div class="orderBack layout">
      <ul>
          <li><span>订单状态：</span><em>{{form.isPay==1? '支付成功' : "支付失败"}}</em></li>
          
          <!-- <li><span>创建时间：</span><em>{{form.alipayOrderTime|date}}</em></li> -->
          <li><span style="color:#F83244">{{changeTime}}</span><em>秒钟之后跳转到首页</em></li>

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
            form:{
                alipayOrderId:'',
                alipayOrderTime:'',
                subject:'',
                body:'',
                isPay:'',
            },
            changeTime:3
        }
    },
    methods:{
        initData(alipayOrderId){
            getRequest(url.paySelectAlipayOrderById+"0/"+alipayOrderId, {
          

            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                
                this.form={
                    alipayOrderId:data.data.data.alipayOrderId,
                    alipayOrderTime:data.data.data.alipayOrderTime,
                    subject:data.data.data.subject,
                    body:data.data.data.body,
                    isPay:data.data.data.isPay,
                }
                
                console.log("付款成功后查询",data.data)
                
                
            }); 
        },
        // 下订单
        goOrder(alipayOrderId){
            postRequest(url.orderOrderInsertOrder,{
                userId:local_storage.storageGet("userData").userId,
                alipayOrderId:alipayOrderId
            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                
                console.log("下订单成功",data.data)
                
                
            }); 
        }
    },
    created(){
        let alipayOrderId = this.$route.query.alipayOrderId
        // console.log("上级传递过来的参数",alipayOrderId)
        
        this.initData(alipayOrderId)
        this.goOrder(alipayOrderId)
        let timer=setInterval(() => {
            this.changeTime--
            if(this.changeTime==0){
                this.$router.push("/home")
                clearInterval(timer)
            }
        },1000)

    }

}
</script>
<style lang="less" scoped>
.orderBack{
    ul{
        padding: 50px 0;
        margin:  80px auto;
        width: 550px;
        min-height: 200px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        background: #fafafa;
        li{
            margin-left: 180px;
            font-size: 18px;
            font-weight: 600;
            line-height: 35px;
            span{
                margin-right: 10px;
            }
            &:nth-child(1){
                em{
                    color: red;
                }
            }
        }
    }
}
</style>

