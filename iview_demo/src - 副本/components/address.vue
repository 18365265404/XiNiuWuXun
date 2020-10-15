<template>
  <div class="address">
    <div class="head">收货地址：</div>
    <div class="add-box">
        <div class="hint form-item">
          <span class="add" v-show="formStatus=='add' ? true : false">新增收货地址：</span>
          <span class="change" v-show="formStatus=='change' ? true : false">修改收货地址:</span>
          <span class="text">电话号码、手机号选填一项其余均为必填项</span>
          <span @click="goAdd()" class="change cursor" v-show="formStatus=='change' ? true : false">去新增地址</span>
        </div>
        <div class="form-item">
          <div class="form-item-head">
            <h2><span>*</span><span class="text">收货人：</span></h2>
          </div>
          <div class="form-item-right">
            <Input v-model="form.name" size="small" placeholder="" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-head">
            <h2><span>*</span><span class="text">地区：</span></h2>
          </div>
          <div class="form-item-right">
            <Select @on-change='chooseCity1' v-model="form.city1" size="small" style="width:100px">
              <Option  v-for="item in cityList1" :value="parseInt(item.provinceCode)" :key="item.provinceId">{{ item.provinceName }}</Option>
            </Select>
            <Select @on-change='chooseCity2' v-model="form.city2" size="small" style="width:100px">
                <Option  v-for="item in cityList2" :value="parseInt(item.cityCode)" :key="item.cityId">{{ item.cityName }}</Option>
            </Select>
            <Select @on-change='chooseCity3' v-model="form.city3" size="small" style="width:100px">
                <Option  v-for="item in cityList3" :value="parseInt(item.areaCode)" :key="item.areaId">{{ item.areaName }}</Option>
            </Select>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-head">
            <h2><span>*</span><span class="text">街道地址：</span></h2>
          </div>
          <div class="form-item-right">
            <Input v-model="form.address" size="small" placeholder="" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-head">
            <h2><span>*</span><span class="text">手机号码：</span></h2>
          </div>
          <div class="form-item-right">
            <Input v-model="form.tel" size="small" placeholder="" />
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-head">
            <h2><span class="text">邮政编码</span></h2>
          </div>
          <div class="form-item-right">
            <Input v-model="form.postalCode" size="small" placeholder="" />
          </div>
        </div>
       
        <!-- <div class="form-item">
          <div class="form-item-head">
            <h2><span class="text">手机号码：</span></h2>
          </div>
          <div class="form-item-right">
            <Input v-model="form.phone" size="small" placeholder="" />
          </div>
        </div> -->
        <div class="form-item">
          <div class="form-item-head">
            <h2><span class="text">是否设置默认：</span></h2>
          </div>
            <i-switch class="form-item-right" v-model="form.isDft" size="large">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
        </div>
        <div class="form-item">
          <Button class="sub-btn" @click="submit"  type="primary">保存</Button>
        </div>
        

    </div>
    <table border="1" >
			<tr class="table-head">
        <th>&nbsp;</th>
				<th>收货人</th>
        <th><span>省</span></th>
        <th><span>市</span></th>
        <th><span>区</span></th>
        
        <th>邮政编码</th>
        <th>详细地址</th>
        <th>电话/手机</th>
        <th>&nbsp;</th>
        <th>设为默认地址</th>
			</tr>
			<tr class="table-item" v-for="(item,index) in tableList" :key="item.id">
        <td>{{index+1}}</td>
        <td>{{item.consignee}}</td>
        <td>{{item.provinceName}}</td>
        <td>{{item.cityName}}</td>
        <td>{{item.areaName}}</td>
        <td>{{item.postalCode}}</td>
        
        <td>{{item.detailsAddress}}</td>
        <td>{{item.tel}}</td>
        <td>
          <Button @click="goChange(tableList,index,item.receivingAddressId)" type="info" ghost>修改</Button>
          <Button @click="delet(tableList,index,item.receivingAddressId)" type="warning" ghost>删除</Button>
        </td>
        <td>
          <i-switch  @on-change="changeMoRen(item.isDft,item.receivingAddressId)" class="form-item-right" v-model="item.isDft==1? true:false" size="large">
                <span slot="open">是</span>
                <span slot="close">否</span>
            </i-switch>
        </td>

      </tr>

		</table>
    <alert-little @cancel='cancel' :alertBl="alertBl">{{alertHint}}</alert-little>
  </div>
