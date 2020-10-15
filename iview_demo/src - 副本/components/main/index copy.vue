<template>
  <Layout style="height: 100%" class="main">
    <Sider>
      <i-button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
      </i-button>
    </Sider>
    <Layout style="height: 100%">
      <Header  style="background:blue">
        <header-bar >
          
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav/>
          </div>
          <Content class="content-wrapper" style="height:100%;background:red;flex:1">
            234
            <keep-alive>
              <router-view/>
            </keep-alive>
           
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import SideMenu from './components/side-menu/side-menu.vue'
import HeaderBar from './components/header-bar/header-bar.vue'
import TagsNav from './components/tags-nav/tags-nav.vue'
export default {
  components: {
    SideMenu,
    HeaderBar,

    TagsNav,

  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

