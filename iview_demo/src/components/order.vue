<template>
    <div class="order">
        <div class="order-type">
            <div class="type-left">
                <span :class="{active: 1==activeIndex}" @click="showOrder('1')">全部订单</span>
                <!-- <span :class="{active: 2==activeIndex}" @click="showOrder('2')">待付款</span>
                <span :class="{active: 3==activeIndex}" @click="showOrder('3')">代收款</span> -->
                <span :class="{active: 2==activeIndex}" @click="showOrder('2')">待收货</span>
                <span :class="{active: 3==activeIndex}" @click="showOrder('3')">已签收</span>
            </div>
            <div class="type-right">
                <Input @on-search="search" v-model="searchV" search enter-button placeholder="搜索订单号" />
                
            </div>
        </div>
        <ul class="table-head">
            <li  class="date-choose cursor" >
                <!-- <div v-unThisClick="unThisClick" class="dateName" @click="showDateB">
                    <span>{{dateVal}}</span>
                  
                </div> -->
                <div class="date-list" v-show="showDate" >
                    <span @click="chooseDate(index,item)" :class="{dateActive:index==dateIndex}" v-for="(item,index) in datelist" :key="index">{{item}}</span>
                </div>
            </li>
            <li class="head-order-detail"><span>订单详情</span></li>
            <li><span>收货信息</span></li>
            <li><span>金额</span></li>
            <li><span>备注</span></li>
            <li><span>全部状态</span></li>
            <li><span>&nbsp;</span></li>

        </ul>
        <ul class="order-body">
            <li class="order-item" v-for="(item,index) in orderList" :key="index">
                <div class="item-top">
                    <span>{{item.createTime|date}}</span>
                    <h2><span>订单号：</span><span>{{item.orderNo}}</span></h2>
                </div>
                <div class="item-content">
                    <div class="item-des-box">
                        <div class="item-des-left" v-for="(item2,index) in item.list" :key="index">
                            <img :src="qiniuHead+item2.imgUrl" alt="">
                            <div class="item-des-text">
                                <h2>{{item2.goodsName}}</h2>
                                <h3><span>x</span><span>{{item2.num}}</span></h3>

                            </div>
                        </div>
                    </div>
                    <div class="item-des-right">
                        <div class="item-name item-text-des">
                            <h2>
                                <span style="font-size:12px">{{item.receivingAddressStr}}</span>
                                <!-- <Icon class="icon" type="ios-person-outline" /> -->
                            </h2>
                        </div>
                        <div class="item-money item-text-des">
                            <span>总额</span>
                            <span>￥{{item.sumPrice}}</span>
                            <span>（含物流费：￥{{item.freight}}）</span>
                        </div>
                        <div class="item-status item-text-des">
                            <span>{{item.remarks}}</span>
                            
                        </div>
                        <div class="item-pay item-text-des">
                            
                            <div><span>交易状态：</span><span style="color:#F83244">{{item.tradingStatusStr}}</span></div>
                            <div><span>订单状态：</span><span style="color:#F83244">{{item.orderStatusStr}}</span></div>
                            <div><span>物流状态：</span><span style="color:#F83244">{{item.logisticsStatusStr}}</span></div>
                            <!-- <div><span>评价状态：</span><span style="color:#F83244">{{item.evaluateStatusStr}}</span></div> -->
                            <div><span>发货状态：</span><span style="color:#F83244">{{item.consignmentStatusStr}}</span></div>
                        </div>
                        <div class="item-status item-text-des">
                            <Button  v-show="item.logisticsStatus==1" @click="subStatus(item.orderId)" type="info" style="width:80px;margin:0 auto;" ghost>确认收货</Button>
                            <Button  v-show="item.logisticsStatus==0" disabled  type="info" style="width:80px;margin:0 auto;" ghost>确认收货</Button>
                            <Button disabled v-show="item.logisticsStatus==2"  type="info" style="width:80px;margin:0 auto;" ghost>已签收</Button>
                            
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="page">
            <Page :current="page.pageNum"  :page-size='page.pageSize' @on-change='changePage' :total="page.total"  />
        </div>
        
    </div>
</template>

