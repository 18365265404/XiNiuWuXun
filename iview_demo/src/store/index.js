import Vue from 'vue'
import Vuex from 'vuex'; //引入


import {moduleA,moduleB} from './modules'


//安装
Vue.use(Vuex);// Store 类 install方法，mapActions/mapGetters函数

export default new Vuex.Store({
  modules : {
      a:moduleA,
      b:moduleB,
  }
});
