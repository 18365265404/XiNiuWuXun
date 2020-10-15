<template>
<div>
    <div class="swiper" style="">
      <Carousel class="swiper-box layout"  loop>
        <CarouselItem v-for="(item,index) in bannerList" :key="index">
            <div class="demo-carousel">
              <img :src="qiniuHead+item.imgUrl" alt="">
            </div>
        </CarouselItem>
        
      </Carousel>
    </div>

    <div class="layout shop" v-for="(item,index) in classifyList" :key="index">
        
        
        <home-list  :itemList='item.list' :title="item.classifyName">{{item.classifyName}}</home-list>

    </div>

    <!-- <div class="layout shop">
        
        <home-list :itemList='itemList' title="软装">软装</home-list>
    </div>

    <div class="layout shop">
        
        <home-list :itemList='itemList' title="建筑材料">建筑材料</home-list>
    </div>

    <div class="layout shop">
        
        <home-list :itemList='itemList' title="设备">设备</home-list>
    </div> -->
</div>

</template>

<script>
import homeList from '@/components-item/home-list.vue'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {
  name: 'HelloWorld',
  components:{
    homeList
  },
  data () {
    return {
      qiniuHead:url.qiniuH,
      classifyList:[],
      itemList:[
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
       ] ,
      bannerList:[]
    }
  },
  created(){
    // 轮播图
      getRequest(url.platformCarouselSelectCarouselList, {
          

      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          this.bannerList= data.data.data
          console.log("首页banner",data)
          
          
      }); 

      // 四大分类
      getRequest(url.goodsGoodsSelectGoodsSixByClassifyOne, {
          

      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          this.classifyList= data.data.data
          console.log("四大分类",data)
          
          
      }); 
  },
}
</script>

<style lang="less" scoped>
@import "../assets/less/common";
.swiper{
  height:425px;
  width:100%;
  background:#F4F4F4;
  .swiper-box{
    height:425px;
    .demo-carousel{
      height:425px;
      
    }
  }
  
}
.shop{
  margin-bottom: 80px;
}

</style>
