<template>
  <div class="collection">
      <div class="collection-head">
          <div class="collet-left">
              <h1>收藏商品</h1>
          </div>
          <div class="collet-right">
              <Checkbox @on-change='checkAll'  v-show="ifManage" v-model="checkVal">全选</Checkbox>
              <h3 class="cursor" v-show="ifManage">加入购物车</h3>
              <h3 class="cursor" @click="deletAll" v-show="ifManage">删除</h3>
              <h2 @click="changeManage()">批量管理</h2>
          </div>
      </div>
      <ul class="collet">
          <li class="collet-item" v-for="(item,index) in shopList" :key='index'>
              <div  class="img-box">
                  <img v-lazy="lazy"  :key="index"/>
                  <div v-show="ifManage" class="zhezhao" @click="chooseItem(item.bl,index)">
                    <div :class="{active1:item.bl,corner:true}" class="corner">
                        <Icon class="right" type="md-checkmark" />
                    </div>
                  </div>
                  <div v-show="!ifManage" class="single">
                      <Icon class="icon" type="ios-cart" />
                      <Icon @click="delet(shopList,index)" class="icon" type="ios-trash" />
                  </div>
              </div>
              <h4 class="ellipsis">宝怡德 混纺地毯 超柔丙纶  多尺寸可选		 朵拉（9MM） </h4>
              <h5>商品单价：{{}}元</h5>
          </li>
      </ul>
  </div>
</template>
<style lang="less" scoped>
.collection{
    .collection-head{
        display: flex;
        line-height: 30px;
        
        .collet-left{
            flex: 1;
            display: flex;
            
            h1{
                font-size: 18px;
                border-bottom: 2px solid red;
            }
        }
        
        .collet-right{
            display: flex;
            h3{
                margin-left: 10px;
            }
            h2{
                cursor: pointer;
                border: 2px solid #cccccc;
                height: 25px;
                padding:0 10px;
                margin: 0 10px;
                line-height: 25px;
            }
        }
    }
    .collet{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .collet-item{
            text-align: center;
            margin-bottom: 20px;
            width: 170px;
            margin-right: 13px;
            &:nth-child(5n){
                margin-right: 0;
            }
            .img-box{
                position: relative;
                border: 1px solid #cccccc;
                width: 168px;
                cursor: pointer;
                height: 170px;
                .zhezhao{
                    width: 168px;
                    height: 168px;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    margin: auto;
                    // background: red;
                    background-color:rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: row-reverse;
                    .corner{
                        width: 0;
                        height: 0;
                        // border-top: 41px solid #cc3333;
                        border-top: 41px solid #626262;
                        border-left: 41px solid transparent;
                        &.active1{
                            border-top: 41px solid #cc3333;
                            .right{
                                position: absolute;
                                right: 0;
                                top: 0;
                                color: white;
                                font-size: 22px;
                            }
                        }
                        .right{
                            position: absolute;
                            right: 0;
                            top: 0;
                            color: #838383;
                            font-size: 22px;
                        }
                    }
                }
                &:hover{
                    .single{
                        display: block;
                    }
                    
                }
                .single{
                    position: absolute;
                    right: 0;
                    top: 0;
                    display: flex;
                    font-size: 20px;
                    display: none;
                    .icon{
                        cursor: pointer;
                        background-color:rgba(0, 0, 0, 0.5);
                        padding: 3px;
                        color: white;
                        margin-left: 3px;
                        
                        &:hover{
                            background-color:rgba(161, 79, 91, 0.6);
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
        
      lazy:'https://images.searchs.cn/bdhomeimage//product/1855/2480/25769842480/25769842480.jpg_250x250.jpg',
      checkVal: false,
      ifManage:false,
      shopList:[
          {id:'1',price:'1000',bl:true,des:'号上狗皮膏水电费水电费如果',img:"https://images.searchs.cn/bdhomeimage//product/1855/2480/25769842480/25769842480.jpg_250x250.jpg"},
          {id:'3',price:'1000',bl:false,des:'号上狗皮膏水电费水电费如果',img:"https://images.searchs.cn/bdhomeimage//product/1855/2480/25769842480/25769842480.jpg_250x250.jpg"},
          {id:'5',price:'1000',bl:false,des:'号上狗皮膏水电费水电费如果',img:"https://images.searchs.cn/bdhomeimage//product/1855/2480/25769842480/25769842480.jpg_250x250.jpg"}
      ]
    }
  },
  methods:{
    //单删
    delet(list,index){
        list.splice(index,1)
    },
    // 多删
    deletAll(){
        let newArr = []
        this.shopList.forEach((v,i)=>{
            if(!v.bl){
                newArr.push(v)
            }
            
        })
        this.shopList=newArr
        this.ifManage=false
    },
    checkAll(){

        if(this.checkVal){
            this.shopList.forEach((v,i)=>{
                this.shopList[i].bl=true
            })
        }else{
            this.shopList.forEach((v,i)=>{
                this.shopList[i].bl=false
            })
        }
    },  
    changeManage(){
        this.ifManage=!this.ifManage
        this.checkVal=true
        this.shopList.forEach((v,i)=>{
            if(!this.shopList[i].bl){
               this.checkVal=false
            }
        })
    },
    chooseItem(val,index){
        // alert()
        this.shopList[index].bl=!this.shopList[index].bl
        this.checkVal=true
        this.shopList.forEach((v,i)=>{
            if(!this.shopList[i].bl){
               this.checkVal=false
               
            }
        })
    }
  }
}
</script>

