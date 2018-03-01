import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
// mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// iview
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// 轮播
import 'swiper/dist/css/swiper.min.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
//YDUI
import 'vue-ydui/dist/ydui.base.css';
// 导入公共css
import './common/css/public.css'
//引入rem
import './common/js/rem'
//动态修改页面标题
Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false
// 自定义title指令
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})

Vue.filter('hex', function (value) {
  if (value === undefined || value === '') {
    return '无'
  }
  return value;
})
Vue.filter('time', function (value) {
  if (value === undefined || value === '') {
    return '无'
  }
  return new Date(parseInt(value) * 1000).toLocaleString('chinese', { hour12: false }).replace(/:\d{1,2}$/, ' ')
})
Vue.filter('status', function (value) {
  if(value == 'wait_agree'){
    return '待同意'
  }else if(value == 'agreed'){
    return '已同意'
  }else if(value == 'rejected'){
    return '已拒绝'
  }else if(value == 'done'){
    return '已完成'
  }
})
Vue.filter('age', function (str){
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
  if(r==null){
    return  false; 
  }   
  var d= new Date(r[1], r[3]-1, r[4]);     
  if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){   
    var Y = new Date().getFullYear();   
    return((Y-r[1]) +"岁");   
  }   
  return("输入的日期格式错误！");   
})
Vue.use(MintUI)
// Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  components: { App }
})
