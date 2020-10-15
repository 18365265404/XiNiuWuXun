<template>
<div class="layout">
  <!-- <Scroll :on-reach-bottom="handleReachBottom" height="800"> -->
  <div class="container-water-fall">

    <waterfall :col='col'   :data="shopList"  @loadmore="loadmore"  @scroll="scroll" >
      <template >
        <div style="border:1px solid #cccccc;margin-right:10px;margin-bottom:10px;" class="cell-item" v-for="(item,index) in shopList" :key="index">
          <!-- <img v-if="item.img" :src="item.img" alt="加载错误"  />   //lazy-src 懒加载 -->
          <img @click="goDetail(item.inspirationId)" v-lazy="qiniuHead+item.imgUrl"  :key="index"/>
          <div class="item-body" >
              <div class="item-desc">{{item.title}}</div>
              <div class="item-footer">
                  <div class="avatar" :style="{backgroundImage : `url(${item.avatar})` }"></div>
                  <div class="name">{{item.user}}</div>
                  <div class="like" :class="item.liked?'active':''" >
                      <i ></i>
                      <div class="like-total">{{item.liked}}</div>  
                  </div>
              </div>
          </div>
        </div>
      </template>
    </waterfall>
    <loading-bottom v-show="isloading"></loading-bottom>
    
  </div>
  <!-- </Scroll> -->
</div>

</template>

<script>
import loadingBottom from '@/components-item/loading-bottom.vue'
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {
  components:{
    loadingBottom
  },

  data () {
    return {
      isloading:false,
      qiniuHead:url.qiniuH,
      shopList:[],
      col:4,
      current:"1",
      pages:''
    }
  },
  computed:{
      itemWidth(){  
        return (138*0.5*(document.documentElement.clientWidth/375)).toString()   //#rem布局 计算宽度
      },
      gutterWidth(){
        return (9*0.5*(document.documentElement.clientWidth/375)).toString()    //#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
      }
  },
    methods:{
      goDetail(inspirationId){
        this.$router.push({
        　　name: 'inspiration_detail',
            query: {
        　　　　id: inspirationId
        　　}
        })
      },
      handleReachBottom () {
       
      },
      scroll(scrollData){
        // return
          console.log(scrollData)
          if(scrollData.diff==0){
            this.current++
            if(this.current>this.pages){
                return
            }
            this.isloading=true
            this.initData(this.tableData)
          }
      },
      mix(){
        this.$waterfall.mix()
      },
      switchCol(col){
        this.col = col
        console.log(this.col)
      },
      loadmore(index){
        
      },
      // 初始化查询数据
      initData(params){
          getRequest(url.platformInspirationSelectInspirationList,params).then(data=> {
          
              if(data.data.status!=1){
                  this.$Message.error(data.data.message);
                  return
              }


              console.log("查询所有商品",data.data)
              let list = data.data.data.records
              this.shopList =this.shopList.concat(list) 
              this.pages=data.data.data.pages
              this.isloading=false
          }); 
      }
    },
    created(){
      this.initData(this.tableData)
    }
}
</script>

