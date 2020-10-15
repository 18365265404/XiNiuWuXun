<template>
  <div>
      <div v-show="title"  class="shop-title"><span><slot></slot></span></div>
      <ul class="shop-box">
        <li @click="goDetail(item.goodsId)" class="shop-item" v-for="(item,index) in itemList" :key="index">
            <div class="img-box">
              <!-- <img v-for="img in imageList" v-lazy="img" /> -->
              <img v-lazy="qiniuHead+item.imgUrl"  :key="index"/>
            
            </div>
            
            <div class="shop-des">
                <h1>{{item.goodsName}}</h1>
                <h2><span>门店价：</span><span class="money">￥{{item.adjustedPrice}}</span></h2>
                <h3>犀牛物讯-直营店</h3>
            </div>
            <div class="shop-operation" v-show="true">
                
                <h5 style="opacity:0"><Icon type="ios-cart-outline" /></h5>
                <h4 style="opacity:0" @click.stop="goCollect(item.goodsId)">收藏</h4>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {
    props:{
      itemList:{
        type:Array,
        default:[]
      },
      title:{
          type:String,
          default:''
      }
  },
  name: 'HelloWorld',
  data () {
    return {
      qiniuHead:url.qiniuH,
      lazy:"https://images.searchs.cn/bdhomeimage//product/1727/746/25769860746/25769860746.jpg",
      
    }
  },

  methods:{
      goDetail(id){
        let routeUrl = this.$router.resolve({
          path: "/shopDetail",
          query: {id:id}
        });
        window.open(routeUrl.href, '_blank');
        // this.$router.push({name: 'shopDetail',params:{ id:'1'}});
        console.log("")
      },
      goCollect(id){
        postRequest(url.goodsFavoritesInsertFavorites, {
          userId:session_storage.storageGet("userData").userId,
          goodsId:id
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            console.log("收藏成功",data)
            
            
        });
        
      }

  },

}
</script>
<style lang="less" scoped>
@import "../assets/less/common";


  .shop-title{
    height: 20px;
    line-height: 20px;
    border-left: 5px solid #2DBCF0;
    font-size: 16px;
    margin: 30px 0;
    span{
      margin-left: 15px;
    }
  }
  .shop-box{
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    .shop-item{
      margin-right: 12px;
      cursor: pointer;
      position: relative;
      margin-bottom: 20px;
      width: 230px;
      height: 325px;
      border: 1px solid #cccccc;
      box-shadow: 1px 2px 1px #cccccc;
      overflow: hidden;
      &:hover{
        border: 1px solid #f83244;
        
      }
      &:hover img{
        transform:scale(1.2,1.2);
      }
      &:hover .shop-operation{
        display: flex;
      }
      &:nth-child(5n){
        margin-right: 0;
      }
      .img-box{
        
        width: 230px;
        height: 230px;
        overflow: hidden;
        img{
         transition: all 0.3s;
          width: 230px;
          height: 230px;
          &[lazy="loading"] {
            margin-top: 30px;
            height: 170px;
            width: 230px;
          }
          &[lazy="error"] {
            
            height: 170px;
            
          }
        }
      
      }
      .shop-des{
        padding: 0 20px 0 20px;
        h1{
          line-height: 30px;
          font-size: 16px;
        }
        h2{
          line-height: 30px;
          
          .money{
            color: @theme-red;
          }
        }
        h3{
          line-height: 30px;
        }
      }
      .shop-operation{
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        justify-content: space-between;
        padding: 0 20px;
        width: 100%;
        line-height: 30px;
        margin-top: 20px;
        h4{
          font-size: 14px;
          width: 50px;
          height: 30px;
          text-align: center;
          background: @theme-red;
          color: white;
          border-radius: 5px;
        }
        h5{
          font-size: 30px;
          font-weight: 800;
        }
      }
    }
  }

</style>

