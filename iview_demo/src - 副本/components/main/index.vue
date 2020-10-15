<template>
    <div class="project-box">
        <header-bar></header-bar>
        <nav-title></nav-title>
        <div :style="{minHeight:contentH+'px'}" class="project-article" ref="bottom">
          
            <router-view></router-view>
          
        </div>
         
        <div class="foot" >
            <span>Copyright © 2016-2019 上海手取信息科技有限公司版权所有 沪ICP备16041404号</span>
        </div>
        
        <backTop></backTop>
        <rightToolbar></rightToolbar>
    </div>
</template>
<script>
import HeaderBar from './components/header-bar.vue'
import navTitle from './components/nav-title.vue'
import backTop from '@/components-item/back-top.vue'
import rightToolbar from '@/components-item/right-toolbar.vue'

export default {
  components: {
    HeaderBar,
    navTitle,
    backTop,
    rightToolbar
  },
  data () {
      return {

        contentH:''
          
      };
  },
  computed:{

  },
  created(){

  },
  mounted() {
    let  windowHeight = document.documentElement.clientHeight;
    let  contentTop = this.$refs.bottom.getBoundingClientRect().top
    console.log(contentTop)
    let contentH = windowHeight - contentTop - 50

    this.contentH = contentH
  },
  
  methods:{


  }
}
</script>
<style lang="less" scoped>
.project-box{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .project-article{
    
    flex: 1;
  }
  .foot{
    display: flex;
    height: 50px;
    background: black;
    color: white;
    justify-content: center;
    line-height: 50px;
  }
}
</style>
