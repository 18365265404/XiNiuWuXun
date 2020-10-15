
<template>
  <li class="classify-box">
        <span class="classify-title"><slot></slot></span>
        <div v-if="name=='品牌'" class="classify-content">
            <span :class="{'active': item.bl}"  @click="chooseOther(name,item.brandId,index)" v-show="index+1<=showNum " v-for="(item,index) in list" :key="index">
                {{item.brandName}}
                <div class="check-bg">
                   <div class="corner">
                        <Icon class="right" type="md-checkmark" />
                   </div>
                </div>
            </span>
            
            
        </div>
        <div v-else-if="name=='类别'" class="classify-content">
            <span :class="{'active': true}"  v-show="index+1<=showNum " v-for="(item,index) in list" :key="index">
                {{item.classifyName}}
                <div class="check-bg">
                   <div class="corner">
                        <Icon class="right" type="md-checkmark" />
                   </div>
                </div>
            </span>
            
            
        </div>
        <div v-else-if="name=='其它'" class="classify-content">
            <span :class="{'active': item.bl}"  @click="choosePrice(name,item.classifyId,index,item.bl)" v-show="index+1<=showNum " v-for="(item,index) in list" :key="index">
                {{item.classifyName}}
                <div class="check-bg">
                   <div class="corner">
                        <Icon class="right" type="md-checkmark" />
                   </div>
                </div>
            </span>
            
            
        </div>
        <div v-else-if="name=='价格'" class="classify-content">
            <span :class="{'active': item.bl}"  @click="choosePrice(name,item.dictionaryValue,index,item.bl)" v-show="index+1<=showNum " v-for="(item,index) in list" :key="index">
                {{item.dictionaryName}}
                <div class="check-bg">
                    <div class="corner">
                        <Icon class="right" type="md-checkmark" />
                    </div>
                </div>
            </span>
            
            
        </div>
        <div v-else class="classify-content">
            <span :class="{'active': item.bl}"  @click="chooseOther(name,item.skuId,index)" v-show="index+1<=showNum " v-for="(item,index) in list" :key="index">
                {{item.skuValue}}
                <div class="check-bg">
                   <div class="corner">
                        <Icon class="right" type="md-checkmark" />
                   </div>
                </div>
            </span>
            
            
        </div>
        <div class="classify-more"  v-show="list.length>menuMoreNub">
            <h1 @click="showMore"><span>{{ifshowMore ? '收起' : '更多选项'}}</span><Icon class="jiantou"  :type="ifshowMore ? 'ios-arrow-up' : 'ios-arrow-down'" /></h1>
        </div>
    </li>
</template>

<script>

export default {

  props:{
      name:{
          type:String,
          default:''
      },
      list:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data () {
    return {
       classfyList:[
        '沙琪玛1','凯迪拉克','奥斯','卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰','沙琪玛\\',
        '凯迪拉克','奥斯','卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰','沙琪玛','凯迪拉克',
        '奥斯','卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰','沙琪玛','凯迪拉克','奥斯',
        '卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰','沙琪玛','凯迪拉克','奥斯','卡拉翰',
        '爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰8',
        '沙琪玛','凯迪拉克','奥斯','卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰','沙琪玛','凯迪拉克','奥斯','卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰','沙琪玛','凯迪拉克','奥斯','卡拉翰','爱茉莉','沙琪玛sdf','凯迪拉克','奥斯','卡拉翰over',
      ],
      ifshowMore:false,
      showNum:"35",
      menuMoreNub:'35',
      currentIndex:'-1'
    }
  },
methods:{
    chooseOther(name,id,index){
        // bl=!bl
        
        this.list[index].bl=!this.list[index].bl
        console.log(this.list[index])
        
        let msgArr=[]
        switch (name) {
            case '品牌':
                this.list.forEach((v,i)=>{
                    if(v.bl){
                        msgArr.push(v.brandId);
                    }
                })
                break;
            case '类别':

                this.list.forEach((v,i)=>{
                    if(v.bl){
                        msgArr.push(v);
                    }
                })
                
                break;

            case '价格':
                this.list.forEach((v,i)=>{
                    if(v.bl){
                        msgArr.push(v.dictionaryValue);
                    }
                })
                
                break;             
        
            default:
                
                this.list.forEach((v,i)=>{
                    if(v.bl){
                        msgArr.push(v.skuId);
                    }
                })
                break;
        }
        

           
        this.$emit('searchAll', {name,msgArr});

    },  



    choosePrice(name,priceId,index,bl){
        console.log("价格的点击",index)
        this.list.forEach((v,i)=>{
            this.list[i].bl=false
        })
        let msgArr=[]
        this.list[index].bl=!bl
        if(name=='其它'){
            if(!bl){
                msgArr.push({classifyId:priceId,type:'2'})
            }else{
                msgArr=[]
            }
            
        }else{
            if(!bl){
                 msgArr=[priceId]
            }else{
                msgArr=[]
            }
           
        }
        
        
           
        this.$emit('searchAll', {name,msgArr});
    },
    showMore(){
        this.ifshowMore=!this.ifshowMore
        if(this.ifshowMore){
        this.showNum=this.list.length;
        }else{
            this.showNum='35'
        }
        
    },
},
  created(){
      console.log(this.list.length)
      this.menuMoreNub=this.showNum
  }
}
</script>
<style lang="less" scoped>
    .classify-box{ //li
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            line-height: 22px;
            .classify-content{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                margin-left: 20px;
                
                span{
                    border: 1px solid white;
                    box-sizing: border-box;
                    margin-right: 30px;
                    padding: 0 5px;
                    
                    &:hover{
                        cursor: pointer;
                    }
                    .right{
                        display: none;
                    }
                }
                .active{
                    border: 1px solid red;
                    position: relative;
                    height: 24px;
                    .check-bg{
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
                            top: 10px;
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
            .classify-more{
                width: 100%;
                border-top: 1px solid #cccccc;
                margin-top: 5px;
                display: flex;

                flex-direction:row-reverse;

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
        }
</style>

