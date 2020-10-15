<template>
  <div class="menu">
      <div class="menu-head">
          <div class="upimg">
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="https://jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
          </div>
          
          <p>18365265404</p>
      </div>

      <div class="menu-content">

          <h1 @click="isShow('m')">
              
              <span>用户信息</span>
              <Icon class="jiantou"  :type="ifshow.m ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </h1>
          <ul v-show="ifshow.m">
              <li>
                  <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'changepw'}" ><span>修改密码</span></router-link>
              </li>
              <li>
                  
                  <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'changeUser'}" ><span>修改信息</span></router-link>  
              </li>
          </ul> 

          <h1 @click="isShow('a')">
              
              <span>我的交易</span>
              <Icon class="jiantou"  :type="ifshow.a ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </h1>
          <ul v-show="ifshow.a">
              <li>
                  <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'order'}" ><span>我的订单</span></router-link>
              </li>
              <li>
                  
                  <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'address'}" ><span>收货地址</span></router-link>  
              </li>
          </ul>

          <h1 @click="isShow('b')">
              <span>发票管理</span>
              <Icon class="jiantou"  :type="ifshow.b ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </h1>   

          <ul v-show="ifshow.b">
              <li>发票状态管理</li>
              <li>
                    <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'myBill'}" ><span>我的发票抬头管理</span></router-link>
              </li>  
              <li>
                  <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'billAddress'}" ><span>发票寄送地址管理</span></router-link>
              </li>
          </ul>

          <h1 @click="isShow('c')">
              <span>我的关注</span>
              <Icon class="jiantou"  :type="ifshow.c ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </h1>     
          <ul v-show="ifshow.c">
              <li>
                   <router-link active-class="active-title"  class="nav-title" tag="span" :to="{path:'collection'}" ><span>我的收藏</span></router-link>  
              </li>
              <li>浏览历史</li>
          </ul>

          <h1 @click="isShow('d')">
              <span>账户设置</span>
              <Icon class="jiantou"  :type="ifshow.d ? 'ios-arrow-up' : 'ios-arrow-down'" />
          </h1>  
          <ul v-show="ifshow.d">
              <li>公司信息</li>
              <li>安全中心</li>
              <li>站内信</li>
          </ul>
      </div>
  </div>
</template>

<script>
import local_storage from '@/utils/local_storage'
import url from '@/utils/url';
import {getRequest,postRequest,putRequest} from '@/utils/ajax';
export default {

  data () {
    return {
        defaultList: [
            {
                'name': 'a42bdcc1178e62b4694c830f028db5c0',
                'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
            },
            {
                'name': 'bc7521e033abdd1e92222d733590f104',
                'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
            }
        ],
      ifshow:{
          m:true,
          a:true,
          b:true,
          c:true,
          d:true,
      }
    }
  },
  methods:{
      isShow(tag){
          
          switch (tag) {
              case "m":
                  this.ifshow.m=!this.ifshow.m
              break;
              case "a":
                  this.ifshow.a=!this.ifshow.a
                  break;
              case "b":
                 
                  this.ifshow.b=!this.ifshow.b
                  break;
              case 'c':
                  this.ifshow.c=!this.ifshow.c
                  break;
              case 'd':
                  this.ifshow.d=!this.ifshow.d
                  break;            
          
              default:
                  break;
          }
      },


        handleSuccess (res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        }
    
        

  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
    // putRequest(url.userLoginGoLogin, {
    //     username:this.formCustom.username,
    //     password:this.formCustom.passwd,

    // }).then(data=> {
        
        
    //     console.log("请求返回数据",data)
    //     if(data.data.status!=1){
    //         return
    //     }

        
    // }); 
  }
}
</script>
<style lang="less" scoped>
.menu{
    width: 235px;
    background: white;
    padding: 0 30px;
    .menu-head{
        display: flex;
        align-items: center;
        .upimg{
            margin-right: 10px;
            border-radius: 50%;
            width: 80px;
            height: 80px;
        }
    }
    .menu-content{
        display: flex;
        flex-direction: column;
        h1{
            cursor: pointer;
            font-size: 20px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                color: black;
                font-weight: 700;
            }
            .icon{
                color: #999;
                // transform:rotate(180deg);
            }
        }
        ul{
            padding-bottom: 30px;
            border-bottom: 1px solid #cccccc;
            li{
                cursor: pointer;
                font-size: 16px;
                line-height: 30px;
                &:hover{
                    color: #cc3333;
                }
                .nav-title{
                    
                    color:#666666;
                    &.active-title{
                        color: #cc3333;
                    
                    }  

                }
            }
        }
    }
}
</style>

