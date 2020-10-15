<template>
  <div class="layout nav">
    
    <div class="nav-center"> 
        

        
          
        
        <!-- <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'activity'}" ><span>秒杀</span></router-link> -->
        <router-link active-class="active-title" class="nav-title cursor" tag="span" :to="{path:'home'}" ><span>首页</span></router-link>
        <ul class="shop-content">
          <li v-for="(item,index) in list1" :key="item.id" @mouseleave="menuMouseLeave(item)"  @mouseenter="menuMouseEnter(item)"><span>{{item.classifyName}}</span><span></span></li>
        </ul>
        <ul @mouseleave="menuMouseLeave()"  @mouseenter="menuMouseEnter()" class="neneu-right" v-show="showMenTwo">
          <li class="menu1-item" v-for="(item,index) in list2" :key="item.id">
            <p class="cursor" @click="goShopCenter(item.classifyId,'1')">{{item.classifyName}} ></p>
            <div class="menu2-box">
              <span class="cursor" @click="goShopCenter(item2.classifyId,'2')" v-for="(item2,index) in item.list" :key="item2.id">{{item2.classifyName}}</span>

            </div>
          </li>
        </ul>
        <router-link active-class="active-title"  class="nav-title cursor" tag="span" :to="{path:'inspiration'}" ><span>灵感</span></router-link>
        <router-link active-class="active-title"  class="nav-title cursor" tag="span" :to="{path:'business'}" ><span>对公业务</span></router-link>
    </div>
    
    <!-- <div class="nav-right ">
       <searchInput class="searchInput" style=""></searchInput><div v-show="userData.userId" @click="goShopCar" class="car cursor"><Icon class="icon" type="ios-cart-outline" /><span class="num">{{carNum}}</span></div>
    </div> -->
  </div>
</template>

