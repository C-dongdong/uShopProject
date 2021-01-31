import Vue from 'vue'
import Router from 'vue-router'

import Store from '../store'
console.log(Store,'StoreStoreStoreStore');
Vue.use(Router)
function hasUrl(url){
  return Store.getters.getUserInfo.menus_url.some(item=>item==url)
}
export const indexRouters=[
  {
    path:'/home',
    component:()=>import('../views/home'),
    name:'首页'
  },
  {
    path:'/menu',
    component:()=>import('../views/menu/menu'),
    name:'菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() :next('/home')
    }
  },
  {
    path:'/role',
    component:()=>import('../views/role/role'),
    name:'角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() :next('/home')
    }
  },
  {
    path:'/manger',
    component:()=>import('../views/manger/manger'),
    name:'管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manger') ? next() :next('/home')
    }
  },
  {
    path:'/sort',
    component:()=>import('../views/sort/sort'),
    name:'商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/sort') ? next() :next('/home')
    }
  },
  {
    path:'/spec',
    component:()=>import('../views/specs/spec'),
    name:'商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/spec') ? next() :next('/home')
    }
  },
  {
    path:'/goods',
    component:()=>import('../views/goods/goods'),
    name:'商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() :next('/home')
    }
  },
  {
    path:'/vip',
    component:()=>import('../views/member/vip'),
    name:'会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/vip') ? next() :next('/home')
    }
  },
  {
    path:'/banner',
    component:()=>import('../views/banner/banner'),
    name:'轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() :next('/home')
    }
  },
  {
    path:'/seckill',
    component:()=>import('../views/seck/seckill'),
    name:'限时秒杀',
    beforeEnter: (to, from, next) => {
      hasUrl('/seckill') ? next() :next('/home')
    }
  }
]

const router= new Router({
  routes: [
    {
      path:'/login',
      component:()=>import('../pages/login')
    },
    {
      path:'/index',
      component:()=>import('../pages/index'),
      children:[
        // {
        //   path: "/home",
        //   component: () => import("@/views/home")
        // },
        ...indexRouters,
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})

//全局导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
    return
  }
  if(sessionStorage.getItem('loginInfo')){
    next()
    return
  }
  // if(Store.getters.getUserInfo){
  //   next()
  //   return
  // }
  next('/login')
})
export default router