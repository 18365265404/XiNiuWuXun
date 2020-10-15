// 异步操作 比如ajax请求 d点击事件响应
// import Vue from 'vue';
// import axios from 'axios';
export default {

    methondName:({commit,state})=>{
    setTimeout(() => {
        commit('carNum')
    }, 5000);  
    
  },

};
