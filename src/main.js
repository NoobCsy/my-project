// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/index.css'
import myaxios from '@/assets/myaxios.js'
import ElTreeGrid from 'element-tree-grid'
import moment from 'moment'
Vue.component(ElTreeGrid.name, ElTreeGrid);
Vue.use(myaxios)
//定义全局时间过滤器
Vue.filter('dataForm', function (orginVal) {
  let timeVal = Number(orginVal + '000')
  return moment(timeVal).format('YYYY-MM-DD hh:mm:ss')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
