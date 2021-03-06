import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Person from '@/components/person/person.vue'


Vue.use(Router)
// const originalPush = Router.prototype.push;

// Router.prototype.push = function push(location) {

//   return originalPush.call(this, location).catch(err => err);

// };
export default [

    
    {
      path: '*',
      name: 'home',
      redirect: '/home',
      component: Main,
      meta: {
        hideInMenu: true,
        notCache: true
      },
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            
            hideInMenu: true,
            title: '首页',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/home.vue')
        },
        {
          path: '/activity',
          name: 'activity',
          meta: {
            hideInMenu: true,
            title: '活动',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/activity.vue')
        },
        {
          path: '/paySuccess',
          name: 'paySuccess',
          meta: {
            hideInMenu: true,
            title: '支付成功',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/paySuccess.vue')
        },
        {
          path: '/inspiration',
          name: 'inspiration',
          meta: {
            hideInMenu: true,
            title: '灵感',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/inspiration.vue')
        },
        {
          path: '/inspiration_detail',
          name: 'inspiration_detail',
          meta: {
            hideInMenu: true,
            title: '灵感详情',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/inspiration_detail.vue')
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          meta: {
            hideInMenu: true,
            title: '关于我们',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/aboutUs.vue')
        },

        
        
        {
          path: '/business',
          name: 'business',
          meta: {
            hideInMenu: true,
            title: '对公业务',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/business.vue')
        },

        {
          path: '/shopCenter',
          name: 'shopCenter',
          meta: {
            hideInMenu: true,
            title: '购物中心',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/shopCenter.vue')
        },
        {
          path: '/shopDetail',
          name: 'shopDetail',
          meta: {
            hideInMenu: true,
            title: '商品详情',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/shopDetail.vue')
        },
        {
          path: '/shopCar',
          name: 'shopCar',
          meta: {
            hideInMenu: true,
            title: '购物车',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/shopCar.vue')
        },
        {
          path: '/shopMsg',
          name: 'shopMsg',
          meta: {
            hideInMenu: true,
            title: '购物清单',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/shopMsg.vue')
        },
        
        

        
        {
          path: '/person',
          name: 'person',
          component: Person,
          meta: {
            hideInMenu: true,
            notCache: true
          },
          children: [
            {
              path: '/changepw',
              name: 'changepw',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '修改密码',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/changepw.vue')
            },
            {
              path: '/changeUser',
              name: 'changeUser',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '修改用户信息',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/changeUser.vue')
            },
            
            {
              path: '/order',
              name: 'order',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '我的订单',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/order.vue')
            },
            {
              path: '/address',
              name: 'address',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '收货地址',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/address.vue')
            },
            {
              path: '/billAddress',
              name: 'billAddress',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '发票地址',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/billAddress.vue')
            },
            {
              path: '/myBill',
              name: 'myBill',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '我的发票',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/myBill.vue')
            },
            
            {
              path: '/collection',
              name: 'collection',
              meta: {
                type:'user',
                hideInMenu: true,
                title: '收藏',
                notCache: true,
                icon: 'md-home'
              },
              component: () => import('@/components/collection.vue')
            },
          ]
        },
        
        
        
        
        {
          path: '/login',
          name: 'login',
          meta: {
            hideInMenu: true,
            title: '登录',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/login.vue')
        },
        {
          path: '/register',
          name: 'register',
          meta: {
            hideInMenu: true,
            title: '注册',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/register.vue')
        },
        {
          path: '/reset',
          name: 'reset',
          meta: {
            hideInMenu: true,
            title: '重置密码',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/components/reset.vue')
        },
        
        
      ]
    },
    
    {
      path: '/components',
      name: 'components',
      meta: {
        icon: 'logo-buffer',
        title: '组件'
      },
      component: Main,
      children: [
        {
          path: '/page1',
          name: 'page1',
          meta: {
            icon: 'md-arrow-dropdown-circle',
            title: '树状下拉选择器'
          },
          component: () => import('@/components/page1/page1.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          meta: {
            icon: 'md-trending-up',
            title: '数字渐变'
          },
          component: () => import('@/components/page2/page2.vue')
        },
        
      ]
    },
    {
      path: '/401',
      name: 'error_401',
      meta: {
        hideInMenu: true
      },
      component: () => import('@/components/error-page/401.vue')
    },

    {
      path: '*',
      name: 'error_404',
      meta: {
        hideInMenu: true
      },
      component: () => import('@/components/error-page/404.vue')
    }





  ]
