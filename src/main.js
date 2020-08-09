import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import "./utils/directives";

//加载图标样式
import './assets/css/icon.css';
import './assets/css/Icon-css/iconfont.css'

// 加载拖拽组件
import "./utils/directives";

Vue.config.productionTip = false

Vue.use(ElementUI,{size:'small',zIndex:3000});


router.beforeEach((to,from,next)=>{
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('ms_username');
  if(!role && to.path !== '/login'){
    next("/login");
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
