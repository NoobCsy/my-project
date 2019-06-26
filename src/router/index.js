import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import ElementUI, { Message } from 'element-ui'
import User from '@/components/user/user.vue'
import Rightlist from '@/components/rightlist/rightlist.vue'
import Rolelist from '@/components/rolelist/rolelist.vue'
import 'element-ui/lib/theme-chalk/index.css'
import Category from '@/components/category/category.vue'
import Productlist from '@/components/productlist/productlist.vue'
import Add from '../components/productadd/productadd.vue'
Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$message = Message
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/user', component: User, name: 'user'},
        {path: '/rightlist', name: 'rightlist', component: Rightlist},
        {path: '/rolelist', name: 'rolelist', component: Rolelist},
        {path: '/category', name: 'category', component: Category},
        {path: '/productlist', name: 'productlist', component: Productlist}, 
        {path: '/productlist/add', name: 'add', component: Add} 
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
// 导航路由
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    let token = localStorage.getItem('token')
    if (!token) {
      router.push({name: 'login'})
      Vue.prototype.$message.error('您还未登录,请重新登录')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
