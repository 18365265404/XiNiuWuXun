import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import session_storage from '@/utils/session_storage'
import config from '@/config'
const { homeName } = config


Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }


router.beforeEach((to,from,next)=>{
  let userPath = to.meta.type
  let userId = session_storage.storageGet('userData') ? session_storage.storageGet('userData').userId : false
  // console.log('from.path',from.path)
  if(userPath=='user'){  //需登录的页面，需要登录后才可以跳转
    if(userId){ //确定已登录
      next();
    }else{
      // router.go(-1)
    }
    
  }else{ //无需登录的页面 可随意跳转
    next();
  }

})

router.afterEach(to => {
  // setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
export default router
