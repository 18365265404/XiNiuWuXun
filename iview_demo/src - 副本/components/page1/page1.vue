<template>
<div class="layout">
  <!-- <Scroll :on-reach-bottom="handleReachBottom" height="800"> -->
  <div class="container-water-fall">

    <waterfall :col='col'   :data="data"  @loadmore="loadmore"  @scroll="scroll">
      <template >
        <div style="border:1px solid #cccccc;margin-right:10px;margin-bottom:10px;" class="cell-item" v-for="(item,index) in data" :key="index">
          <!-- <img v-if="item.img" :src="item.img" alt="加载错误"  />   //lazy-src 懒加载 -->
          <img v-lazy="item.img"  :key="index"/>
          <div class="item-body">
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
    <loading-bottom></loading-bottom>
    
  </div>
  <!-- </Scroll> -->
</div>

</template>

<script>
import loadingBottom from '@/components-item/loading-bottom.vue'
export default {
  components:{
    loadingBottom
  },

  data () {
    return {
      data:[
        {id:"1",img:"https://images.searchs.cn/bdhomeimage//addverttisingg/21474836541/21474836541.j",title:"图片1"},
        {id:"2",img:"https://img.alicdn.com/imgextra/i4/712485819/O1CN01XEipns1sr9E5tVAL4_!!712485819-0-daren.jpg_250x250xz.jpg",title:"图片2"},
        {id:"3",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片3"},
        {id:"4",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片4"},
        {id:"5",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片5"},
        {id:"6",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片6"},
        {id:"7",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片7"},
        {id:"8",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片8"},
        {id:"9",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片9"},
        {id:"10",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片10"},
        {id:"1",img:"https://images.searchs.cn/bdhomeimage//addverttisingg/21474836541/21474836541.j",title:"图片1"},
        {id:"2",img:"https://img.alicdn.com/imgextra/i4/712485819/O1CN01XEipns1sr9E5tVAL4_!!712485819-0-daren.jpg_250x250xz.jpg",title:"图片2"},
        {id:"3",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片3"},
        {id:"4",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片4"},
        {id:"5",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片5"},
        {id:"6",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片6"},
        {id:"7",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片7"},
        {id:"8",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片8"},
        {id:"9",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片9"},
        {id:"10",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片10"},

      ],
      col:4,
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
      handleReachBottom () {
       
      },
      scroll(scrollData){
        // return
          console.log(scrollData)
          if(scrollData.diff==0){
              this.data = this.data.concat([
                  {id:"1",img:"https://images.searchs.cn/bdhomeimage//addverttisingg/21474836541/21474836541.j",title:"图片1"},
                  {id:"2",img:"https://img.alicdn.com/imgextra/i4/712485819/O1CN01XEipns1sr9E5tVAL4_!!712485819-0-daren.jpg_250x250xz.jpg",title:"图片2"},
                  {id:"3",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片3"},
                  {id:"4",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片4"},
                  {id:"5",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片5"},
                  {id:"6",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片6"},
                  {id:"7",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片7"},
                  {id:"8",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片8"},
                  {id:"9",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片9"},
                  {id:"10",img:"https://images.searchs.cn/bdhomeimage//product/1727/116/25769865116/25769865116.jpg_462.jpg",title:"图片10"},
              ])
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
        
      }
    }
}
</script>

