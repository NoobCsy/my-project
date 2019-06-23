import axios from 'axios'

var myaxios = {}

myaxios.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  axios.interceptors.request.use(function (config) {
    if (!config.url.includes('login')) {
      config.headers.common['Authorization'] = localStorage.getItem('token')
    }
    return config
  })
  Vue.prototype.$http = axios
}

export default myaxios
