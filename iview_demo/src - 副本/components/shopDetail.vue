<template>
  <div class="shopDetail">
      <div class="shop-show layout">
          <div class="show-left">
              <div class="img-medium-box">
                  <pic-zoom :url="qiniuHead+showImg" :scale="3"></pic-zoom>
                  <!-- <pic-zoom :url="showImg" :scale="3"></pic-zoom> alt=""> -->
              </div>
              <ul class="img-small-box">
                  <li @mouseover="mouseOver(item.imgUrl)" v-for="(item,index) in imglist" :key="index"><img :src="qiniuHead+item.imgUrl" alt=""></li>
                  
                  
              </ul>
          </div>
          <div class="show-right">
                <h1>{{shopDes.goodsName}}</h1>
                <h2><span>商 品 编 号：</span><span>{{shopDes.goodsNo}}</span></h2>
                <h3>门    店   价：{{shopDes.adjustedPrice}} 元 /件</h3>

                <!-- <h4>供 货  周 期：{{shopDes.period}}天</h4> -->
                <div class="numChange">
                    <span>数量：</span>
                    <num-change :shopId='shopId' :num='shopDes.num' @changeNum="changeNum"></num-change>
                    <span v-show="isStock" style="margin-left:10px;color:#F83244">库存不足</span>
                </div>
                <div class="specification">
                    <h5>规格：</h5>
                    <ul>
                        <li @click="chooseSpec(index,item.specificationsValue,item.specificationsId)" :class="{'active': currentIndex==index}" v-for="(item,index) in shopDes.specificationsVOList" :key="index">{{item.specificationsValue}}
                            <div class="check-bg">
                            <div class="corner">
                                    <Icon class="right" type="md-checkmark" />
                            </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="btn-box">
                    <div @click="goBuy" class="btn btn1">立即购买</div>
                    <div @click="addShopCar" class="btn btn2"><span class="iconfont icon-gouwuche"></span><span>加入购物车</span></div>
                </div>
          </div>
      </div>
      <div class="shop-info layout">
          <div class="shop-detail">
              <span>商品详情</span>
          </div>
          <img v-lazy="qiniuHead+item.imgUrl" v-for="(item,index) in infoList" :key="index"/>
      </div>

      <Modal  v-model="modal" 
        :maskClosable="false"
        :loading="modalLoading"
        footer-hide
        ref="modal"
        :styles="{top: '200px'}"
      >
            <div class="ivu-modal-confirm-body" >
                <div style="text-align: center;margin-top:20px;margin-bottom:20px;font-size:18px">加入购物车成功</div>
                <div style="display:flex;justify-content: center;" >
                    <div>
                        <Button @click="cancel()" style="margin-right:50px;width:150px" type="primary" ghost>继续购买</Button><Button @click="goShopCar" style="width:150px" type="primary">去购物车看看</Button>
                    </div>
                </div>
            </div>
       </Modal>

       <Modal  v-model="modalLogin" 
        :maskClosable="false"
        :loading="modalLoginLoading"
        footer-hide
        ref="modalLogin"
        title="账户登录"
        :styles="{top: '200px'}"
      >
            <div class="ivu-modal-confirm-body" >
                <!-- <div style="text-align: center;margin-top:20px;margin-bottom:20px;font-size:18px">账户登录</div> -->
                <Form class="res-form" ref="formCustom" :model="formCustom" :rules="ruleCustom"  style="padding-right:30px">

                    <FormItem class="form-item"  prop="username">
                        <Input type="text" v-model="formCustom.username" placeholder="请输入手机号码"/>
                    </FormItem>

                    <FormItem class="form-item"  prop="passwd">
                        <Input type="password" placeholder="请输入密码" v-model="formCustom.passwd"/>
                    </FormItem>

                    
                    <FormItem class="form-item" style="width:100%">
                        <Button class="form-sub" style="width:100%" type="primary" @click="handleSubmit('formCustom')">立即登录</Button>
                    </FormItem>

                </Form>
            </div>
       </Modal>
  </div>
</template>

<script>


