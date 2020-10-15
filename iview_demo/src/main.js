// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from '@/config'
import iView from 'iview'
import filters from './components/filters'// filters = {date,fillzero}
//引入样式
import './assets/css/base.css'
import './assets/css/icons.css'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import './directives/unThisClick.js'
import axios from 'axios'
Vue.prototype.$ajax=axios
Vue.use(VueLazyLoad,{
    observer:true,
    error:require('./assets/images/bg_error.jpg'),
    loading:require('./assets/images/loading.gif'),
    listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove','mousemove']	
})
Vue.use(iView)

// require('./mock')
// require('./mock2')
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]));//注册全局过滤器

Vue.config.productionTip = false
axios.defaults.withCredentials = false
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
