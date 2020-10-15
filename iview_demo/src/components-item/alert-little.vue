<template>
  <div v-show="alertBl" class="alert">
      <h1 @click="cancel" class="cursor"><span>x</span></h1>
      <h2><slot></slot></h2>
  </div>
</template>

<style lang="less" scoped>
.alert{
    z-index: 1000000000;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 350px;
    height: 70px;
    border: 5px solid #cccccc;
    border-radius: 5px;
    background: white;
    h1{
        display: flex;
        // cursor: pointer;
        flex-direction: row-reverse;
        line-height: 25px;
        
        transform:scale(1,0.8);
        padding:0 5px 0 0;
    }
    h2{
        text-align: center;
    }
}
</style>
<script>

export default {
  props:{
      alertBl:{
          type:Boolean,
          default:false
      }
  },
  data () {
    return {
      alertVal:true
    }
  },
  methods:{
      cancel(){
          
          this.$emit('cancel',false);  
      }
  },
//   watch:{
//       alertBl(val1){
//           this.alertVal=val1
          
//       }
//   },
//   created(){
//       this.alertVal=this.alertBl,
//       setTimeout(() => {
//           this.cancel()
//       }, 3000);
//   },
//   updated(){
//       alert()
//   }
}
</script>