import PicZoom from 'vue-piczoom'
import numChange from '@/components-item/num-change.vue'
import xzlBtn from '@/components-item/xzl-btn.vue'
import {checkPhone} from '@/utils/mathTool';
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
import local_storage from '@/utils/local_storage'
export default {
  components: {
    PicZoom,
    numChange,
    xzlBtn
  },
  data () {
    const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的的密码'));
        } else {
            
            callback();
        }
    };

    

    const validateUsername = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入您的手机号码'));
        }
        // else if (!/^1[3456789]\d{9}$/.test(value)) {
        //     callback(new Error('手机号格式不正确'));
        // } 
        else {
            
            callback();
        }
    };
    return {
        isStock:false,
        shopId:'',
        currentIndex:'-1',
        qiniuHead:url.qiniuH,
        formCustom: {
            passwd: '',
            username: '',
            
            
        },
        ruleCustom: {
            passwd: [
                { validator: validatePass, trigger: 'blur' }
            ],

            username: [
                { validator: validateUsername, trigger: 'blur' }
            ]
        },
        infoList:["https://images.searchs.cn/bdhomeimage//productDetailforPic/25769873586/2729/25770157729//25770157729.jpg_orginal.jpg","https://images.searchs.cn/bdhomeimage//productDetailforPic/25769873586/2729/25770157729//25770157729.jpg_orginal.jpg","https://images.searchs.cn/bdhomeimage//productDetailforPic/25769873586/2729/25770157729//25770157729.jpg_orginal.jpg",],
       
        
        modalLoading: true,
        modalLoginLoading:true,
        modal: false,
        modalLogin:false,
        shopDes:{
            goodsName:"POESY 诗歌 电视柜 水曲柳木饰面 环保漆 E1级高纤板 五金烤漆底架 1500*390*420mm DG2775A",
            adjustedPrice:'5742',
            goodsNo:'',
            specificationsVOList:[],
            shopDes:2,
            specificationsValue:'',
            specificationsId:'',
            num:1,
            
        },
      showImg:'' , 
      imglist:[],
      specificationsVOList:[],
    }
  },
  methods:{
    //   选择规格
    chooseSpec(index,name,specificationsId){
        this.currentIndex=index
        this.shopDes.specificationsValue=name
        this.shopDes.specificationsId=specificationsId
    },  
    // 登录表单提交  
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
                        
                        this.modalLogin=false
                        localStorage.setItem('accessToken',data.data.data.accessToken)
                        localStorage.setItem('refreshToken',data.data.data.refreshToken)
                        local_storage.storageSet('userId',data.data.data.user.userId)
                        local_storage.storageSet('userData',data.data.data.user)
                        
                        this.$store.commit('userData',data.data.data.user)
                    
                        this.$Message.success(data.data.message);
                       
                        
                    }); 
                
            }
        })
    },
    cancel(){
        this.modal = false;
    },
    goShopCar () {
        this.$router.push("shopCar");
        this.modal = false
    },
    changeNum(obj){
        console.log('father',obj)
        this.isStock=obj.isStock
        this.shopDes.num=obj.val
        console.log("shopDes",this.shopDes.num)
        
    },
    goBuy(){
        getRequest(url.stockStockGetStockNum+this.shopId+'/'+`${parseInt(this.shopDes.num)}`, {
            

        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                this.isStock=true
                return
            }
            
            let userData =local_storage.storageGet('userData')
            console.log("获取用户信息",userData) 
            if(!userData){
                this.modalLogin=true
                return
            }

            
            if(!this.shopDes.specificationsValue){
                this.$Message.error('请选择规格');
                return
            }
            let num = this.shopDes.num || 1
            let shopList=[{
                goodsName:this.shopDes.goodsName,
                adjustedPrice:this.shopDes.adjustedPrice,
                goodsNo:this.shopDes.goodsNo,
                imgUrl:this.showImg,
                specificationsValue:this.shopDes.specificationsValue,
                num:num,
                counterNum:num*this.shopDes.adjustedPrice

            }]
            this.payPage(shopList)
            console.log('shopList',shopList)

            
        });
        
        
    },
    // 跳转到购买清单列表
    payPage(params){
        
        postRequest(url.orderConfirmOrderInsetConfirmOrder, {
            orderStr:JSON.stringify(params),
            userId:local_storage.storageGet("userData").userId
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            // this.$router.push({

            // 　　path: 'shopMsg',
            //     params: {id: this.shopId}  
            // // 　　query: {id: this.shopId}

            // });
            this.$router.push({
            　　name: 'shopMsg',
                query: {
            　　　　id: this.shopId
            　　}
            })

            // this.$router.push("/shopMsg");
            console.log("新增确认订单信息 ",data)
            
            
        }); 
    },
    mouseOver(img){
        this.shopDes.img=img
    },

       

    addShopCar(){
        let userDate = local_storage.storageGet('userData')
        putRequest(url.goodsShoppingCartUpdateShoppingCart, {
            userId:userDate.userId,
            num:this.shopDes.num,
            goodsId:this.shopId,
            specificationsId:this.shopDes.specificationsId
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            
            console.log("加入购物车成功返回的数据",data)
             this.modal = true;
            
        });    
        
    //     let userData =local_storage.storageGet('userData')
    //     console.log("获取用户信息",userData) 
    //     if(!userData){
    //         this.modalLogin=true
    //         return
    //     }
    //     let ifPush=true;
    //     let shop_car =local_storage.storageGet("shop-car") || []
    // //   shop_car.forEach((v,i) => {
    // //       if(v.img==this.shopDes.img){
    // //         shop_car[i].num=this.shopDes.num+shop_car[i].num
    // //         ifPush=false
    // //       }
            
    // //   });
    

    //     if(ifPush){
    //         shop_car.push(this.shopDes)
    //     }

    // let carNum = 0
    // shop_car.forEach((v,i)=>{
    // // this.carList[i].checked=false
    //     carNum+=parseInt(v.num)
    // })
    // this.$store.commit('carNum',carNum);
        
    // //   this.shopDes.checked=false
    //     console.log(shop_car)
        
    //     local_storage.storageSet('shop-car',shop_car)
        
       
    },

    initData(params){
        getRequest(url.goodsGoodsSelectGoodsDetailsByGoodsId+`${params}`).then(data=> {
        
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }


            console.log("查询商品详情",data.data.data)
            this.imglist=data.data.data.goodsDetailsVO.goodsImgVOList
            this.showImg=data.data.data.goodsDetailsVO.goodsImgVOList[0].imgUrl
            this.specificationsVOList=data.data.data.goodsDetailsVO.specificationsVOList
            this.shopDes={
                goodsName:data.data.data.goodsDetailsVO.goodsName,
                adjustedPrice:data.data.data.goodsDetailsVO.adjustedPrice,
                goodsNo:data.data.data.goodsDetailsVO.goodsNo,
                specificationsVOList:data.data.data.goodsDetailsVO.specificationsVOList,
                num:1,
                specificationsId:data.data.data.goodsDetailsVO.specificationsVOList[0].specificationsId
            }
            // 商品底部图片详情
            
            this.infoList=data.data.data.parameterImgVOList
        });
    }
      
  },
  created(){
      this.shopDes.img=this.imglist[0]
      
      const paramsObj = this.$route.query
      console.log("传递过来的参数",paramsObj.id)
      this.shopId=paramsObj.id
      this.initData(paramsObj.id)
  }
  
}
</script>
<style lang="less" scoped>
.ivu-modal{
    margin-top:30%
}
.shopDetail{
    
    .shop-show{
        display: flex;
        .show-left{
            border: 1px solid #cccccc;
            .img-medium-box{
                width: 520px;
                height: 520px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .img-small-box{
                margin-top: 20px;
                width: 500px;
                display: flex;
                padding: 0 20px;
                flex-wrap: wrap;
                
                li{
                    margin-right: 15px;
                    width: 60px;
                    height: 60px;
                    border: 1px solid #cccccc;
                    margin-bottom: 10px;
                    &:nth-child(6n){
                        margin-right: 0;
                    }
                    img{
                        height: 100%;
                        width: 100%
                    }
                }
            }

        }
        .show-right{
            padding: 10px 0 0 20px;
            h1{
                flex: 1;
                font-size: 20px;
            }
            h2{
                margin-top: 15px;
                font-size: 16px;
            }
            h3{
                margin-top: 15px;
                font-size: 16px;
            }
            h4{
                margin-top: 15px;
                font-size: 16px;
            }
            .numChange{
                margin-top: 20px;
                display: flex;
                span{
                    line-height: 40px;
                    margin-right: 20px;
                }
            }
            .specification{
                display: flex;
                margin-top: 20px;
                h5{

                    margin-right: 20px;

                }
                ul{
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        margin-top: 10px;
                        min-width: 120px;
                        text-align: center;
                        line-height: 25px;
                        margin-right: 10px;
                        border: 1px solid #cccccc;
                        .check-bg{
                            display: none;
                        }
                        &.active{
                            border: 1px solid red;
                            position: relative;
                            
                            .check-bg{
                                display: block;
                                position: absolute;
                                right: 0;
                                top: 0;
                                height: 24px;
                                width: 30px;
                                overflow: hidden;

                                .corner{
                                    width: 0;
                                    height: 0;
                                    position: absolute;
                                    top: 12px;
                                    right: 0;

                                    // border-top: 41px solid #cc3333;
                                    border-bottom: 12px solid red;
                                    border-left: 14px solid transparent;
                                    .right{
                                        display: block;
                                        position: absolute;
                                        top: 3px;
                                        right: -2px;
                                        color: white;
                                        font-size: 8px;
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .btn-box{
                display: flex;
                margin-top: 50px;
                .btn{
                width: 180px;
                height: 40px;
                
                cursor: pointer;
                font-size: 16px;
                text-align: center;
                line-height: 40px;
                margin-right: 30px;
                .iconfont{
                    margin-right: 5px;
                }
                &.btn1{
                    border: 1px solid #FF0036;
                    color: #FF0036;
                    background: #FFEDED;
                }
                &.btn2{
                    
                    color: white;
                    background: #FF0036;
                }
            }
            }
            
        }
    }
    .shop-info{
        border: 1px solid #cccccc;
        margin-top: 50px;;
        .shop-detail{
            color: red;
            font-size: 16px;
            display: flex;
            border-top: 1px solid red;
            width: 80px;
            margin-top: -1px;
            padding:0 5px;
            
        }
        // padding:  20px;
        img{
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
    }
}
</style>

