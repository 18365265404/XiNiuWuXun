
<template>
   
  <div class="shop-center">
      <ul class="classification layout">
          
          <classify-item v-show="brandList.length"   @searchAll='search' :name="'品牌'" :list='brandList'>品牌：</classify-item>
          <classify-item v-show="classifyList.length"  @searchAll='search' :name="'类别'" :list='classifyList'>类别：</classify-item>
          <classify-item v-show="qita.length"  @searchAll='search' :name="'其它'" :list='qita'>其它：</classify-item>
          
          <classify-item v-show="priceRangeList.length"  @searchAll='search' :name="'价格'" :list='priceRangeList'>价格：</classify-item>
          <!-- <classify-item  v-show="index+1<=showNumF" @searchAll='search' :name='品牌' :list='item.brandList'>品牌：</classify-item> -->
          <classify-item v-show="5<=showNumF" v-for="(item,index) in spuSkuList" :key="index"   @searchAll='search' :name="item.spuName" :list='item.list'>{{item.spuName}}：</classify-item>
          
      </ul>
      <div class="classify-more" v-show="list.length>menuMoreNubF">
        <h1 @click="showMoreF"><span>{{ifshowMoreF ? '收起' : '更多选项'}}</span><Icon class="jiantou"  :type="ifshowMoreF ? 'ios-arrow-up' : 'ios-arrow-down'" /></h1>
      </div>

      <div class="shop-list" style="position:relative">
          <ul class="layout sort">
              <li @click="sort('all',sortUp,0)" :class="{'sort-active': sortActive==0}"><span>综合</span></li>
              <li @click="sort('price',sortUp,1)" :class="{'sort-active': sortActive==1}"><span>价格</span><Icon class="sort-icon" :type="ifPriceUp ? 'md-arrow-round-up' : 'md-arrow-round-down'"  /></li>
          </ul>
        <Input class="searchInput" @on-search='searchAll()' v-model="likeName" search enter-button placeholder="请输入..." />
            
          
          <div class="layout shop">
        
            <home-list  :itemList='itemList' title="家具">家具</home-list>
        </div>
      </div>
      <loading-bottom v-show="isloading"></loading-bottom>
  </div>
  
</template>

