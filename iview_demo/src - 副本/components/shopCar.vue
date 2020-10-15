<template>
  <div class="shopCar">
    <div class="layout car-box">
        <div class="tb-head">
            <div class="head-name head-name1"><Checkbox @on-change="checkAllfn" v-model="checkAll">全选</Checkbox></div>
            <div class="head-name">商品信息</div>
            <div class="head-name">规格</div>
            <div class="head-name">数量</div>
            <div class="head-name">单价</div>
            <div class="head-name"></div>
        </div>
        <div class="tb-body" v-for="(item,index) in carList" :key="index">
            <div class="body-check body-des"><Checkbox @on-change='checkedfn' v-model="item.checked"></Checkbox></div>
            <div class="body-msg body-des">
                <img :src="qiniuHead+item.imgUrl" alt="">
                <h2>{{item.goodsName}}</h2>
            </div>
            <div class="body-size body-des"><span>{{item.specificationsValue}}</span></div>
            <div class="body-num body-des">
                <div class="num-box">
                    <num-change :shopId='item.goodsId'  :num='item.num' :index='index' @changeNum="changeNum"></num-change> 
                    <span v-show="item.isStock" class="kucun">库存不足</span>
                </div>
            </div>
            <div class="body-price body-des">{{item.adjustedPrice}}</div>
            <div class="body-delet body-des" @click="delet(index)"><a href="#">删除</a></div>
        </div>
        <div ref='pay'></div>
        <div class='pay-box'   v-show="isShowPay">
            <div class="pay-left">
                <Checkbox @on-change="checkAllfn" v-model="checkAll">已选（{{chooseNum}}）</Checkbox>
                <div class="deletAll" @click="deletMost">批量删除</div>
            </div>
            <div class="pay-right">
                <h4 @click="submitPay">去结算</h4>
                
                <h3>￥{{priceAll}}</h3>
                <h2><span>合计金额</span><span>（不含运费）</span></h2>
            </div>
        </div>
        <div class='pay-box' id="fixed-pay" v-show="!isShowPay">
            <div class="pay-left">
                <Checkbox @on-change="checkAllfn" v-model="checkAll">已选（{{chooseNum}}）</Checkbox>
                <div class="deletAll" @click="deletMost">批量删除</div>
            </div>
            <div class="pay-right">
                <h4 @click="submitPay">去结算</h4>
                
                <h3>￥{{priceAll}}</h3>
                <h2><span>合计金额</span><span>（不含运费）</span></h2>
            </div>
        </div>
        <div ></div>
    </div>
    <div style="height:200px;"></div>
  </div>
</template>

<script>
import numChange from '@/components-item/num-change.vue'
import local_storage from '@/utils/local_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {

components: {
    numChange
},
data () {
    return {

        checkAll:false,
        single:false,
        num:1,
        carList:[],
        isShowPay:true,
        chooseNum:0,
        priceAll:0,
        qiniuHead:url.qiniuH,
        page:{
            pageSize:10,
            total:100,
            pageNum:1
        },
    }
},

