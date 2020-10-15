<template>
  <div class="num">
      <input type="text" v-model="iptV" @change="change">
      <div class="change-box">
          <span @click="add">+</span>
          <span @click="delet">-</span>
      </div>
  </div>
</template>

<script>
import url from '@/utils/url';
import local_storage from '@/utils/local_storage'
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {
  props:{
    num:{
      type:Number,
      default:1
    },
    index:{
      type:Number,
      default:0
    },
    shopId:{
      type:String,
      default:''
    },
  },

  data () {
    return {
      iptV:"",

    }
  },

  methods:{
    change(){
      console.log('parseInt(this.iptV)',parseInt(this.iptV))

      if(isNaN(parseInt(this.iptV))){

        this.iptV=this.num
      }
      
      this.checkStock('change',this.iptV)
      
    },
    add(){
      this.iptV=this.iptV+1
      this.checkStock('add',this.iptV)
      
         
    },

    delet(){
      if(this.iptV>1){
        this.iptV=this.iptV-1
      }
      this.checkStock('delet',this.iptV)
          
          

    },
    checkStock(types,num){

     
      getRequest(url.stockStockGetStockNum+this.shopId+'/'+`${parseInt(num)}`, {
            

      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              this.$emit('changeNum', {'val':parseInt(this.iptV),'index':this.index,isStock:true});
              return
          }
          
          
          console.log("验证是库存是否充足",data.data.data)
          
          this.$emit('changeNum', {'val':parseInt(this.iptV),'index':this.index,isStock:false});
          
      }); 
    },
  },
  mounted(){
    this.iptV=this.num

  }
}
</script>
<style lang="less" scoped>
.num{
    cursor: pointer;
    display: flex;
    input{
        width: 60px;
    }
    .change-box{
        display: flex;
        flex-direction: column;
        width: 30px;
        border: 1px solid #cccccc;
        border-left: none;
        span{
            width: 30px;
            
            text-align: center;
            &:nth-child(1){
                border-bottom: 1px solid #cccccc
            }
        }
    }
}
</style>