</template>
<style lang="less" scoped>
.address{
  .head{
    font-size: 18px;
    font-weight: 700;
  }
  .add-box{
    margin: 20px 0 0 50px;
    padding: 20px 10px;
    background: #F9F9F9;
    width: 820px;
    border: 1px solid #cccccc;
    .form-item{
      display: flex;
      margin-top: 15px;
      &.hint{
        .add{
          color: red;
          margin-right: 5px;
        }
        .change{
          color: red;
          margin-right: 5px;
          &:last-child{
            margin-left: 15px;
          }
        }
      }

      .form-item-head{
        display: flex;
        justify-content: right;
        flex-direction: row-reverse;
        
        h2{
          width: 135px;
          display: flex;
          justify-content: right;
          flex-direction: row-reverse;
          color: red;
          .text{
            margin-right: 10px;
            color: #666666;
          }
        }
      }

      .form-item-right{
        margin-left:5px;
        
      }

      .sub-btn{
        margin-left: 140px;
      }
    }
    
    
  }
  table{
    width: 100%;
    margin-top: 60px;
    .table-head{

      th{
        flex: 1;
        text-align: center;
        line-height: 30px;
        background: #fafafa;
      }
    }
    .table-item{

      td{
        text-align: center;
        Button{
          margin: 5px 0;
        }
      }
      
    }
  }
}
</style>

