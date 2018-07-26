import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import User from '@/components/User'
import Good from '@/components/Good'
import Empty from '@/components/common/Empty'

import store from '../store/store'
import api from '../api'
import axios from "axios"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/good',
      name: 'good',
      component: Good
    },
    {
      path: '/empty',
      name: 'empty',
      component: Empty
    },
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log('---------- 全局路由守卫 begin ---------');

  const nextRoute = ['home', 'user', 'good', 'cart', 'profile'];

  let isLogin = false; // 是否登录

  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {

      // 发起 登陆 请求
      axios.get(api.islogin).then(res => {
        
        // console.log(res.data)
        // 判断是否登陆成功
        if( res.data.error > 0){
          isLogin = false
          store.state.islogin = false
        }else{
          isLogin = true
          store.state.islogin = true
        }

        // 检测是否登陆过 没有登陆就跳到空界面
        !isLogin && router.push({name: 'empty'})
    
      })

  }

  // 已登录状态；当路由到login时，跳转至home
  // if (to.name === 'login') {
  //   if (isLogin) {
  //     router.push({
  //       name: 'home'
  //     });
  //   }
  // }
  next();
});

export default router
