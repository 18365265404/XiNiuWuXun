<template>
    <div class="billAddress">
        <Modal  v-model="modal" 
        :maskClosable="false"
        :loading="modalLoading"
        footer-hide
        ref="modal"
        class="modal"
        :styles="{top: '200px'}"
        >

        <div class="add-box">
            
            
            <div class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text">发票类型：</span></h2>
                </div>
                <ul class="form-item-right">
                    <li v-show="formBtn1" :class="{'active': currentIndex1 == 0}"  @click="chooseBillType(0)">
                        增值税普通发票
                        <div class="check-bg">
                            <div class="corner">
                                <Icon class="right" type="md-checkmark" />
                            </div>
                        </div>
                    </li>
                    <li v-show="formBtn2" :class="{'active': currentIndex1 == 1}"  @click="chooseBillType(1)">
                        增值税专用发票
                        <div class="check-bg">
                            <div class="corner">
                                <Icon class="right" type="md-checkmark" />
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </div>

            <div class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text">发票抬头：</span></h2>
                </div>
                <ul class="form-item-right">
                    <li v-show="formBtn3" :class="{'active': currentIndex2 == 0}"  @click="chooseTaitouType(0)">
                        个人
                        <div class="check-bg">
                            <div class="corner">
                                <Icon class="right" type="md-checkmark" />
                            </div>
                        </div>
                    </li>
                    <li v-show="formBtn4" :class="{'active': currentIndex2 == 1}"  @click="chooseTaitouType(1)">
                        单位
                        <div class="check-bg">
                            <div class="corner">
                                <Icon class="right" type="md-checkmark" />
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </div>

            
            <div class="form-item" v-show="form.taitouType==0">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text">个人名称：</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.personName" :maxlength="10" show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>
            <div v-show="form.taitouType==1" class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text">单位名称</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.unitName" :maxlength="10" show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>

            <div v-show="form.taitouType==1" class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text">纳税人识别号：</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.taxNumber" :maxlength="10" show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>
            <div class="form-item">
                <div class="form-item-head">
                    <h2><span></span><span class="text"></span></h2>
                </div>
                <div class="form-item-right">
                    <span style="color:#cc3333">请与贵公司财务人员核实后，仔细填写准确的三证合一后的社会统一信用代码或税务登记证号，否则将影响后续发票的正常使用</span>
                </div>
            </div>

            <div v-show="form.billType==1" class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text">开户行名称：</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.bankName"  show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>

            <div v-show="form.billType==1" class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text"> 开户行账号：</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.bankAccount" :maxlength="10" show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>

            <div v-show="form.billType==1" class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text"> 注册场所地址：</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.regPosition" :maxlength="10" show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>

            <div v-show="form.billType==1" class="form-item">
                <div class="form-item-head">
                    <h2><span>*</span><span class="text"> 注册固定电话：</span></h2>
                </div>
                <div class="form-item-right">
                    <Input v-model="form.regTel" :maxlength="10" show-word-limit placeholder="" style="width: 200px" />
                </div>
            </div>

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


            
        </Modal>
        <div>
             <Button type="primary" @click="goAdd">添加发票抬头信息</Button>
        </div>
        <table border="1" >
			<tr class="table-head">
                <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>名称</th>

                <th>纳税人识别号</th>
                <th>开户行</th>
                <th>账号</th>
                <th>注册地址</th>
                <th>注册电话</th>
                <th>性质（发票性质）</th>
                <th>类型（发票类型）</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            <tr class="table-item" v-for="(item,index) in tableList" :key="item.id">
                <td>{{index+1}}</td>

                <td>{{item.designation}}</td>
                <td>{{item.taxpayerIdentificationNo}}</td>
                
                <td>{{item.openingBank}}</td>
                <td>{{item.accountNumber}}</td>
                <td>{{item.registeredAddress}}</td>
                
                <td>{{item.registeredTel}}</td>
                <td>{{item.nature==0 ? '增值税普通发票':'增值税专用发票'}}</td>
                <td>{{item.type==0 ? '个人' :'单位'}}</td>
                <td>
                <Button @click="goChange(tableList,index,item.invoiceTitleId,item.nature,item.type)" type="info" ghost>修改</Button>
                <Button @click="delet(tableList,index,item.invoiceTitleId)" type="warning" ghost>删除</Button>
                </td>
                <td>
                <Button @click="setDefault(tableList,index,item.id)" v-show="!item.isDft" type="info" ghost>设为默认</Button>
                <Button @click="setDefault(tableList,index,item.id)" v-show="item.isDft" type="info" >已默认</Button>
                </td>

            </tr>

		</table>
    <alert-little @cancel='cancel' :alertBl="alertBl">{{alertHint}}</alert-little>

    </div>