<script>
import local_storage from '@/utils/local_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
import alertLittle from '@/components-item/alert-little.vue'
export default {

  components:{
    alertLittle
  },
  data () {
    return {
      formStatus:'add',
      alertBl:false,
      alertHint:'',
      form: {
        name:"",
        city1:'',
        city2:'',
        city3:'',
        address:'',
        postalCode:"",
        tel:'',
        // phone:'',
        isDft:true,
      },
      tableList:[
        {id:'1',name:'亮哥1',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:true},
        {id:'2',name:'亮哥2',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:false},
        {id:'3',name:'亮哥3',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:false},
        {id:'4',name:'亮哥4',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:false},
      ],
      cityList1:[{provinceId:'0',provinceName:'请选择'},{provinceId:'1',provinceName:'上海'},{provinceId:'2',provinceName:'北京'}],
      cityList2:[],
      cityList3:[],
    }
  },
  methods:{
    changeMoRen(val,receivingAddressId){
      
      putRequest(url.userReceivingAddressUpdateReceivingAddressById, {
        // consignee:'',
        // tel:'',
        // provinceName:'',
        // cityName:'',
        // areaName:'',
        // detailsAddress:'',
        // postalCode:'',
        isDft:val ? 0 : 1,
        receivingAddressId:receivingAddressId
      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          this.initAddress()
          console.log("更新收货地址",data)
          
          
      }); 
     
    },
    setDefault(val){
      // tableList[index].isDft=true
      putRequest(url.userReceivingAddressUpdateReceivingAddressById, {
        consignee:'',
        tel:'',
        provinceName:'',
        cityName:'',
        areaName:'',
        detailsAddress:'',
        postalCode:'',
        isDft:val,
        receivingAddressId:''
      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          this.initAddress()
          console.log("更新收货地址",data)
          
          
      }); 
    },
    delet(tableList,index,id){
        deleteRequest(url.userReceivingAddressDeleteReceivingAddressById+id, {

        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            this.initAddress()
            console.log("删除收货地址",data)
            
            
        }); 
    },
    goChange(tableList,index,id){
      
      this.formStatus='change'

      this.changeId = id
      this.form={
        name:tableList[index].consignee,
        city1:'',
        city2:'',
        city3:'',
        address:tableList[index].detailsAddress,
        postalCode:tableList[index].postalCode,
        tel:tableList[index].tel,
        // phone:tableList[index].tel,
        isDft:tableList[index].isDft ? true :false,
      }

    },

    goAdd(){
      this.formStatus='add'
      this.form= {
        name:"",
        city1:'',
        city2:'',
        city3:'',
        address:'',
        postalCode:'',
        tel:'',
        // phone:'',
        isDft:1,
      }
    },
    cancel(obj){
      this.alertBl=obj
    },
    submit(){
      
      if(!this.form.name){
        
        this.alertBl=true
        this.alertHint='请输入收货人姓名'
        this.timeoutCancel()
        return
      }
      if(!this.form.city1){
        
        this.alertBl=true
        this.alertHint='请选择省'
        this.timeoutCancel()
        return
      }
      if(!this.form.city2){
        
        this.alertBl=true
        this.alertHint='请选择市'
        this.timeoutCancel()
        return
      }
      if(!this.form.city3){
        
        this.alertBl=true
        this.alertHint='请选择区'
        this.timeoutCancel()
        return
      }
      if(!this.form.address){
        
        this.alertBl=true
        this.alertHint='请输入地址'
        this.timeoutCancel()
        return
      }
      
      if(!this.form.tel){
        
        this.alertBl=true
        this.alertHint='请输入手机号码'
        this.timeoutCancel()
        return
      }
      console.log("from",this.form)
      let city1 = this.form.city1
      let city2 = this.form.city2
      let city3 = this.form.city3
      this.cityList1.forEach((v,i)=>{
        if(v.provinceCode==city1 ){
          city1=v.provinceName
        }
        
      })
       this.cityList2.forEach((v,i)=>{
        if(v.cityCode==city2 ){
          city2=v.cityName
        }
        
      })
       this.cityList3.forEach((v,i)=>{
        if(v.areaCode==city3 ){
          city3=v.areaName
        }
        
      })
      if(this.formStatus=='add'){
        this.addAddress(city1,city2,city3)
      }
      if(this.formStatus=='change'){
        this.changeAddress(city1,city2,city3)
      }


      
    },


    addAddress(city1,city2,city3){
        postRequest(url.userReceivingAddressInsertReceivingAddress, {
            consignee:this.form.name,
            tel:this.form.tel,
            provinceName:city1,
            cityName:city2,
            areaName:city3,
            detailsAddress:this.form.address,
            postalCode:this.form.postalCode,
            isDft:this.form.isDft ? 1 : 0,
            userId:local_storage.storageGet("userData").userId
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            this.form= {
              name:"",
              city1:'',
              city2:'',
              city3:'',
              address:'',
              postalCode:'',
              tel:'',
              // phone:'',
              isDft:true,
            }
            this.initAddress()
            console.log("添加收货地址",data)
            
            
        }); 
      },

      changeAddress(city1,city2,city3){
          
          putRequest(url.userReceivingAddressUpdateReceivingAddressById, {
              consignee:this.form.name,
              tel:this.form.tel,
              provinceName:city1,
              cityName:city2,
              areaName:city3,
              detailsAddress:this.form.address,
              postalCode:this.form.postalCode,
              isDft:this.form.isDft ? 1 : 0,
              receivingAddressId:this.changeId
          }).then(data=> {
              
              if(data.data.status!=1){
                  this.$Message.error(data.data.message);
                  return
              }
              
              this.initAddress()
              console.log("更新收货地址",data)
              
              
          }); 
      },



    // 选择城市 省
    chooseCity1(){
      this.getCityList()
    },
    // 选择城市 市
    chooseCity2(){
      this.getAreaList()
    },
    // 选择城市 区
    chooseCity3(){
      
    },

    // 省市区三级联动 省
    getProvinceList(){
      getRequest(url.basicProvinceSelectProvinceList, {
        

      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          
          console.log("查询省",data.data.data)
          this.cityList1 = data.data.data
          
      }); 
    },
    // 省市区三级联动 市
    getCityList(){
      getRequest(url.basicCitySelectCityListByProvinceCode+`${this.form.city1}`, {
        

    }).then(data=> {
        
        if(data.data.status!=1){
            this.$Message.error(data.data.message);
            return
        }
        this.cityList2 = data.data.data

        console.log("查询市",data)
        
        
    }); 
    },
    // 省市区三级联动 区
    getAreaList(){
      getRequest(url.basicAreaSelectAreaListByCityCode+`${this.form.city2}`, {
        

    }).then(data=> {
        
        if(data.data.status!=1){
            this.$Message.error(data.data.message);
            return
        }
        

        console.log("查询区",data)
        this.cityList3 = data.data.data
        
    }); 
    },
    

    initAddress(){
      let userDate = local_storage.storageGet('userData')
      getRequest(url.userReceivingAddressSelectReceivingAddressList+`${userDate.userId}`, {
          

      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          this.tableList= data.data.data
          console.log("查询所有收货地址",data)
          
          
      }); 
    },


    
    // 几秒钟后关闭弹窗
    timeoutCancel(){
      setTimeout(() => {
        this.alertBl=false
      }, 2000);
    }
  },
  created(){
    this.initAddress()
    
    this.getProvinceList()
    
    
  }
}
</script>

