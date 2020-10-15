import axios from 'axios'
import {Message, Alert} from 'element-ui'
import url from '../utils/url';
import session_storage from '@/utils/session_storage'
import router from '../router'
// axios.defaults.withCredentials = true

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

axios.interceptors.response.use(response=> {
  console.log("1111111111===============11111111111111",response)
  if(response.status== 200){
    alert(response.data.data.status)
      if(response.data.data.status==-3){
        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken().then(res => {
            console.log('刷新返回的数据',res)
            sessionStorage.setItem('refreshCode','1')
            let token ='1'
            // const { token } = res.data
            // instance.setToken(token)
            response.config.headers['X-Token'] = token
            // config.baseURL = ''
            // // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(token))
            requests = []

            return axios(response.config)
          })
        }
        else {
          // console.log("走这了")
          // 正在刷新token，将返回一个未执行resolve的promise
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token) => {
              response.config.baseURL = ''
              response.config.headers['X-Token'] = token
              resolve(axios(response.config))
            })
          })
        }
        

      }
  }
  if (response.status && response.status == 200 && response.data.status == 'error') {
    
    // Message.error({message: data.data.msg});
    return;
  }
  return response;
}, err=> {
  console.log(err)
  // if (err.response.status == 504||err.response.status == 404) {
  //   // Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  // } 
  return Promise.resolve(err);
})

function refreshToken () {
  // instance是当前request.js中已创建的axios实例
  return axios.get('/static/data/refresh.json').then(res=>res.data)

}
// function refreshToken () {
//   axios.get('/refresh').then(res=>res.data)
// }
// function refreshToken () {
//   axios.get('/refresh').then(res=>res.data)
  // ({
  //   method: 'get',
  //   url: '/msg1', //?token=${getCookie("token")}
  //   }).then(data=> {
                          
  //     sessionStorage.setItem('refreshCode','1')                    
  //     console.log("刷新token接口",data)
  //     // getRequest2()
      
  //   }); 



  // axios({
  //   method: 'post',
  //   url: `http://192.168.1.98:8081/${url.oauthToken}`, //?token=${getCookie("token")}
  //   data: {
  //     grant_type:'refresh_token',
  //     refresh_token:session_storage.storageGet('refreshToken')
  //   },
  //   transformRequest: [function (data) {
  //     let ret = ''
  //     for (let it in data) {
  //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //     }
  //     return ret
  //   }],
  //   headers: {
  //     // 'Content-Type': 'application/json',
  //     'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
  //     'Authorization' : 'Basic eG53eF9uby4xOnhud3hfbm8uMQ=='
      
  //   }
  //   }).then(data=> {
                          
                          
  //     console.log("刷新token接口",data)
      
      
  //   }); 
  // postRequest2(url.oauthToken, {
  //   grant_type:'refresh_token',
  //   refresh_token:session_storage.storageGet('refreshToken')

  // }).then(data=> {
      
      
  //   console.log("刷新token接口",data)
      
      
  // }); 
//   return  axios
// }


var base = url.server;
var base2 = url.server2;

// get请求
export const getRequest = (url, params) => {
    return axios({
      method: 'get',
      url: `${base}${url}`,
    //   params: params,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'token': sessionStorage.getSessionStorage("ms_token")

      }
    });
}

// get请求
export const getRequest2 = (url, params) => {
  return axios({
    method: 'get',
    url: `${url}`,
  //   params: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'token': sessionStorage.getSessionStorage("ms_token")

    }
  });
}

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`, //?token=${getCookie("token")}
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

      
    }
  });
}
export const postRequest2 = (url, params) => {
  return axios({
    method: 'post',
    url: `${base2}${url}`, //?token=${getCookie("token")}
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

      
    }
  });
}





export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    contentType: false,//这里不要落下
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',

    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `http://localhost:8888/${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': session_storage.storageGet('accessToken')
      
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