<script>
import searchInput from '@/components-item/search-input.vue'
import classifyItem from '@/components-item/classify-item.vue'
import homeList from '@/components-item/home-list.vue'
import {listRemoveRepeat} from '@/utils/mathTool';
import loadingBottom from '@/components-item/loading-bottom.vue'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {
  components:{
    loadingBottom,
    classifyItem,
    homeList,
    searchInput,
  },

  data () {
    return {
       sortUp:'0',
       isloading:false,
       brandList:[],
       classifyList:[],
       priceRangeList:[],
       spuSkuList:[],
       qita:[],
       shopNum:"",
       itemList:[] ,
       imgsArr: [
            {id:'1',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'2',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'3',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'4',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'5',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'6',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'7',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'8',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'9',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'10',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'11',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
            {id:'12',img:'https://images.searchs.cn/bdhomeimage//product/1727/3363/25769868363/25769868363.jpg_462.jpg'},
       ],
        group: 0,// request param
        ifPriceUp:true,
        sortActive:'0',
        showNumF:"3",
        menuMoreNubF:"3",
        ifshowMoreF:false,
        list:[
            {
                id:"1",
                name:"品牌",
                list2:[
                    {   
                        id:"1",
                        name:"沙琪玛1",
                        bl:false
                    },{   
                        id:"2",
                        name:"凯迪拉克",
                        bl:false
                    },
                    {   
                        id:"3",
                        name:"奥斯",
                        bl:false
                    },
                    {   
                        id:"4",
                        name:"卡拉翰",
                        bl:false
                    },
                    {   
                        id:"5",
                        name:"爱茉莉",
                        bl:false
                    },
                    {   
                        id:"6",
                        name:"特步",
                        bl:false
                    },
                    {   
                        id:"7",
                        name:"迈克23",
                        bl:false
                    },{   
                        id:"1",
                        name:"沙琪玛1",
                        bl:false
                    },{   
                        id:"2",
                        name:"凯迪拉克",
                        bl:false
                    },
                    {   
                        id:"3",
                        name:"奥斯",
                        bl:false
                    },
                    {   
                        id:"4",
                        name:"卡拉翰",
                        bl:false
                    },
                    {   
                        id:"5",
                        name:"爱茉莉",
                        bl:false
                    },
                    {   
                        id:"6",
                        name:"特步",
                        bl:false
                    },
                    {   
                        id:"7",
                        name:"迈克23",
                        bl:false
                    },{   
                        id:"1",
                        name:"沙琪玛1",
                        bl:false
                    },{   
                        id:"2",
                        name:"凯迪拉克",
                        bl:false
                        
                    },
                   
                ]
            },
            {
                id:"2",
                name:"风格",
                list2:[
                    {   
                        id:"1",
                        name:"沙琪玛1",
                        bl:false
                    },{   
                        id:"2",
                        name:"凯迪拉克",
                        bl:false
                    },
                    {   
                        id:"3",
                        name:"奥斯",
                        bl:false
                    },
                    {   
                        id:"4",
                        name:"卡拉翰",
                        bl:false
                    },
                    
                    {   
                        id:"5",
                        name:"爱茉莉",
                        bl:false
                    },
                    {   
                        id:"6",
                        name:"特步",
                        bl:false
                    },
                    {   
                        id:"7",
                        name:"迈克23",
                        bl:false
                    },
                    
                   
                ]
            },
            {
                id:"3",
                name:"价格",
                list2:[
                    {   
                        id:"1",
                        name:"1000~3000",

                    },{   
                        id:"2",
                        name:"4000~6000",

                    },
                    {   
                        id:"3",
                        name:"8000~10000",

                    },

                   
                ]
            },
            {
                id:"4",
                name:"价格",
                list2:[
                    {   
                        id:"1",
                        name:"1000~3000",

                    },{   
                        id:"2",
                        name:"4000~6000",

                    },
                    {   
                        id:"3",
                        name:"8000~10000",

                    },

                   
                ]
            },
            {
                id:"5",
                name:"价格",
                list2:[
                    {   
                        id:"1",
                        name:"1000~3000",

                    },{   
                        id:"2",
                        name:"4000~6000",

                    },
                    {   
                        id:"3",
                        name:"8000~10000",

                    },

                   
                ]
            },
        ],
        pamasArr:[],
        type:'', //上级传递的参数类型
        current:"1",
        isMaxPrice:"0",
        likeName:"",
        classifyId:'',
        brandIds:'',
        priceRange:'',
        skuIds:'',
        pages:''
    }
  },
computed:{
    tableData(){
        return {
            current:this.current,
            isMaxPrice:this.isMaxPrice,
            likeName:this.likeName,
            type:this.type,
            classifyId:this.classifyId,
            brandIds:this.brandIds,
            priceRange:this.priceRange,
            
            skuIds:this.skuIds,
        }
    },
},
methods:{
    // 搜索
    searchAll(){

        this.itemList=[]
        this.initData(this.tableData)
    },
    handleScroll(){
        let scroll =this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
        
        if(scroll==0){
            this.current++
            if(this.current>this.pages){
                return
            }
            this.isloading=true
            this.initData(this.tableData)
            
        }
        // console.log("滚动条距离底部的距离",scroll)
    },
    //滚动条在Y轴上的滚动距离
    getScrollTop() {
        var documentScrollTop = 0;
        documentScrollTop = document.documentElement.scrollTop;
        return documentScrollTop;
    },
    //文档的总高度
    getScrollHeight() {
        var documentScrollHeight = 0;
        documentScrollHeight = document.documentElement.scrollHeight;
        return documentScrollHeight;
    },
    //浏览器视口的高度
    getWindowHeight() {
        var windowHeight = 0;
        windowHeight = document.documentElement.clientHeight;
        return windowHeight;
    },

    sort(kind,num,types){
        
        this.sortActive=types
        if(kind=='price'){
            this.ifPriceUp=!this.ifPriceUp
            if(num=='1'){
                
                
                this.sortUp='0'
                this.isMaxPrice=0
            }else{
                this.sortUp='1'
                this.isMaxPrice=1
            }
        }
        if(kind=='all'){
            this.isMaxPrice=''
        }
        
        this.itemList=[]
        this.initData(this.tableData)
    },
    showMoreF(){
        this.ifshowMoreF=!this.ifshowMoreF
        if(this.ifshowMoreF){
        this.showNumF=this.list.length;
        }else{
            this.showNumF='3'
        }
        
    },
    search(payLoad){
        this.itemList=[]
        this.current=1
        this.pamasArr.unshift(payLoad)
        this.pamasArr=listRemoveRepeat(this.pamasArr)

        let type= [];
        let classifyId = []
        let brandIds = []
        let priceRange = []
        let isMaxPrice = []
        let skuIds = []

        // this.pamasArr=result
        console.log('我是父级',this.pamasArr)

        this.pamasArr.forEach((v,i)=>{
            switch (v.name) {
                case '品牌':
                    
                    brandIds = v.msgArr || ''
                    break;

                case '其它':
                    console.log('其它',v.msgArr)
                    if(v.msgArr.length!=0){
                        
                        this.classifyId = v.msgArr[0].classifyId

                        this.type = v.msgArr[0].type
                    }else{
                        const paramsObj = this.$route.query
                        
                        this.type=paramsObj.num
                        this.classifyId=paramsObj.id
                    }
                    
                    break;
                    
                case '价格':
                    
                    priceRange = v.msgArr || ''
                    console.log("价格",priceRange)
                    break;
                    
                default:
                    skuIds = skuIds.concat(v.msgArr) ||''
                    break;
            }
        })

        this.brandIds=brandIds.join(',') || ''
        this.priceRange=priceRange.join(',')
        this.skuIds = skuIds.join(',')
        console.log("priceRange的所有参数",this.priceRange)

        this.initData(this.tableData)
        
        console.log('this.tableData',this.tableData)
    },

    // 初始化查询数据
    initData(params){
        getRequest(url.goodsgoodsSelectGoodsList,params).then(data=> {
        
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }


            console.log("查询所有商品",data.data.data)
            let list = data.data.data.records
            this.itemList =this.itemList.concat(list) 
            this.pages=data.data.data.pages
            this.isloading=false
        }); 
    }
    


    // 
},
created(){
    const paramsObj = this.$route.query
    console.log("传递过来的参数",paramsObj)
    this.type=paramsObj.num
    this.classifyId=paramsObj.id
    // 初始化数据
    this.initData(this.tableData)

    // 查询选择条件
    getRequest(url.goodsClassifySelectCriteriaMapByClassifyId+`${paramsObj.num}/${paramsObj.id}`, {
        
    }).then(data=> {
        
        if(data.data.status!=1){
            this.$Message.error(data.data.message);
            return
        }


        console.log("分类导航点进去的页面内容",data.data)
        // this.brandList=this.list[0].list2
        // console.log('this.list[0].list2',this.list[0].list2)
        let brandList=data.data.data.brandList
        let priceRangeList=data.data.data.priceRangeList
        let classifyList=[]
        let spuSkuList = data.data.data.spuSkuList
        
        classifyList.push(data.data.data.classify)
        let qita=data.data.data.qita
        if(brandList.length!=0){
            brandList.forEach((v,i)=>{
                brandList[i]['bl']=false
            })
        }
        if(priceRangeList.length!=0){
            priceRangeList.forEach((v,i)=>{
                priceRangeList[i]['bl']=false
            })
        }
        
        
        
        if(qita.length!=0){
            qita.forEach((v,i)=>{
                qita[i]['bl']=false
            })
        }
        

        if(spuSkuList.length!=0){
            spuSkuList.forEach((v1,i1)=>{
                spuSkuList[i1].list.forEach((v2,i2)=>{
                    spuSkuList[i1].list[i2]['bl']=false
                })
            })
        }   
        
        this.brandList=brandList
        this.priceRangeList=priceRangeList
        this.classifyList=classifyList
        this.qita=qita
        this.spuSkuList=spuSkuList
        
        
    }); 
},

mounted() {
    window.addEventListener("scroll", this.handleScroll,true);
    
},

}
</script>
<style lang="less" scoped>
.searchInput{
    width: 300px;
    position: absolute;
    right: 800px;
    top: 15px;
}
.shop-center{
    border-top: 1px solid #F4F4F4;
    .classification{ //ul
        padding-top: 20px;
        
    }
    .classify-more{
        width: 100%;
        border-top: 1px solid #cccccc;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        

        h1{ 
            font-size: 12px;
            width: 110px;
            height: 30px;
            border: 1px solid #cccccc;
            border-top: none;
            margin-top:-1px; 
            text-align: center;
            line-height: 30px;
            background: white;
            color: red;
            .jiantou{
                font-size:18px;
                margin-left:5px;
                // transform:rotate(180deg);
            }
        }
    }
    .shop-list{
        padding-top: 20px;
        background: #FAFAFA;
        .sort{
            display: flex;
            li{
                border: 1px solid #cccccc;
                padding: 0 10px;
                text-align: center;
                margin-right:8px;
                sort-icon{
                    margin-left: 20px;
                }
            }
            .sort-active{
                background: #CC3333;
                color: white;
            }
        }
    }
    
}
</style>

