<template>
    <div class="shopMsg layout">
        <h1 class="shopMsg-title">选择收货地址</h1>
        <ul class="address-list">
            <li @click="chooseAddress(index,item.receivingAddressId)" :class="{'address-item':'true','active-address':activeIndex==index}" v-for="(item,index) in addressList" :key="index">
                <h1>{{item.provinceName}} {{item.cityName}} {{item.consignee}} <span>收</span></h1>
                <h2>{{item.areaName}} {{item.detailsAddress}}</h2>
                <h2>{{item.tel}}</h2>
                <h2>邮编：{{item.postalCode}}</h2>
            </li>
        </ul>
        <div class="address-btn">
            <Button @click="showPop">使用新地址</Button>
            <Button @click="()=>{this.$router.push('/address')}">管理收货地址</Button>
        </div>

        <Modal  v-model="modal" 
            :maskClosable="false"
            :loading="modalLoading" 
            footer-hide
            ref="modal"
            class="modal"
            id="modal"
            :styles="{top: '200px'}"
            >
            <div id="add-box" class="ivu-modal-confirm-body add-box" >
                <div class="hint form-item">
                    <span class="add" >新增地址</span>
                   
                    
                   
                </div>
                <div class="form-item">
                    <div class="form-item-head">
                        <h2><span>*</span><span class="text">收货人：</span></h2>
                    </div>
                    <div class="form-item-right">
                        <Input v-model="form.name" size="small" placeholder="" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-head">
                        <h2><span>*</span><span class="text">地区：</span></h2>
                    </div>
                    <div class="form-item-right">
                        <Select @on-change='chooseCity1' v-model="form.city1" size="small" style="width:100px">
                        <Option  v-for="item in cityList1" :value="parseInt(item.provinceCode)" :key="item.provinceId">{{ item.provinceName }}</Option>
                        </Select>
                        <Select @on-change='chooseCity2' v-model="form.city2" size="small" style="width:100px">
                            <Option  v-for="item in cityList2" :value="parseInt(item.cityCode)" :key="item.cityId">{{ item.cityName }}</Option>
                        </Select>
                        <Select @on-change='chooseCity3' v-model="form.city3" size="small" style="width:100px">
                            <Option  v-for="item in cityList3" :value="parseInt(item.areaCode)" :key="item.areaId">{{ item.areaName }}</Option>
                        </Select>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-head">
                        <h2><span>*</span><span class="text">街道地址：</span></h2>
                    </div>
                    <div class="form-item-right">
                        <Input v-model="form.address" size="small" placeholder="" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-head">
                        <h2><span>*</span><span class="text">手机号码：</span></h2>
                    </div>
                    <div class="form-item-right">
                        <Input v-model="form.tel" size="small" placeholder="" />
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-head">
                        <h2><span class="text">邮政编码</span></h2>
                    </div>
                    <div class="form-item-right">
                        <Input v-model="form.postalCode" size="small" placeholder="" />
                    </div>
                </div>
            
                <div class="form-item">
                    <div class="form-item-head">
                        <h2><span class="text">是否设置默认：</span></h2>
                    </div>
                    <i-switch class="form-item-right"  v-model="form.isDft" size="large">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                </div>
                <div class="form-item">
                    <Button class="sub-btn" @click="submit"  type="primary">保存</Button>
                </div>
            </div>
       </Modal>
        <alert-little  class="alert" @cancel='cancel' :alertBl="alertBl">{{alertHint}}</alert-little>
        <h1 class="shopMsg-title">确认商品信息</h1>
        <!-- 商品列表 -->
        <table class="table " border="0" cellspacing="" cellpadding="">
			<tr class="table-head layout" style="width:1200px">
                <th>商品信息</th>
                <th>规格</th>
                <th>数量</th>
                <th>单价</th>
                <th>小计</th>
            </tr>
			<tr class="table-body" v-for="(item,index) in tableList" :key="index">
                <td>
                    <img :src='qiniuHead+item.imgUrl' alt="">
                    <div>
                        <h2>{{item.goodsName}} </h2>
                    </div>
                </td>
                <td>
                    <h2>
                        {{item.specificationsValue}}


                    </h2>
                </td>
                <td>
                    <h2>
                        {{item.num}}
                    </h2>
                </td>
                <td>
                   <h2>
                       ￥{{item.adjustedPrice}}
                   </h2>
                </td>
                <td>
                    <h2>
                        ￥{{item.adjustedPrice*item.num}}
                    </h2>
                </td>

            </tr>
		</table>
        <div class="remark">
            <h2>备注(买家与卖家): </h2>
            
            <textarea style="width:100%" rows="5" v-model="order.remarks" type="text"></textarea>
        </div>
        <div class="remark">
            <h2>请输入您的邮费: </h2>
            <input @change="changePost" v-model="order.freight" type="text" style="margin-right:10px"><span >元</span>
        </div>

        <ul class="shop-content">
            <!-- <li>
                <h1 class="shopMsg-title">商品信息</h1>
                <div class="content-des">
                    <h3>商品总数：<span>{{allNum}}件</span></h3>
                    <h3>商品总价：<span>￥{{allPrice}}</span></h3>
                </div>
            </li>
            <li>
                <h1 class="shopMsg-title">干线配送 （城市到城市）</h1>
                <div class="content-des des-distribution">
                    <Radio v-model="distributionVal"><span>系统默认物流公司   干线物流费合计：<span style="color:#cc3333">￥2551</span></span></Radio>
                </div>
            </li>
            <li>
                <h1 class="shopMsg-title">是否需要开具商品发票</h1>

                <RadioGroup class="content-des bill" v-model="billVal">
                    <Radio label="不要发票"></Radio>
                    <Radio label="需要发票"></Radio>
                </RadioGroup>


            </li> -->
            <li>
                <h1 class="shopMsg-title">结算信息</h1>                                             
                <div class="content-des price-all">
                    <h4>商品总数：<span>{{allNum}}件</span></h4>
                    <!-- <h4>商品总价：<span>￥40551</span></h4>
                    <h4>干线物流费：<span>￥40551</span></h4> -->
                    <h5>结算总价：<span>￥{{order.freight=='' ? parseFloat(allPrice):parseFloat(allPrice) + parseFloat(order.freight)}}</span> <span v-show="order.freight!=''" style="font-size:12px;color:#666666">(包含邮费)</span></h5>
                    <h6 v-show="order.freight!=''">邮费价格：<span >￥{{order.freight}}</span></h6>
                    <Button @click="submitPay" style="background:#cc3333" class="button" type="error">提交订单</Button>
                </div >
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.shopMsg{
    .shopMsg-title{
        font-size: 18px;
        line-height: 55px;
        color: #333333;
        font-weight: 700;
    }
    .address-list{
        display: flex;
        flex-wrap: wrap;
        
        li{
            padding: 15px 5px ;
            border:3px dotted #cccccc;
            border-radius: 5px;
            width: 245px;
            height: 110px;
            margin-right: 30px;
            &.active-address{
                border-color: #cc4444;
            }
            &:hover{
                
                background: #FDF2C9;;
            }
            &:nth-child(4n){
                margin-right: 0;
                margin-bottom: 25px;

            }
            h1{
                font-size: 14px;
                color: #333333;
                line-height: 25px;
                font-weight: 700;
                span{
                    color: #666666;
                    font-weight: normal;
                }
            }
            h2{
                font-size: 14px;
                color: #666666;
            }
        }
    }
    .address-btn{
        display: flex;
        justify-content: space-between;
        padding-top: 40px;
    }
    .table{
        width: 100%;
        
        .table-head{
            display: flex;
            width: 100%;
            th{
                flex: 1;
                text-align: center;
                
                border-bottom: 4px solid #cccccc;
                margin-right: 5px;
                &:nth-child(1){
                    flex: none;
                    width: 300px;
                }
            }
        }
        .table-body{
            display: flex;
            width: 100%;
            td{
                flex: 1;
                justify-content: center;
                text-align: center;
                display: flex;
                flex-direction: column;
                padding-right: 5px;
                padding-bottom: 15px;
                background: #fcfafa;
                &:nth-child(1){
                    flex: none;
                    width: 300px;
                    flex-direction: row;
                    padding: 25px 0;
                    padding-left: 20px;
                    img{
                        width: 60px;
                        height: 60px;
                        border: 1px solid #cccccc;
                    }
                }
            }
        }
    }
    .remark{
        // display: flex;
        h2{
            line-height: 70px;
            margin-right: 5px;
            font-size: 16px;
        }
        input{
            flex: 1;
            height: 40px;
            margin-top: 15px;
        }
    }
    .shop-content{
        display: flex;
        // flex-wrap: wrap;
        padding-bottom: 50px;
        flex-direction: row-reverse;
        li{
            
            width: 585px;
            margin-right: 30px;
            .content-des{
                padding: 12px 0 15px 35px ;
                border: 1px solid #cccccc;
                height: 70px;
                h3{
                    line-height: 25px;
                    span{
                        color: #cc3333;
                    }
                }

                &.des-distribution{
                    display: flex;
                    text-align: center;
                    align-items: center;
                    
                }
                &.bill{
                    display: flex;
                    flex-direction: column;
                    padding-top: 15px;
                    .radio{
                        line-height: 25px;
                    }

                }
                &.price-all{
                    height: 140px;
                    // padding: 130px;
                    padding-left: 130px;
                    border:1px solid #cccccc;
                    background: #F0F0F0;
                    position: relative;
                    padding-top: 40px;
                    h4{
                        font-size: 14px;
                        
                        line-height: 25px;
                        span{
                            color: #cc3333;
                        }
                    }
                    h5{
                        font-size: 16px;
                        color: #333333;
                        line-height: 25px;
                        font-weight: 700;
                        span{
                            color: #cc3333;
                        }
                    }
                    .button{
                        position: absolute;
                        top: 70px;
                        left: 350px;
                    }
                }
            }
            &:nth-child(2n){
                margin-right: 0;
            }
        }
    }


}
.modal{

    #add-box{
        margin: 0px 0 0 0px;
        padding: 20px 10px;
        width: 820px;
        
        .form-item{
            
        display: flex;
        margin-top: 15px;
        &.hint{
            .add{
            color: #333333;
            margin-left: 50px;
            font-weight: 700;
            font-size: 18px;
            }
            .change{
            color: red;
            margin-right: 5px;
            &:last-child{
                margin-left: 15px;
            }
            }
        }

        .form-item-head{
            display: flex;
            justify-content: right;
            flex-direction: row-reverse;
            
            h2{
            width: 135px;
            display: flex;
            justify-content: right;
            flex-direction: row-reverse;
            color: red;
            .text{
                margin-right: 10px;
                color: #666666;
            }
            }
        }

        .form-item-right{
            margin-left:5px;
            
        }

        .sub-btn{
            margin-left: 140px;
        }
        }
        
        
    }


}
.alert{
    z-index: 10000000000000;
}
</style>
<script>
import alertLittle from '@/components-item/alert-little.vue'
import url from '@/utils/url';
import session_storage from '@/utils/session_storage'
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {

  components:{
    alertLittle
  },


    data () {
        return {
            shopId:'',
            allPrice:null,//总价
            allNum:null,//总数
            qiniuHead:url.qiniuH,
            addressList:[],
            activeIndex:'0',
            distributionVal:true,
            billVal:"需要发票",
            alertBl:false,
            modalLoading: true,
            modal:false,
            alertHint:'',
            form: {
                name:"",
                city1:'',
                city2:'',
                city3:'',
                address:'',
                tel:'',
                phone:'',
                isDft:true,
            },
            order:{
                receivingAddressId:'',
                sumPrice:'',
                freight:'',

                remarks:'',
                orderGoodsList:[],
            },
            tableList:[
                
            ],
            cityList1:[{value:'0',city:'请选择'},{value:'1',city:'上海'},{value:'2',city:'北京'}],
            cityList2:[],
            cityList3:[],
        }
    },
    methods:{
        // 邮费改变
        changePost(){
            // order.freight
        },
        //点击支付按钮
        submitPay(){
            if(this.addressList.length==0){
                this.$Message.error('您还没添加收货地址，请创建');
                return
            }
            if(this.order.freight==""){

                this.$Message.error('请咨询客服后，填写邮费');
                
                return
            }
            
            if(!this.isNumber(this.order.freight)){
                this.$Message.error('邮费必须是纯数字');

                return
            }
            
            
            
            // 创建订单
            this.createOrder()
        },

        // 支付接口
        payAjax(){
            
            let bodyString=''
            if(this.order.orderGoodsList.length==1){
                bodyString='立即购买的商品'
            }else{
                bodyString='购物车购买的商品'
            }
            postRequest(url.payPay, {
                subject:'犀牛物讯商品',
                body:bodyString,
                total_amount:parseFloat(this.allPrice)+parseFloat(this.order.freight),
                userId:session_storage.storageGet("userData").userId
            }).then(data=> {

                
                document.querySelector('body').innerHTML = data.data;
                 
                 const div = document.createElement('div') // 创建div
                 div.innerHTML = data.data // 将返回的form 放入div
                 document.body.appendChild(div)
                 document.forms[0].submit()
                    
                console.log("去支付回调",data)
                
                
            }); 
        },

        createOrder(){
            this.order.receivingAddressId=this.addressList[this.activeIndex].receivingAddressId
            
            console.log("order",this.order)

            postRequest(url.orderPretreatmOrderInsertPretreatOrder, {
                userId:session_storage.storageGet("userData").userId,
                orderStr:JSON.stringify(this.order)
                
            }).then(data=> {
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                // 去支付
                this.payAjax()
                console.log("创建订单回调",data)
                
                
            }); 
        },
        // 选择地址
        chooseAddress(index,receivingAddressId){
            this.activeIndex=index
            this.order.receivingAddressId=receivingAddressId
            
        },
        showPop(){
            this.modal=true
        },
        cancel(obj){
            
        },
        submit(){
      
            if(!this.form.name){
                
                this.alertBl=true
                this.alertHint='请输入收货人姓名'
                this.timeoutCancel()
                return
            }
            if(!this.form.city1){
                
                this.alertBl=true
                this.alertHint='请选择省'
                this.timeoutCancel()
                return
            }
            if(!this.form.city2){
                
                this.alertBl=true
                this.alertHint='请选择市'
                this.timeoutCancel()
                return
            }
            if(!this.form.city3){
                
                this.alertBl=true
                this.alertHint='请选择区'
                this.timeoutCancel()
                return
            }
            if(!this.form.address){
                
                this.alertBl=true
                this.alertHint='请输入地址'
                this.timeoutCancel()
                return
            }
            
            if(!this.form.tel){
                
                this.alertBl=true
                this.alertHint='请输入手机号码'
                this.timeoutCancel()
                return
            }
            console.log("from",this.form)
            let city1 = this.form.city1
            let city2 = this.form.city2
            let city3 = this.form.city3
            this.cityList1.forEach((v,i)=>{
                if(v.provinceCode==city1 ){
                city1=v.provinceName
                }
                
            })
            this.cityList2.forEach((v,i)=>{
                if(v.cityCode==city2 ){
                city2=v.cityName
                }
                
            })
            this.cityList3.forEach((v,i)=>{
                if(v.areaCode==city3 ){
                city3=v.areaName
                }
                
            })
            
            this.addAddress(city1,city2,city3)



            
        },

        // 增加收货地址
        addAddress(city1,city2,city3){
            
            postRequest(url.userReceivingAddressInsertReceivingAddress, {
                consignee:this.form.name,
                tel:this.form.tel,
                provinceName:city1,
                cityName:city2,
                areaName:city3,
                detailsAddress:this.form.address, 
                postalCode:this.form.postalCode,
                isDft:this.form.isDft ? 1 : 0,
                userId:session_storage.storageGet("userData").userId
            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                this.modal=false
                this.initAddress()
                console.log("添加收货地址",data)
                
                this.form= {
                    name:"",
                    city1:'',
                    city2:'',
                    city3:'',
                    address:'',
                    postalCode:'',
                    tel:'',
                    // phone:'',
                    isDft:true,
                }
            }); 
        },



        // 选择城市 省
        chooseCity1(){
        this.getCityList()
        },
        // 选择城市 市
        chooseCity2(){
        this.getAreaList()
        },
        // 选择城市 区
        chooseCity3(){
        
        },

        // 省市区三级联动 省
        getProvinceList(){
            getRequest(url.basicProvinceSelectProvinceList, {
                

            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                
                
                console.log("查询省",data.data.data)
                this.cityList1 = data.data.data
                
            }); 
        },
        // 省市区三级联动 市
        getCityList(){
        getRequest(url.basicCitySelectCityListByProvinceCode+`${this.form.city1}`, {
            

        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            this.cityList2 = data.data.data

            // console.log("查询市",data)
            
            
        }); 
        },
        // 省市区三级联动 区
        getAreaList(){
        getRequest(url.basicAreaSelectAreaListByCityCode+`${this.form.city2}`, {
            

        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            

            // console.log("查询区",data)
            this.cityList3 = data.data.data
            
        }); 
        },

            // 几秒钟后关闭弹窗
        timeoutCancel(){
            setTimeout(() => {
                this.alertBl=false
            }, 2000);
        },
        // 判断是否是纯数字
        isNumber(val) {
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if(regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        },

        // 初始化查询地址
        initAddress(){
            let userData = session_storage.storageGet('userData')
            getRequest(url.userReceivingAddressSelectReceivingAddressList+`${userData.userId}`, {
                

            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                
                this.addressList= data.data.data
                this.order.receivingAddressId=data.data.data[0].receivingAddressId
                this.addressList.forEach((v,i)=>{
                    if(v.isDft==1){
                        this.activeIndex=i
                    }
                })
                
                console.log("查询所有收货地址",data)
                
                
            }); 
        },

        initShopList(shopId){
            let userData = session_storage.storageGet('userData')
            getRequest(url.orderConfirmOrderGetConfirmOrderByUserId+`${userData.userId}`, {
                

            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                
                this.tableList=data.data.data
                console.log("查询清单列表",this.tableList)
                
                this.tableList.forEach((v,i)=>{
                    this.allPrice+=parseFloat(v.adjustedPrice*v.num)
                    
                    this.allNum+=parseFloat(v.num)
                    this.order.orderGoodsList.push({
                        goodsId:this.shopId,
                        goodsName:v.goodsName,
                        specificationsValue:v.specificationsValue,
                        num:v.num
                    })
                })
                this.order.sumPrice=this.allPrice
            }); 
        }
    },

    created(){
        
        let shopId = this.$route.query.id
        this.shopId = shopId
        console.log("上级传递过来的参数",shopId)
        this.initAddress()
        this.getProvinceList()
        this.initShopList(shopId)
    },
}
</script>

