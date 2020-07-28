import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    redirect:'/dashboard'
  },
  {
    path:'/',
    component:()=>import('../components/common/Home.vue'),
    meta:{
      title:'自述文件'
    },
    children:[
      {
        path:'dashboard',
        component:()=>import('../components/page/Dashboard.vue'),
        meta:{
          title:'系统首页'
        }
      },
      {
        path:'tabs',
        component:()=>import('../components/page/Tags.vue'),
        meta:{
          title:'标签页'
        }
      },
      {
        path:'table',
        component:()=>import('../components/page/BaseTable .vue'),
        meta:{
          title:'基础表格'
        }
      }
    ]
  },
  {
    path:'/login',
    component:()=>import('components/page/Login.vue'),
    meta:{
      title:'Login组件'
    }
  },
  {
    path:'/demo',
    component:()=>import('components/page/EleDemo.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
