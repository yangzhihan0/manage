import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import '@/assets/css/global.css'
// 导入字体图标
import '@/assets/fonts/iconfont.css'
// axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
// 导入element-ui
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
