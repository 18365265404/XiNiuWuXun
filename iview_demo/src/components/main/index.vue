<template>
    <div class="project-box">
        <header-bar></header-bar>
        <nav-title></nav-title>
        <div :style="{minHeight:contentH+'px'}" class="project-article" ref="bottom">
          
            <router-view></router-view>
          
        </div>
        <foot-link></foot-link> 
        
        
        <backTop></backTop>
        <rightToolbar></rightToolbar>
    </div>
</template>
<script>
import HeaderBar from './components/header-bar.vue'
import navTitle from './components/nav-title.vue'
import backTop from '@/components-item/back-top.vue'
import rightToolbar from '@/components-item/right-toolbar.vue'
import footLink from './components/foot-link.vue'

export default {
  components: {
    HeaderBar,
    navTitle,
    backTop,
    rightToolbar,
    footLink
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