<script>
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {

name: 'HelloWorld',
data () {
    return {
        searchV:'',
        qiniuHead:url.qiniuH,
        orderList:[],
        page:{
            pageSize:10,
            total:100,
            pageNum:1
        },
        showDate:false,
        dateVal:'请选择',
        activeIndex:1,
        datelist:['请选择','三个月内订单','今年内订单','2019年内订单'],
        dateIndex:0,
        orderNo:'',
    }
},
methods:{
    search(){
        this.initOrder()
    },
    subStatus(orderId){
        putRequest(url.orderOrderUpdateByOrderId, {
            orderId:orderId,
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            
            this.initOrder()
            console.log("确认收货",data)
            
            
        }); 
    },
    unThisClick(){

        this.showDate=false
    },
    showDateB(){
        this.showDate=!this.showDate
    },
    chooseDate(index,val){
        this.dateVal=val
        this.dateIndex=index
        this.showDate=false
    },
    showOrder(num){
        this.activeIndex=num
        if(num==1){
            this.initOrder()
            
        }
        if(num==2){
            this.initOrder('',0)
            
        }
        if(num==3){
            this.initOrder(2,'')
        }
    },
    // 切换页面
    changePage(val){
        this.page.pageNum=val
        this.initOrder()
    },
    changePageAll(val){
        // alert(val)
    },
    initOrder(logisticsStatus,consignmentStatus){
        let userDate = session_storage.storageGet('userData')
        getRequest(url.orderOrderSelectOrderList+`${userDate.userId}`, {
            current:this.page.pageNum,
            orderNo:this.searchV,
            logisticsStatus:logisticsStatus,
            consignmentStatus:consignmentStatus
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            this.orderList= data.data.data.records
            this.page.total=data.data.data.total
            
            console.log("查询所有订单",data)
            
            
        }); 
    }
},
created(){
    this.initOrder()
}
}
</script>
<style lang="less" scoped>
.order{
    .order-type{
        display: flex;
        justify-content:space-between;
        .type-left{
            display: flex;
            padding-left: 30px;
            span{
                margin-right: 25px;
                font-size: 14px;
                
                line-height: 40px;
                height: 32px;
                &:hover{
                    color: #cc3333;
                }
                &.active{
                    color: #cc3333;
                    border-bottom: 2px solid #cc3333;
                }
            }
        }
    }
    .table-head{
        display: flex;
        li{
            display: flex;
            flex: 1;
            line-height: 35px;
            background: #f5f5f5;
            font-size: 14px;
            margin-top: 30px;
            justify-content: center;
            &.date-choose{
                flex: none;
                justify-content:initial;
                width: 310px;
                padding-left: 20px;
                position: relative;
                .dateName{
                    width: 120px;
                    .jiantou{
                        position: absolute;
                        left: 120px;
                        top: 0;
                        line-height: 35px;
                    }
                }
                
                .date-list{
                    background: #1E90FF;
                    width: 110px;
                    display: flex;
                    flex-direction: column;
                    line-height: 20px;
                    background: white;
                    position: absolute;
                    top: 30px;
                    border: 1px solid #1E90FF;
                    left: 18px;
                    span{
                        margin: 0px 0;
                        
                        &:hover{
                            
                            background: #1E90FF;
                            color: white;
                            
                        }
                        &.dateActive{
                            background: #1E90FF;
                            color: white;
                        }
                    }
                    
                }
            }
            &.head-order-detail{
                width: 150px;
                justify-content: center;
            }
        }
    }
    .order-body{
        .order-item{
            margin-top: 20px;
            border: 1px solid #cccccc;
            
            .item-top{
                padding: 0 15px;
                display: flex;
                line-height: 30px;
                background: #f5f5f5;
                h2{
                    padding-left: 20px;
                }
            }
            .item-content{
                display: flex;
                .item-des-box{
                    .item-des-left{
                        border-right: 1px solid #cccccc;
                        border-bottom: 1px solid #cccccc;
                        width: 420px;
                        display: flex;
                        &:last-child{
                           border-bottom: none; 
                        }
                        img{
                            width: 62px;
                            height: 62px;
                            border: 1px solid #cccccc;
                            margin: 20px;
                        }
                        .item-des-text{
                            margin-top: 20px;
                            display: flex;
                            h2{
                                width: 300px;
                            }
                        }
                    }
                }
                
                .item-des-right{
                    flex: 1;
                    display: flex;
                    .item-text-des{
                        border-right: 1px solid #cccccc;
                        // padding-top: 20px;
                        text-align: center;
                        justify-content: center;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        &:last-child{
                            border-right: none;
                        }
                        &.item-name{
                            font-size: 14px;
                            h2{
                                .icon{
                                    font-size: 20px;
                                    color: #333333;
                                }
                            }
                        }   
                    }
                }
            }
        }
    }
    .page{
        margin-top: 20px;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>

