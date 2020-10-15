<template>
<div>
    <Menu 
    ref="leftmenu" :open-names="opennames" accordion
    @on-select='openChange'
    @on-open-change='openChange'
    theme="dark" width="auto" :class="menuitemClasses"
    v-for="(menuItem, menuIndex) in menuList" :key="menuIndex" 
    >
      <!-- 展开没有子菜单 -->
      <MenuItem v-if="!menuItem.children || menuItem.children.length==0" :key="menuIndex" :name="menuItem.to" :to="menuItem.to">
        <Icon :type="menuItem.icon" />
        <span>{{ menuItem.name }}</span>
      </MenuItem>
 
      <!-- 展开有子菜单 -->
      <Submenu v-else :name="menuIndex">
          <template slot="title">
              <Icon :type="menuItem.icon" />
              <span>{{menuItem.name}}</span>
          </template>
          <MenuItem  v-for="(item, index) in menuItem.children" :key="index" :name="item.to" :to="item.to">{{item.name}}</MenuItem>
      </Submenu>

  </Menu>
</div>
</template>

<script>
import common from '@/common/emit.js'
export default {



data () {
  return {
    opennames:['1'],
    isCollapsed:false,
    menuList: [
        {
          name: "首页",
          to: "home",
          icon: "ios-archive-outline"
        },
        {
          name: "关于",
          to: "home",
          icon: "ios-create-outline"
        },
        {
          name: "菜单分类1",
          icon: "md-person",
          children: [
            {
              name: "用户",
              to: "home"
            },
            {
              name: "用户2",
              to: "page2"
            }
          ]
        },
        {
          name: "菜单分类2",
          icon: "ios-copy",
          children: [
            {
              name: "测试",
              to: "test"
            }
          ]
        }
      ]


  }
},

methods:{
  openChange(){
    this.$emit("changeCollapsed",this.isCollapsed=false)
  },
},
watch:{
  isCollapsed(val){
    if(val){
      
      this.opennames=[];
      // this.$nextTick(()=>{
      //   this.$refs.leftmenu.updateOpened()
      // })
    }
  },


},

mounted: function () {
  var vm = this
  // 用$on事件来接收参数
  common.$on('val', (data) => {
      console.log('data',data)
      this.isCollapsed=data
  })
},

computed: {
  menuitemClasses: function () {
      return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
      ]
  },



},
created(){
  console.log(111)
}
}
</script>
<style scoped>
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
    
}
.collapsed-menu >>> .ivu-menu-submenu-title-icon{
  display: none;

}


</style>