methods:{
    submitPay(){
        
        let isStockList=this.carList.filter((v)=>{
            return v.isStock 
            
        })
        if(isStockList.length!=0){
            return
        }
        this.payPage(this.carList)
        
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
    // 批量删除
    deletMost(){
        let chooseArr=this.carList.filter((v)=>{
            return v.checked 
            
        })
        let strsArr=[]
        this.carList = chooseArr
        chooseArr.forEach((v,i)=>{
            strsArr.push(this.carList[i].goodsId+'_'+this.carList[i].specificationsId)
        })
        console.log("选中删除的列表",strsArr)
        return
        this.statistics()
        let userDate = local_storage.storageGet('userData')
        deleteRequest(url.goodsShoppingCartDeleteShoppingCart+`${userDate.userId}`, {
            strs:[this.carList[index].goodsId+'_'+this.carList[index].specificationsId]
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            

            console.log("删除购物车商品",data)
            
            
        });
    },
    // 统计叠加数据
    statistics(){
        this.priceAll=0
        let chooseArr=this.carList.filter((v)=>{
            return v.checked 
            
        })
        
        chooseArr.forEach((v,i)=>{
            this.priceAll+=parseInt(v.adjustedPrice)*(v.num)
            
        })
        local_storage.storageSet('shop-car',this.carList)
        this.chooseNum=chooseArr.length
        console.log("选中的choose价格",this.priceAll)
    } ,
    // 单选
    checkedfn(){
        console.log('购物车列表',this.carList)
        this.checkAll=true
        this.carList.forEach((v,i)=>{
            if(!v.checked){
                this.checkAll=false
                
            }
        })
        
        this.statistics()
    },
    // 全选
    checkAllfn(){
        if(this.checkAll==true){
            this.carList.forEach((v,i)=>{
                this.carList[i].checked=true
            })
        }else{
            this.carList.forEach((v,i)=>{
                this.carList[i].checked=false
                
            })
        }

        this.statistics()
    },
    handleScroll(){
        let  windowHeight = document.documentElement.clientHeight;
        // console.log("窗口的高度",windowHeight)
        let  payTop = this.$refs.pay.getBoundingClientRect().top
        if(payTop+70+50>=windowHeight){
            this.isShowPay=false
        }else{
            this.isShowPay=true
        }
        // console.log("距离顶部的距离",payTop)
             
    },
    delet(index){
        // this.carList.splice(index,1)
        this.statistics()
        let userDate = local_storage.storageGet('userData')
        deleteRequest(url.goodsShoppingCartDeleteShoppingCart+`${userDate.userId}`+'/1', {
            // strs:[this.carList[index].goodsId+'_'+this.carList[index].specificationsId]
            
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            

            console.log("删除购物车商品",data)
            
            
        });
    },
    changeNum(obj){
        console.log('father',obj)
        let startNum=this.carList[obj.index].num
        let carNum=0
        this.carList[obj.index].isStock=obj.isStock
        this.carList[obj.index].num=obj.val
        // 如果库存充足，提交给后台数量
        if(!obj.isStock){
            let userDate = local_storage.storageGet('userData')
            putRequest(url.goodsShoppingCartUpdateShoppingCart, {
                userId:userDate.userId,
                goodsId:this.carList[obj.index].goodsId,
                specificationsId:this.carList[obj.index].specificationsId,
                num:obj.val-startNum
            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }
                

                console.log("购物城添加商品数量提交",data)
                
                
            }); 
        }

        this.carList.forEach((v,i)=>{
            // this.carList[i].checked=false
            carNum+=parseInt(v.num)
        })
        // this.$store.commit('carNum',carNum);
        
        // console.log('carNum',carNum)
        
        // console.log("this.carList",this.carList)
        this.statistics()
        
    },
    initCar(){
        
        let userDate = local_storage.storageGet('userData')
        getRequest(url.goodsShoppingCartSelectShoppingCartList+`${userDate.userId}`, {
            current:this.page.pageNum,

        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            this.carList= data.data.data.iPage.records
            this.page.total=data.data.data.iPage.total
            
            console.log("查询购物车列表",data)
            
            
        });
    }
},
computed:{
    userData(){
        
        return this.$store.state.a.userData
    }
},
watch:{
    userData(val1,val2){
        if(!val1){
            this.$router.push("/home");
        }
        console.log(11111111111111,val1,val2)
    }
},
mounted() {
    window.addEventListener("scroll", this.handleScroll,true);
},
created(){
    this.initCar()
    // let userData =local_storage.storageGet('userData')
    // if(!userData){
    //     this.$router.push("/home");
    //     return
    // }
    // this.carList =local_storage.storageGet("shop-car") || []
    // this.checkAll=true
    // this.carList.forEach((v,i)=>{
    //     if(!v.checked){
    //         this.checkAll=false
            
    //     }
    // })
    this.statistics()
}
}
</script>

<style lang="less" scoped>
    .shopCar{
        .car-box{
            .tb-head{
                background: #F9F7F7;
                border: 1px solid #cccccc;
                display: flex;
                .head-name{
                    flex: 1;
                    
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    
                    &.head-name1{
                        width: 150px;
                        flex:none;
                        text-align: left;
                        margin-left: 60px;
                    }
                }
            }
            .tb-body{
                background: #FCFCFC;
                border: 1px solid #cccccc;
                border-top: none;
                
                display: flex;
                .body-des{
                    flex: 1;
                    align-items: center;
                    box-sizing: border-box;
                    justify-content: center;
                    display: flex;
                    padding: 18px 5px;
                    &.body-check{
                        justify-content:start;
                        width: 150px;
                        flex:none;
                        text-align: left;
                        margin-left: 60px;
                        padding: 18px 0px;
                    }
                    &.body-msg{
                        display: flex;
                        text-align: left;
                        img{
                            width: 80px;
                            height: 80px;;
                        }
                    }
                    &.body-size{
                        
                        
                        overflow: hidden;
                        text-align: center;
                    }
                    &.body-num{
                        
                        .num-box{
                            padding-left: 50px;
                            width: 195px;
                            height: 40px;
                            position: relative;
                            
                            .kucun{
                                position:absolute;
                                top: 12px;
                                left: 145px;
                                color: #f83244;
                                margin: auto;
                            }
                        }
                        
                    }
                }
            }
            .pay-box{
                margin-top: 50px;
                padding-left: 60px;
                border: 1px solid #cccccc;
                background: #F5F5F5;
                align-items: center;
                height: 70px;
                display: flex;
                .pay-left{
                    display: flex;
                    .deletAll{
                        margin-left: 50px;
                    }
                }
                .pay-right{
                    flex: 1;
                    display:flex;
                    align-items: center;
                    flex-direction: row-reverse;
                    h4{
                        width: 150px;
                        color: white;
                        background: #CC4444;
                        font-size: 18px;
                        line-height: 70px;
                        text-align: center;
                        
                    }
                    h3{
                        font-size: 24px;
                        color: #CC4444;
                        line-height: 70px;
                        padding: 0 10px;
                    }
                    h2{
                        display: flex;
                        flex-direction: column;
                        
                        text-align: center;
                        font-size: 12px;
                    }
                }
            }
            #fixed-pay{
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                border: 1px solid blue;
                width: 1200px;
                height: 70px;
            }
            
        }
    }
</style>
