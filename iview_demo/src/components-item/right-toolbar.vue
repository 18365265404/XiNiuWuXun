<template>
  <div class="toolBar">
      <div class="item cursor" @click="()=>{ userData.userId ? this.$router.push('/order') : this.$router.push('/login');}">
          <Icon class="icon cursor" type="ios-person-outline" />
          <span>个人中心</span>
      </div>
      <div v-show="false"  class="item cursor" @click="()=>{ userData.userId ? this.$router.push('/collection') : this.$router.push('/login');}">
          <Icon class="icon" type="md-heart-outline" />
          <span>收藏夹</span>
      </div>
      <div  class="item cursor" >
          <Icon class="icon" type="md-headset" />
          <span>联系客服</span>
      </div>
      <div  class="item cursor" @click="()=>{ userData.userId ? this.$router.push('/shopCar') : this.$router.push('/login');}">
          <Icon class="icon" type="ios-cart-outline" />
          <div v-show="userData.userId" class="num">{{carNum}}</div>
          <div>购物车</div>
      </div>
  </div>
</template>
<style lang="less" scoped>
.toolBar{
    position: fixed;
    right: 20px;
    top: 40%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 48px;
    .item{
        width: 48px;
        display: flex;
        flex-direction: column;
        text-align: center;
        background: #e5e5e5;
        margin-bottom: 5px;
        padding: 10px 0;
        position: relative;
        &:hover{
            background: #ff6600;
            color: white;
        }

        .icon{
            line-height: 25px;
            font-size: 24px;
            font-weight: 700;
        }
        .num{
            position: absolute;
            right: -10px;
            top: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #cc3333;
            color: white;
            line-height: 20px;
        }
    }
}
</style>

<script>
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
export default {

    name: 'HelloWorld',
    data () {
        return {
            // carNum:''
        }
    },
    computed:{
        userData(){
        return this.$store.state.a.userData;
        },
        carNum(){
            return this.$store.state.a.carNum;
        },
    },    
    methods:{
        initData(){
            let userDate = session_storage.storageGet('userData')
            getRequest(url.goodsShoppingCartSelectShoppingCartCount+`${userDate.userId}`, {
                

            }).then(data=> {
                
                if(data.data.status!=1){
                    this.$Message.error(data.data.message);
                    return
                }

                
                console.log("购物车商品个数",data.data.data)
                this.carNum=data.data.data
                
            });
        }
    },
    created(){
        // this.initData()
    }
}
</script>