<script>
import searchInput from '@/components-item/search-input.vue'
import {getRequest,postRequest,putRequest} from '@/utils/ajax';
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
export default {
  components:{
    searchInput,
  },

  data () {
    return {
      showMenu:false,
      showMenTwo:false,
      list1:[
        {
          "name":'电视 空调 电脑',
          'id':"1",
          'list2':[
            {
              "name":'电视',
              "id":'1',
              'uid':"1",
              'list3':[
                {
                  "id":'1',
                  'name':'单人沙发1'
                },
                {
                  "id":'2',
                  'name':'双人沙发2'
                },
                {
                  "id":'3',
                  'name':'三人沙发3'
                },
                {
                  "id":'4',
                  'name':'四人沙发4'
                },
                {
                  "id":'6',
                  'name':'单人沙发1'
                },
                {
                  "id":'7',
                  'name':'双人沙发2'
                },
                {
                  "id":'8',
                  'name':'三人沙发3'
                },
                {
                  "id":'9',
                  'name':'四人沙发4'
                },
                {
                  "id":'10',
                  'name':'单人沙发1'
                },
                {
                  "id":'11',
                  'name':'双人沙发2'
                },
                {
                  "id":'12',
                  'name':'三人沙发3'
                },
                {
                  "id":'13',
                  'name':'四人沙发4'
                }
              ]
            },
            {
              "name":'空调',
              'id':'2',
              'uid':"1",
              'list3':[
                {
                  "id":'1',
                  'name':'单人沙发11'
                },
                {
                  "id":'2',
                  'name':'双人沙发22'
                },
                {
                  "id":'3',
                  'name':'三人沙发33'
                },
                {
                  "id":'4',
                  'name':'四人沙发44'
                }
              ]
              },

            ],
        },


        {
          "name":'沙发 椅子，桌子',
          'id':"2",
          'list2':[
            {
              "name":'沙发',
              "id":'1',
              'uid':"1",
              'list3':[
                {
                  "id":'1',
                  'name':'单人沙发188888888888'
                },
                {
                  "id":'2',
                  'name':'双人沙发28888888'
                },
                {
                  "id":'3',
                  'name':'三人沙发388888'
                },
                {
                  "id":'4',
                  'name':'四人沙发4888888'
                }
              ]
            },
            {
              "name":'桌子',
              'id':'2',
              'uid':"1",
              'list3':[
                {
                  "id":'1',
                  'name':'单人沙发1188888'
                },
                {
                  "id":'2',
                  'name':'双人沙发28888882'
                },
                {
                  "id":'3',
                  'name':'三人沙发3388888'
                },
                {
                  "id":'4',
                  'name':'四人沙发4488888'
                }
              ]
              },

            ],
        },
        {
          "name":'地板 瓷砖 大理石',
          'id':"3",
          'list2':[
            {
              "name":'地板',
              "id":'1',
              'uid':"1",
              'list3':[
                {
                  "id":'1',
                  'name':'单人沙发1999999999'
                },
                {
                  "id":'2',
                  'name':'双人沙发299999999'
                },
                {
                  "id":'3',
                  'name':'三人沙发3999999'
                },
                {
                  "id":'4',
                  'name':'四人沙发499999999'
                }
              ]
            },
            {
              "name":'瓷砖',
              'id':'2',
              'uid':"1",
              'list3':[
                {
                  "id":'1',
                  'name':'单人沙发11999999'
                },
                {
                  "id":'2',
                  'name':'双人沙发22999999'
                },
                {
                  "id":'3',
                  'name':'三人沙发3399999'
                },
                {
                  "id":'4',
                  'name':'四人沙发4499999'
                }
              ]
              },

            ],
        },
      ],
      contentStyle:'width:180px',
      list2:[],
      list3:[],

    }
  },
  computed:{
    carNum(){
      return this.$store.state.a.carNum;
    },
    userData(){
       return this.$store.state.a.userData;
     },
  },
  
  methods:{
    // 跳转商品详情
    goShopCenter(id,num){
      this.showMenu=false
      let routeUrl = this.$router.resolve({
        path: "/shopCenter",
        query: {num:num,id:id}
      });
      window.open(routeUrl.href, '_blank');
      // this.$router.push("/shopCenter");
    },
    goShopCar(){
      this.$router.push("/shopCar");
    },
    titleMouseEnter(){
      
      this.showMenu=true
    },
    titleMouseLeave(){
      this.showMenu=false
      
    },
    // 点击二级菜单的时候
    menuMouseLeave(row){
      this.contentStyle='width:180px'

      this.showMenTwo=false
      
    },
    menuMouseEnter(rows){
      this.contentStyle='width:1200px'
      this.showMenTwo=true
      if (!rows)  return
      console.log('传递的参数容我rows',rows)
      
      this.list2=rows.list
    },
  },
  created(){
      getRequest(url.goodsClassifySelectClassifyList, {
           

      }).then(data=> {
          // console.log("商品三级菜单",data.data.data)
          if(data.data.status!=1){
             return
          }
          
          this.list1=data.data.data
         
          

          
      });
  },
  
}
</script>
<style lang="less" scoped>
.nav{
  height: 58px;
  display: flex;
  .shop-box{
    height: 30px;
    background: red;
    line-height: 30px;
    margin-top: 12px;
    width: 180px;
    font-size: 15px;
    margin-right: 25px;
    .shop-title{
      position: relative;
      color: white;
      
      justify-content:space-between;
      padding: 0 10px 0 20px;
      &:hover{
        .jiantou_one{
          transform:rotate(180deg);
          
        }
        
      }
      .jiantou_one{
        margin-left: 70px;
        font-size: 18px;
        
      }
    }
    
    
  }

  .nav-center{
    display: flex;
    position: relative;
    .shop-content{
      display: flex;
      flex: 1;
      line-height: 53px;
      font-size: 15px;
      li{
        cursor: pointer;
        margin-right: 50px;
      }
    }
    .neneu-right{
        z-index: 10000;
        position: absolute;
        left: 0;
        top: 57px;
        border-top: 1px solid #cccccc;
        padding-left: 50px;
        padding-top: 30px;
        width: 1200px;
        background: white;
        .menu1-item{
          display: flex;
          margin-bottom: 15px;
          p{
            color:#666666; 
            font-size: 14px;
          }
          .menu2-box{
              margin-left: 10px;
              color:#666666;
              flex-wrap: wrap;
              flex: 1;
              span{
                font-size: 14px;
                margin-bottom: 8px;
                border-left: 1px solid #cccccc;
                white-space:nowrap; //单个标签不给换行
                padding: 0 12px;
                
              }
          }
        }
      }
  }
  .nav-title{
    font-size: 15px;
    height: 30px;
    margin-top: 16px;
    margin-right: 50px;
    span{
      font-size: 15px;
      color: #595757;
      padding-top: 20px;
      &:hover{
        color: #c1975b;
        border-bottom: 2px solid #c1975b;
        padding-bottom: 9px;
      }
    }
    &.active-title{
      font-size: 15px;
      
      border-bottom: 2px solid #c1975b;
      span{
        font-size: 15px;
        color: #c1975b;
        
      }
    }  

  }

  .nav-right{
    display: flex;
    float: right;
    .searchInput{
      width:400px;
      
      margin-top: 12px;
      display: block;
    }
    .car{
      // padding-top:20px;
      color: #cccccc;
      font-size: 34px;
      position: relative;
      padding-right: 10px;
      .num{
        
        line-height: 23px;
        text-align: center;
        color: white;
        font-size: 12px;
        position: absolute;
        left: 25px;
        top: 5px;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        background: red;
      }
    }
  }
    
  
  
  
}

</style>