</template>
<style lang="less" scoped>
.add-box{
    margin: 20px 0 0 20px;
    padding: 20px 10px;


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
        display: flex;
        li{ 
            margin-right: 15px;
            line-height: 30px;
            color: #999999;
            width: 115px;
            text-align: center;
            border: 1px solid #cccccc;
            position: relative;
            height: 30px;
                .check-bg{
                    display: none;
                }
            &.active{
                border: 1px solid red;
                
                .check-bg{
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 30px;
                    width: 30px;
                    overflow: hidden;

                    .corner{
                        width: 0;
                        height: 0;
                        position: absolute;
                        top: 16px;
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

</style>

<script>
import session_storage from '@/utils/session_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest,deleteRequest} from '@/utils/ajax';
import alertLittle from '@/components-item/alert-little.vue'
export default {

    
    components:{
        alertLittle
    },

    name: 'HelloWorld',
    data () {
        return {
            currentIndex1:0,
            currentIndex2:1,
            
            formBtn1:true,
            formBtn2:true,
            formBtn3:true,
            formBtn4:true,
            alertBl:false,
            alertHint:'',
            modalLoading: true,
            modal: false,
            formStatus:'add',
            form: {
                billType:0,
                taitouType:1,
                personName:"",
                unitName:'',
                taxNumber:'',
                bankName:'',
                bankAccount:'',
                regPosition:'',
                regTel:'',
                isDft:true,
            },
            cityList1:[{provinceId:'0',provinceName:'请选择'},{provinceId:'1',provinceName:'上海'},{provinceId:'2',provinceName:'北京'}],
            cityList2:[],
            cityList3:[],
            tableList:[
                {id:'1',name:'亮哥1',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:true},
                {id:'2',name:'亮哥2',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:false},
                {id:'3',name:'亮哥3',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:false},
                {id:'4',name:'亮哥4',address:'上海市宝山区',detail:'希望小学对面',tel:'18365265404',switch:false},
            ],
        }
    },
methods:{
    chooseTaitouType(type){
        this.form.taitouType=type
        this.currentIndex2=type
        
    },
    chooseBillType(type){
        this.form.billType=type
        this.currentIndex1=type
        if(type==1){
            this.currentIndex2=1
            this.form.taitouType=1
        }
    },
    setDefault(tableList,index,id){
      tableList[index].isDft=true
    },
    delet(tableList,index,id){
        deleteRequest(url.userInvoiceTitleDeleteInvoiceTitleById+id, {

        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            
            this.initBill()
            console.log("删除收货地址",data)
            
            
        }); 
    },
    goChange(tableList,index,id,billType,taitouType){
      this.modal=true  
      this.formStatus='change'

      this.changeId = id
        
        if(billType==0){
            if(taitouType==0){
                this.form.billType=0
                this.form.taitouType=0
                this.currentIndex1=0
                this.currentIndex2=0
                this.form.personName=tableList[index].designation
                this.form.unitName=''
                this.form.taxNumber=''
                this.form.bankName=''
                this.form.bankAccount=''
                this.form.regPosition=''
                this.form.regTel=''

                this.formBtn1=true
                this.formBtn2=false
                this.formBtn3=true
                this.formBtn4=false
                
            }
            if(taitouType==1){
                this.form.billType=0
                this.form.taitouType=1
                this.currentIndex1=0
                this.currentIndex2=1
                this.form.personName=''
                this.form.unitName=tableList[index].designation
                this.form.taxNumber=tableList[index].taxpayerIdentificationNo
                this.form.bankName=''
                this.form.bankAccount=''
                this.form.regPosition=''
                this.form.regTel=''

                this.formBtn1=true
                this.formBtn2=false
                this.formBtn3=false
                this.formBtn4=true
            }
        }
        if(billType==1){
            this.form.billType=1
            this.form.taitouType=1
            this.currentIndex1=1
            this.currentIndex2=1
            this.form.personName=''
            this.form.unitName=tableList[index].designation
            this.form.taxNumber=tableList[index].taxpayerIdentificationNo
            this.form.bankName=tableList[index].openingBank
            this.form.bankAccount=tableList[index].accountNumber
            this.form.regPosition=tableList[index].registeredAddress
            this.form.regTel=tableList[index].registeredTel

            this.formBtn1=false
            this.formBtn2=true
            this.formBtn3=false
            this.formBtn4=true
        }


    },

    goAdd(){
      this.modal=true  
      this.formBtn1=true
      this.formBtn2=true
      this.formBtn3=true
      this.formBtn4=true
      this.formStatus='add'

        this.form.personName=""
        this.form.unitName=''
        this.form.taxNumber=''
        this.form.bankName=''
        this.form.bankAccount=''
        this.form.regPosition=''
        this.form.regTel=''

    },
    cancel(obj){
      this.alertBl=obj
    },    
    submit(){
       
        if(this.form.billType==0 && this.form.taitouType==0){
            if(!this.form.personName){
                
                this.alertBl=true
                this.alertHint='请输入个人名称'
                this.timeoutCancel()
                return
            }
        }

        if(this.form.billType==0 && this.form.taitouType==1){
            if(!this.form.unitName){
                
                this.alertBl=true
                this.alertHint='请输入单位名称'
                this.timeoutCancel()
                return
            }
            if(!this.form.taxNumber){
                
                this.alertBl=true
                this.alertHint='请输入纳税人识别号'
                this.timeoutCancel()
                return
            }
        }

        if(this.form.billType==1){
            if(!this.form.unitName){
                
                this.alertBl=true
                this.alertHint='请输入单位名称'
                this.timeoutCancel()
                return
            }
            if(!this.form.taxNumber){
                
                this.alertBl=true
                this.alertHint='请输入纳税人识别号'
                this.timeoutCancel()
                return
            }
            if(!this.form.bankName){
                
                this.alertBl=true
                this.alertHint='请输入开户行名称'
                this.timeoutCancel()
                return
            }
            if(!this.form.bankAccount){
                
                this.alertBl=true
                this.alertHint='请输入开户行账号'
                this.timeoutCancel()
                return
            }
            if(!this.form.regPosition){
                
                this.alertBl=true
                this.alertHint='请输入注册场所地址'
                this.timeoutCancel()
                return
            }
            if(!this.form.regTel){
                
                this.alertBl=true
                this.alertHint='请输入注册固定电话'
                this.timeoutCancel()
                return
            }
        }
        
        
        if(this.formStatus=='add'){
            
            console.log("from的数据",this.form)
            this.form
            
            this.addBill()
        }
        if(this.formStatus=='change'){
            this.changeBill()
        }


    
    },

    addBill(){
        let designation = ''
        if(this.form.billType==0){
            if(this.form.taitouType==0){
                designation=this.form.personName
                this.form.taxNumber=''
                this.form.bankName=''
                this.form.bankAccount=''
                this.form.regPosition=''
                this.form.regTel=''
            }
            if(this.form.taitouType==1){
                designation=this.form.unitName
                
                this.form.bankName=''
                this.form.bankAccount=''
                this.form.regPosition=''
                this.form.regTel=''
            }
        }
        if(this.form.billType==1){
            designation=this.form.unitName
            
        }
        postRequest(url.userInvoiceTitleInsertInvoiceTitle, {
            designation:designation,
            taxpayerIdentificationNo:this.form.taxNumber,
            openingBank:this.form.bankName,
            accountNumber:this.form.bankAccount,
            registeredAddress:this.form.regPosition,
            registeredTel:this.form.regTel,
            nature:this.form.billType,
            type:this.form.taitouType,
            userId:session_storage.storageGet("userData").userId,
            isDft:this.form.isDft ? 1 : 0,
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            this.modal=false
            this.initBill()
            console.log("添加发票",data)
            
            
        }); 
    },

    changeBill(){
        let designation = ''
        if(this.form.billType==0){
            if(this.form.taitouType==0){
                designation=this.form.personName
                this.form.taxNumber=''
                this.form.bankName=''
                this.form.bankAccount=''
                this.form.regPosition=''
                this.form.regTel=''
            }
            if(this.form.taitouType==1){
                designation=this.form.unitName
                
                this.form.bankName=''
                this.form.bankAccount=''
                this.form.regPosition=''
                this.form.regTel=''
            }
        }
        if(this.form.billType==1){
            designation=this.form.unitName
            
        }
        putRequest(url.userInvoiceTitleUpdateInvoiceTitleById, {
            designation:designation,
            taxpayerIdentificationNo:this.form.taxNumber,
            openingBank:this.form.bankName,
            accountNumber:this.form.bankAccount,
            registeredAddress:this.form.regPosition,
            registeredTel:this.form.regTel,
            nature:this.form.billType,
            type:this.form.taitouType,
            invoiceTitleId:this.changeId,
            isDft:this.form.isDft ? 1 : 0,
        }).then(data=> {
            
            if(data.data.status!=1){
                this.$Message.error(data.data.message);
                return
            }
            this.modal=false
            this.initBill()
            console.log("添加发票",data)
            
            
        }); 
    },

  



    // 初始化地址
    initBill(){
      let userDate = session_storage.storageGet('userData')
      getRequest(url.userInvoiceTitleSelectInvoiceTitleList+`${userDate.userId}`, {
          

      }).then(data=> {
          
          if(data.data.status!=1){
              this.$Message.error(data.data.message);
              return
          }
          
          this.tableList= data.data.data
          console.log("查询所有发票信息",data)
          
          
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
    this.initBill()
    


    
}

}
</script>

